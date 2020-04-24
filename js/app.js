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

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
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

// re-calculate values on window resize
window.addEventListener('resize', function () {
    navbar_height = document.querySelectorAll('.page__header')[0].offsetHeight;
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
let navbar_height = document.querySelectorAll('.page__header')[0].offsetHeight;

function doSomething(scroll_pos) {
    const relative_scroll_position = scroll_pos + navbar_height;
    let min_difference = Number.MAX_SAFE_INTEGER;
    let section_to_focus = null;

    for (const [key, value] of Object.entries(section_top_distances)) {
        const section = document.getElementById(key);
        section.classList.remove('active-class');

        // finding the section that is closest to the scroll bar
        const difference = Math.abs(value - relative_scroll_position);

        if (difference < min_difference) {
            min_difference = difference;
            section_to_focus = key;
        }
    }
    const active_section = document.getElementById(section_to_focus);

    if (!active_section.classList.contains('active-class')) {
        active_section.classList.add('active-class');
    }
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;

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
                    top: value - navbar_height,
                    behavior: 'smooth',
                });
            }
        }
    })
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


