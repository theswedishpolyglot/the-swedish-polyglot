let _cache = null;

export async function loadPricing(url = "/pricing.csv") {
  if (_cache) return _cache;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  const csvText = await res.text();

  const { records, headers } = parseCSV(csvText, { header: true, skipEmptyLines: true });
  if (!records.length) throw new Error("CSV is empty.");

  const firstColName = headers[0];

  const isDurationHeader = (h) => /minute/i.test(h) || /(30|45|60)/.test(String(h));
  const durationCols = headers.filter((h, idx) => idx > 0 && isDurationHeader(h));

  const normalizeDuration = (str) => {
    const m = String(str).match(/(30|45|60)/);
    return m ? `${m[1]}min` : String(str).trim().toLowerCase();
  };

  const durations = durationCols
    .map((h) => ({ h, key: normalizeDuration(h), n: Number(String(h).match(/(30|45|60)/)?.[1] || 0) }))
    .sort((a, b) => a.n - b.n)
    .map(({ key }) => key);

  const findRow = (label) =>
    records.find((r) => String(r[firstColName]).toLowerCase().includes(label.toLowerCase()));

  const toNumber = (v) => {
    if (v == null) return null;
    let s = String(v).replace(/\s+/g, "");
    s = s.replace(/%/g, "");
    const num = Number(s);
    return Number.isFinite(num) ? num : null;
  };

  const singleRow = findRow("Single Lesson") || findRow("Single");
  const discountedRow = findRow("Discounted Lesson") || findRow("Discounted");

  const lessonPrices = {
    single: Object.fromEntries(
      durations.map((d) => {
        const hdr = durationCols.find((h) => normalizeDuration(h) === d);
        return [d, toNumber(singleRow?.[hdr])];
      })
    ),
    discounted: Object.fromEntries(
      durations.map((d) => {
        const hdr = durationCols.find((h) => normalizeDuration(h) === d);
        return [d, toNumber(discountedRow?.[hdr])];
      })
    ),
  };

  const rpphRow = findRow("Relative Price Per Hour") || findRow("Relative");
  const relativePricePerHour = Object.fromEntries(
    durations.map((d) => {
      const hdr = durationCols.find((h) => normalizeDuration(h) === d);
      return [d, toNumber(rpphRow?.[hdr])];
    })
  );

  const discRow = findRow("Discount Percentage") || findRow("Discount");
  const discountPercentage = Object.fromEntries(
    durations.map((d) => {
      const hdr = durationCols.find((h) => normalizeDuration(h) === d);
      return [d, toNumber(discRow?.[hdr])];
    })
  );

  const lessonPackages = {};
  records.forEach((r) => {
    const label = String(r[firstColName] ?? "");
    const m = label.match(/^\s*(\d+)/);
    if (!m) return;
    const count = m[1];
    lessonPackages[count] = Object.fromEntries(
      durations.map((d) => {
        const hdr = durationCols.find((h) => normalizeDuration(h) === d);
        return [d, toNumber(r[hdr])];
      })
    );
  });

  const getPackagePrice = (lessons, duration, discounted = false) => {
    const d = duration;
    if (lessons === 1 || lessons === "1") {
      return discounted ? lessonPrices.discounted[d] : lessonPrices.single[d];
    }
    const key = String(lessons);
    return lessonPackages[key]?.[d] ?? null;
  };

  _cache = {
    durations,
    lessonPrices,
    relativePricePerHour,
    discountPercentage,
    lessonPackages,
    getPackagePrice,
  };
  return _cache;
}

function parseCSV(text, { header = true, skipEmptyLines = true } = {}) {
  const rows = [];
  let i = 0, field = "", row = [], inQuotes = false;

  const pushField = () => { row.push(field); field = ""; };
  const pushRow = () => {
    if (skipEmptyLines && row.every((c) => String(c).trim() === "")) { row = []; return; }
    rows.push(row); row = [];
  };

  while (i < text.length) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      } else { field += ch; i++; continue; }
    }

    if (ch === '"') { inQuotes = true; i++; continue; }
    if (ch === ",") { pushField(); i++; continue; }
    if (ch === "\r") { pushField(); if (text[i + 1] === "\n") i++; i++; pushRow(); continue; }
    if (ch === "\n") { pushField(); i++; pushRow(); continue; }

    field += ch; i++;
  }
  pushField();
  if (row.length) pushRow();

  if (!header) return { records: rows, headers: [] };

  const [rawHeaders, ...data] = rows;

  const headers = rawHeaders.map((h, idx) => {
    const name = String(h ?? "").trim();
    return name ? name : `__col${idx}`;
  });

  const records = data.map((r) => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = r[idx] ?? ""; });
    return obj;
  });

  return { records, headers };
}