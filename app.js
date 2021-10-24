// set date with getFullYear method
// it will change every year the date.
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// close links dynamically
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', () => {
//if we use this way, with toggle it won't be dynamic
// for example if we add a new link it won't seen.
//  linksContainer.classList.toggle('show-links');

// using getBoundingClientRect() method to get height of linkcontainer and links
// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  
  // by default containerHeight is zero. you can see it in css in links-container class.
  if (containerHeight === 0) {
      linksContainer.style.height = `${linksHeight}px`;      
  }
  else{
      linksContainer.style.height = 0;
  }
});
// fixed navbar with window.pageYOffset
// we used if statement for that
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', () => {
    // pageYOffset is a read - only window property
    // that returns the number of pixels the document has been scrolled vertically.
    const scrollHight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if (scrollHight > navHeight) {
        navbar.classList.add('fixed-nav');              
    }else{
        navbar.classList.remove('fixed-nav');                
    }
// we could also add this code to the code above
// but it seems better in this way
    if (scrollHight > 500) {
        topLink.classList.add('show-link');        
    }else{
        topLink.classList.remove('show-link');        
    }
});
// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) =>{
    link.addEventListener('click', (e) => {
        //prevent default
        e.preventDefault();
        //navigate to a specific spot
        // we used getAttribute method and then slice method
        // slice extracts a section of a string without modifying original string
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        //calculate heights
        const navHight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');

        //offsetTop - A Number, representing the top position of the element, in pixels
        let position = element.offsetTop - navHight;
        if (!fixedNav) {
            position = position - navHight;            
        }
        // we will need this if statement in small screens
        // without it it will get more higher where actually should be
        if (navHight > 82) {
            position = position + containerHeight;

        }
        window.scrollTo({
            left: 0,
            top: position,

        });
        // after clicking the links
        // it is close links for small screens. it is a cool way for better user experience
        linksContainer.style.height = 0;
    });
});