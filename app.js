const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const focusButton2 = document.getElementById('focusButton');
const h2REF = document.getElementById('Test')
const slideChildren = document.querySelectorAll('.slide');



console.log(slideChildren);

let slideIndex = 0;

slideChildren.forEach(function(index) {
    index.style.opacity = 0;

});

//trying to set the initial slide to full opacity
slideChildren[0].style.opacity = 1;


console.log("from app.js" + focusButton2);



focusButton2.addEventListener('click', function() {
    console.log("Current variable " + slideIndex + " actual slide number " + slideChildren[slideIndex].innerHTML);

    slideChildren.forEach(function(index) {
        index.style.opacity = 0;
    });

    slideChildren[slideIndex].style.opacity = 1;

    slideIndex++;

    if (slideIndex >= slideChildren.length) {
        slideIndex = 0;
    }

    h2REF.innerHTML = slideIndex;
});


/*focusButton2.addEventListener('click', function() {

    console.log("Current variable" +slideIndex +  "actual slide number " + slideChildren[slideIndex].innerHTML)
   
    slideChildren.forEach(function(index) {
        index.style.opacity = 0;

    });

    

    slideChildren[slideIndex].style.opacity = 1;

    if(slideIndex >= slideChildren.length) {
        slideIndex = 0;
    }
    
    slideIndex++;
    h2REF.innerHTML = slideIndex;
})*/



menu.addEventListener('click', function() {

    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));