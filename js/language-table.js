document.addEventListener('DOMContentLoaded', function() {
    var table = document.createElement("table");
    table.innerHTML = 
            '<tr>' +
                '<th class="invisible"></th>' +
                '<th colspan="3">Germanic</th>' +
                '<th colspan="4">Romance</th>' +
                '<th colspan="3">Sino-Xenic</th>' +
            '</tr>' +
            '<tr>' +
                '<th class="invisible"></th>' +
                '<th>Swedish</th>' +
                '<th>English</th>' +
                '<th>German</th>' +
                '<th>Spanish</th>' +
                '<th>Portuguese</th>' +
                '<th>French</th>' +
                '<th>Italian</th>' +
                '<th>Japanese</th>' +
                '<th>Mandarin</th>' +
                '<th>Vietnamese</th>' +
            '</tr>' +
            '<tr>' +
                '<th>Reading</th>' +
                '<td>C2</td>' +
                '<td>C2</td>' +
                '<td>C1</td>' +
                '<td>C1</td>' +
                '<td>B2</td>' +
                '<td>B2</td>' +
                '<td>B2</td>' +
                '<td>B2</td>' +
                '<td>B2</td>' +
                '<td>B1</td>' +
            '</tr>' +
            '<tr>' +
                '<th>Listening</th>' +
                '<td>C2</td>' +
                '<td>C2</td>' +
                '<td>C1</td>' +
                '<td>C1</td>' +
                '<td>B2</td>' +
                '<td>B1</td>' +
                '<td>B1</td>' +
                '<td>B1</td>' +
                '<td>A2</td>' +
                '<td>A2</td>' +
            '</tr>' +
            '<tr>' +
                '<th>Speaking</th>' +
                '<td>C2</td>' +
                '<td>C2</td>' +
                '<td>B2</td>' +
                '<td>B2</td>' +
                '<td>B1</td>' +
                '<td>B1</td>' +
                '<td>A2</td>' +
                '<td>B1</td>' +
                '<td>A2</td>' +
                '<td>A1</td>' +
            '</tr>' +
            '<tr>' +
                '<th>Writing</th>' +
                '<td>C2</td>' +
                '<td>C2</td>' +
                '<td>B2</td>' +
                '<td>B2</td>' +
                '<td>B1</td>' +
                '<td>B1</td>' +
                '<td>A2</td>' +
                '<td>B1</td>' +
                '<td>A2</td>' +
                '<td>A1</td>' +
            '</tr>';

    var languageTableDivs = document.querySelectorAll('.language-table');

    for (var i = 0; i < languageTableDivs.length; i++) {
        languageTableDivs[i].appendChild(table);
    }

    var profileStylesheet = document.createElement("link");
    profileStylesheet.rel = "stylesheet";
    profileStylesheet.type = "text/css";
    profileStylesheet.href = "./css/language-table.css";

    document.head.appendChild(profileStylesheet);
});

// wkhtmltopdf --debug-javascript --enable-local-file-access "/c/Users/willi/Desktop/projects/online-resume/index.html" "/c/Users/willi/Desktop/projects/online-resume/output.pdf"
