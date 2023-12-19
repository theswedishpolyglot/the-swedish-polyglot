import markdown
import os
import glob
import re
from bs4 import BeautifulSoup

# TODO: Figure out a way of handling <title>.
# TODO: Generate "sub-navbar" based on h1?
# TODO: Generate table-of-contents for each md?

class MarkdownToHTMLConverter:
    def __init__(self, source_folder, destination_folder, head_html_path):
        self.source_folder = source_folder
        self.destination_folder = destination_folder
        self.head_html = self.read_file(head_html_path)
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
            <section class="content" id="guide">
                {content}
            </section>
        </main>
        <footer id="footer"></footer>
    </body>
</html>
        """

    def read_file(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()

    def convert_all(self):
        os.makedirs(self.destination_folder, exist_ok=True)

        for md_file in glob.glob(os.path.join(self.source_folder, '*.md')):
            self.convert_file(md_file)

    def convert_file(self, md_file):
        filename = os.path.basename(md_file).split('.')[0]

        html_file_path = os.path.join(self.destination_folder, filename + '.html')

        with open(md_file, 'r', encoding='utf-8') as file:
            md_content = file.read()

        title_match = re.search(r'^---\s*Title:\s*(.*?)\s*---', md_content, re.MULTILINE)
        if title_match:
            title = title_match.group(1)
            head_content_with_title = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', self.head_html)
        else:
            head_content_with_title = self.head_html

        md_content = re.sub(r'^---.*?---', '', md_content, flags=re.MULTILINE | re.DOTALL)

        html_content = markdown.markdown(md_content)

        full_html = self.html_template.format(content=html_content, head_content=head_content_with_title)

        with open(html_file_path, 'w', encoding='utf-8') as file:
            file.write(full_html)

if __name__ == "__main__":
    head_html_path = r'C:\Users\willi\Desktop\projects\the-swedish-polyglot\components\head.html'
    converter = MarkdownToHTMLConverter(r'C:\Users\willi\Desktop\projects\the-swedish-polyglot\md', 
                                        r'C:\Users\willi\Desktop\projects\the-swedish-polyglot\pages\guides',
                                        head_html_path)
    converter.convert_all()
