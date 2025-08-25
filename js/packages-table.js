import { loadPricing } from "../utils/pricing.js";

export function createPackagesTable(containerSelector = ".packages-table") {

  loadPricing().then((pricing) => {
    const { durations, lessonPrices, lessonPackages } = pricing;

    const formatSEK = (n) =>
      n == null ? "-" : `${new Intl.NumberFormat("sv-SE").format(n)} SEK`;

    const rowThreeLines = (a, bBold, c) =>
      `${formatSEK(a)} <br> <strong>${formatSEK(bBold)}</strong> <br> ${formatSEK(c)}`;

    const pick = (min) => durations.find(d => new RegExp(`^${min}\\s*min$`, "i").test(d)) || durations[0];
    const d30 = pick(30);
    const d45 = pick(45);
    const d60 = pick(60);

    const single_30 = lessonPrices.single[d30];
    const single_45 = lessonPrices.single[d45];
    const single_60 = lessonPrices.single[d60];

    const disc_30 = lessonPrices.discounted[d30];
    const disc_45 = lessonPrices.discounted[d45];
    const disc_60 = lessonPrices.discounted[d60];

    const totals = (n) => ({
      t30: pricing.lessonPackages[String(n)]?.[d30] ?? null,
      t45: pricing.lessonPackages[String(n)]?.[d45] ?? null,
      t60: pricing.lessonPackages[String(n)]?.[d60] ?? null,
    });

    const p5  = totals(5);
    const p10 = totals(10);
    const p15 = totals(15);
    const p20 = totals(20);
    const p30 = totals(30);

    const table = document.createElement("table");
    table.innerHTML =
      "<tr>" +
        "<th>Package Size</th>" +
        "<th>Single Lesson</th>" +
        "<th>5-Lesson Package</th>" +
        "<th>10-Lesson Package</th>" +
        "<th>15-Lesson Package</th>" +
        "<th>20-Lesson Package</th>" +
        "<th>30-Lesson Package</th>" +
      "</tr>" +

      // Lesson Length
      "<tr>" +
        "<th>Lesson Length Options</th>" +
        `<td colspan="6">30 minutes <br> <strong>45 minutes</strong> <br> 60 minutes</td>` +
      "</tr>" +

      // Price per Lesson
      "<tr>" +
        "<th>Price Per Lesson (30/45/60 min)</th>" +
        `<td>${rowThreeLines(single_30, single_45, single_60)}</td>` +
        `<td colspan="5">${rowThreeLines(disc_30, disc_45, disc_60)}</td>` +
      "</tr>" +

      // Total Price
      "<tr>" +
        "<th>Total Price (30/45/60 min)</th>" +
        "<td>-</td>" +
        `<td>${rowThreeLines(p5.t30,  p5.t45,  p5.t60)}</td>` +
        `<td>${rowThreeLines(p10.t30, p10.t45, p10.t60)}</td>` +
        `<td>${rowThreeLines(p15.t30, p15.t45, p15.t60)}</td>` +
        `<td>${rowThreeLines(p20.t30, p20.t45, p20.t60)}</td>` +
        `<td>${rowThreeLines(p30.t30, p30.t45, p30.t60)}</td>` +
      "</tr>" +

      "<tr>" +
        "<th>Discount</th>" +
        "<td>-</td>" +
        "<td colspan=\"5\">10%</td>" +
      "</tr>" +

      "<tr>" +
        "<th>Extras</th>" +
        "<td>Notes <br> Flashcards <br> Audio File</td>" +
        "<td></td>" +
        "<td>1 Premium Flashcard Deck</td>" +
        "<td>2 Premium Flashcard Decks</td>" +
        "<td>3 Premium Flashcard Decks, 1x Metalearning Consultation (60 min)</td>" +
        "<td>All 6 Premium Decks, 1x Metalearning Consultation (60 min), 1 Custom Deck (5-10k Phrases) After Package Completion</td>" +
      "</tr>" +

      "<tr>" +
        "<th>Value of Extras <br> (if purchased separately)</th>" +
        "<td>0 SEK</td>" +
        "<td>0 SEK</td>" +
        "<td>500 SEK</td>" +
        "<td>1 000 SEK</td>" +
        "<td>2 500 SEK</td>" +
        "<td>5 000 SEK</td>" +
      "</tr>" +

      "<tr>" +
        "<th>Self-Study Potential</th>" +
        "<td>2 hours (lesson materials)</td>" +
        "<td>10 hours (lesson materials)</td>" +
        "<td>20 hours (lesson materials)<br>125 hours (extras)</td>" +
        "<td>30 hours (lesson materials)<br>250 hours (extras)</td>" +
        "<td>40 hours (lesson materials)<br>375 hours (extras)</td>" +
        "<td>60 hours (lesson materials)<br>1 000 hours (extras)</td>" +
      "</tr>" +

      "<tr>" +
        "<th>Expected Level</th>" +
        "<td>-</td>" +
        "<td>A1 → A2<br>Pre-Intermediate</td>" +
        "<td>A1 → B1<br>Lower Intermediate</td>" +
        "<td>A1 → B1/B2<br>Mid-Intermediate</td>" +
        "<td>A1 → B2<br>Upper Intermediate</td>" +
        "<td>A1 → C1<br>Advanced</td>" +
      "</tr>" +

      "<tr>" +
        "<th>Expected Vocabulary</th>" +
        "<td>100 words</td>" +
        "<td>500 words</td>" +
        "<td>2 000 to 3 000 words</td>" +
        "<td>3 000 to 5 000 words</td>" +
        "<td>5 000 to 10 000 words</td>" +
        "<td>10 000 to 15 000 words</td>" +
      "</tr>" +

      "<tr>" +
        "<th>Real-World Significance</th>" +
        "<td>-</td>" +
        "<td>-</td>" +
        "<td>B1-level is required for Finnish citizenship and soon for Swedish citizenship</td>" +
        "<td>-</td>" +
        "<td>-</td>" +
        "<td>C1-level is required for doctors and other healthcare staff</td>" +
      "</tr>";

    document.querySelectorAll(containerSelector).forEach((div) => {
      div.appendChild(table.cloneNode(true));
    });

    if (!document.getElementById("packages-table-css")) {
      const link = document.createElement("link");
      link.id = "packages-table-css";
      link.rel = "stylesheet";
      link.href = "/css/packages-table.css";
      document.head.appendChild(link);
    }
  }).catch((err) => {
    console.error("Failed to build packages table:", err);
  });
}
