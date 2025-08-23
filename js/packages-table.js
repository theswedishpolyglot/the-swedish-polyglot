// packages-table.js

export function createPackagesTable(containerSelector = '.packages-table') {
  const table = document.createElement("table");
  table.innerHTML =
    '<tr>' +
      '<th></th>' +
      '<th>Single Lesson</th>' +
      '<th>5-Lesson Package</th>' +
      '<th>10-Lesson Package</th>' +
      '<th>15-Lesson Package</th>' +
      '<th>20-Lesson Package</th>' +
      '<th>30-Lesson Package</th>' +
    '</tr>' +

    // Lesson Length (one row spanning all package columns)
    '<tr>' +
      '<th>Lesson Length Options</th>' +
      '<td colspan="6">30 minutes <br> 45 minutes <br> 60 minutes</td>' +
    '</tr>' +

    // Price per Lesson (merge the 10% off packages)
    '<tr>' +
      '<th>Price Per Lesson (30/45/60 min)</th>' +
      '<td rowspan="2">600 SEK <br> 750 SEK <br> 900 SEK</td>' +             // Single
      '<td colspan="5">540 SEK <br> 675 SEK <br> 810 SEK</td>' +   // All packages (10% off)
    '</tr>' +

    // Total Price
    '<tr>' +
      '<th>Total Price (30/45/60 min)</th>' +
      '<td>2 700 SEK <br> 3 375 SEK <br> 4 050 SEK</td>' +
      '<td>5 400 SEK <br> 6 750 SEK <br> 8 100 SEK</td>' +
      '<td>8 100 SEK <br> 10 125 SEK <br> 12 150 SEK</td>' +
      '<td>10 800 SEK <br> 13 500 SEK <br> 16 200 SEK</td>' +
      '<td>16 200 SEK <br> 20 250 SEK <br> 24 300 SEK</td>' +
    '</tr>' +

    // Discount (merge)
    '<tr>' +
      '<th>Discount</th>' +
      '<td>-</td>' +
      '<td colspan="5">10%</td>' +
    '</tr>' +

    // Extras
    '<tr>' +
      '<th>Extras</th>' +
      '<td>Notes <br> Flashcards <br> Audio File</td>' +
      '<td></td>' +
      '<td>1 Premium Flashcard Deck</td>' +
      '<td>2 Premium Flashcard Decks</td>' +
      '<td>3 Premium Flashcard Decks, 1x Metalearning Consultation (60 min)</td>' +
      '<td>All 6 Premium Decks, 1x Metalearning Consultation (60 min), 1 Custom Deck (5-10k Phrases) After Package Completion</td>' +
    '</tr>' +
  
    // Value of Extras (if purchased separately)
    '<tr>' +
      '<th>Value of Extras <br> (if purchased separately)</th>' +
      '<td>0 SEK</td>' +
      '<td>0 SEK</td>' +
      '<td>500 SEK</td>' +
      '<td>1 000 SEK</td>' +
      '<td>2 500 SEK</td>' +
      '<td>5 000 SEK</td>' +
    '</tr>' +

    // Expected Level
    '<tr>' +
      '<th>Expected Level</th>' +
      '<td>-</td>' +
      '<td>A1 → A2</td>' +
      '<td>A1 → B1</td>' +
      '<td>A1 → B1/B2</td>' +
      '<td>A1 → B2</td>' +
      '<td>A1 → C1</td>' +
    '</tr>' +

    '<tr>' +
      '<th>Expected Vocabulary</th>' +
      '<td>100 words</td>' +
      '<td>500 words</td>' +
      '<td>2 000 to 3 000 words</td>' +
      '<td>3 000 to 5 000 words</td>' +
      '<td>5 000 to 10 000 words</td>' +
      '<td>10 000 to 15 000 words</td>' +
    '</tr>';

  // Append table into all containers matching selector
  document.querySelectorAll(containerSelector).forEach(div => {
    div.appendChild(table.cloneNode(true));
  });

  // Ensure shared CSS is loaded once
  if (!document.getElementById('packages-table-css')) {
    const link = document.createElement('link');
    link.id = 'packages-table-css';
    link.rel = 'stylesheet';
    link.href = '/css/packages-table.css';
    document.head.appendChild(link);
  }
}
