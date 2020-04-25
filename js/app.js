/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


// build the nav and store Top values of each section
const sections = document.querySelectorAll('section')
const section_fragment = document.createDocumentFragment();
const section_top_distances = {};

for (const section of sections) {

    // add key value pair of section id and Top distance
    const section_id = section.id;
    const top = section.offsetTop;
    section_top_distances[section_id] = top;
    section_name = section.dataset.nav;

    // building nav using li elements
    const list_items = document.createElement('li')
    list_items.textContent = section_name;
    list_items.setAttribute('data-id', section_id);
    list_items.classList.add('menu__link');
    section_fragment.append(list_items);
}

const navbarList = document.querySelector('#navbar__list');
navbarList.appendChild(section_fragment);

// Re-calculate values on window resize
window.addEventListener('resize', function () {
    header_height = document.querySelectorAll('.page__header')[0].offsetHeight;

    for (const section of sections) {
        const section_id = section.id;
        const top = section.offsetTop;
        section_top_distances[section_id] = top;
        section_name = section.dataset.nav;
    }
})

// Add class 'active' to section when near top of viewport
let last_known_scroll_position = 0;
let ticking = false;
const header = document.querySelectorAll('.page__header')[0];
let header_height = header.offsetHeight;

function doSomething(scroll_pos) {

    // Show header when scrolling
    header.classList.remove('navbar__menu__hide');

    // Finding section to focus on scrolling
    const relative_scroll_position = scroll_pos + header_height;
    let min_difference = Number.MAX_SAFE_INTEGER;
    let section_to_focus = null;

    for (const [key, value] of Object.entries(section_top_distances)) {
        const section = document.getElementById(key);
        section.classList.remove('active-class');

        // Finding the section that is closest to the scroll bar
        const difference = Math.abs(value - relative_scroll_position);

        if (difference < min_difference) {
            min_difference = difference;
            section_to_focus = key;
        }
    }
    const active_section = document.getElementById(section_to_focus);

    // Highlighting the section that is currently being viewed
    if (!active_section.classList.contains('active-class')) {
        active_section.classList.add('active-class');
    }
}

function hideHeader(scroll_pos) {

    // Show header when scrolled to top
    if (scroll_pos === 0) {
        console.log(scroll_pos);
        header.classList.remove('navbar__menu__hide');
        return;
    }

    // Hide header when not scrolling
    setTimeout(function hideNavBar() {
        header.classList.add('navbar__menu__hide');
    }, 0)
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;
    hideHeader(last_known_scroll_position);

    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });
        ticking = true;
    }
});

// Scroll to anchor ID using scrollTO event
const navbar = document.getElementById('navbar__list');

for (const navbar_item of navbar.children) {
    navbar_item.addEventListener('click', function (event) {
        const section_id = navbar_item.dataset.id;

        for (const [key, value] of Object.entries(section_top_distances)) {

            if (section_id === key) {
                window.scrollTo({
                    top: value - header_height,
                    behavior: 'smooth',
                });
            }
        }
    })
}