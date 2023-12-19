import os
import glob
import re

# TODO: Replace default title with "Guides by The Swedish Polyglot".
# TODO: Generate a table of contents based on folder structure (perhaps a _meta.md in each folder?)

class GenerateGuidesPage:
    def __init__(self, guides_folder, head_html_path, output_file):
        self.guides_folder = guides_folder
        self.head_html = self.read_file(head_html_path)
        self.output_file = output_file
        self.html_template = """
<html lang="en">
    <head>
        {head_content}
    </head>
    <body>
        <header>
            <div id="navbar"></div>
        </header>
        <div id="banner"></div>
        <main>
            <section class="content" id="guide-list">
                <h1>Guides</h1>
                <ul>
                    {guide_links}
                </ul>
            </section>
        </main>
        <footer id="footer"></footer>
    </body>
</html>
        """

    def read_file(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()

    def generate_page(self):
        guide_links = self.get_guide_links()
        full_html = self.html_template.format(head_content=self.head_html, guide_links=guide_links)

        with open(self.output_file, 'w', encoding='utf-8') as file:
            file.write(full_html)

    def get_guide_links(self):
        links_html = ""
        title_regex = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)

        for html_file in glob.glob(os.path.join(self.guides_folder, '*.html')):
            with open(html_file, 'r', encoding='utf-8') as file:
                html_content = file.read()

            title_match = title_regex.search(html_content)
            if title_match:
                title = title_match.group(1)
            else:
                title = "Guide"  # Default title if none is found

            filename = os.path.basename(html_file)
            link = f'<li><a href="guides/{filename}">{title}</a></li>'
            links_html += link + "\n"

        return links_html

if __name__ == "__main__":
    head_html_path = r'C:\Users\willi\Desktop\projects\the-swedish-polyglot\components\head.html'
    guides_folder = r'C:\Users\willi\Desktop\projects\the-swedish-polyglot\pages\guides'
    output_file = r'C:\Users\willi\Desktop\projects\the-swedish-polyglot\pages\guides.html'
    
    generator = GenerateGuidesPage(guides_folder, head_html_path, output_file)
    generator.generate_page()
