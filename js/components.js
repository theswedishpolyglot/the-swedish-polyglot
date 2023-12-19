function loadBanner() {
    fetch('/components/banner.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('banner').innerHTML = html;
        })
        .catch(error => {
            console.error('Failed to load banner:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadBanner);

function loadFooter() {
    fetch('/components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('footer').innerHTML = html;
        })
        .catch(error => {
            console.error('Failed to load footer:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadFooter);

function loadNavbar() {
    fetch('/components/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
            setupSubNavbarEventListeners();
        })
        .catch(error => {
            console.error('Failed to load navbar:', error);
        });
}

function setupSubNavbarEventListeners() {
    const subNavbarMapping = {
        'shop': 'shop-navbar.html',
        'services': 'services-navbar.html',
        'guides': 'guides-navbar.html',
        'about': 'about-navbar.html',
        'contact': 'contact-navbar.html'
    };

    document.querySelectorAll('#navbar ul li a').forEach(item => {
        item.addEventListener('mouseover', (event) => {
            document.querySelectorAll('#navbar ul li a').forEach(navItem => {
                navItem.classList.remove('active-navbar');
            });
            event.target.classList.add('active-navbar');

            const href = event.target.getAttribute('href');
            const isStartButton = href === '/index.html';

            if (isStartButton) {
                document.getElementById('sub-navbar').innerHTML = '';
            } else {
                const navItemId = href.split('#').pop();
                const subNavbarFile = subNavbarMapping[navItemId];
                if (subNavbarFile) {
                    loadSubNavbar(subNavbarFile);
                }
            }
        });
    });
}

function loadSubNavbar(subNavbarFile) {
    fetch(`/components/sub-navbar/${subNavbarFile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('sub-navbar').innerHTML = html;
        })
        .catch(error => {
            console.error(`Failed to load sub-navbar:`, error);
        });
}

loadNavbar();
