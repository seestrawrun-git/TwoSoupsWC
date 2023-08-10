const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const focusButton2 = document.getElementById('focusButton');
const h2REF = document.getElementById('Test')
const slideChildren = document.querySelectorAll('.games__slide');
let slideIndex = 0;
let previousWindowWidth;


//window size stuff

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

console.log(windowWidth);

//initialize window size
/*if(windowWidth < 800) {
    console.log("yo");
    slideChildren.forEach(function(index) {
        index.style.opacity = 1;
        index.style.zIndex = 1;
    
    });

};
if(windowWidth > 800){ */
    slideChildren.forEach(function(index) {
        index.style.zIndex = 0;
        index.style.opacity = 0;
        slideChildren[slideIndex].style.opacity = 1;
        slideChildren[slideIndex].style.zIndex = 1;
    
    });
   

//}





function windowChanged() {
    if(window.innerWidth < 800) {
        console.log("yo");
    }
       /* slideChildren.forEach(function(index) {
            index.style.opacity = 1;
            index.style.zIndex = 1;
        
        });
    
    };*/
    if(window.innerWidth > 800 ** window.innerWidth != previousWindowWidth){
        slideChildren.forEach(function(index) {
            index.style.opacity = 0;
            slideChildren[slideIndex].style.opacity = 1;
            slideChildren[slideIndex].style.zIndex = 1;
        
        });
    
}
previousWindowWidth = window.innerWidth;
}



window.onresize = windowChanged;




//trying to set the initial slide to full opacity
slideChildren[0].style.opacity = 1;
slideChildren[0].style.zIndex = 1;






focusButton2.addEventListener('click', function() {
    console.log("Current variable " + slideIndex + " actual slide number " + slideChildren[slideIndex].innerHTML);

    slideChildren.forEach(function(index) {
        index.style.opacity = 0;
        index.style.zIndex = -1;
    });

    slideChildren[slideIndex].style.opacity = 1;
    slideChildren[slideIndex].style.zIndex = 1;

    slideIndex++;

    if (slideIndex >= slideChildren.length) {
        slideIndex = 0;
    }

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
});

