var currentSlider = 0;
var sliders = document.querySelectorAll(".overlay"); // Define sliders variable
var dots = document.querySelectorAll('.dot');
var interval = 3000; // Set the interval to 1 second (1000 milliseconds)
var timer = setInterval(changeSlide, interval);

function changeSlide(n) {
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].style.opacity = 0;
        dots[i].className = dots[i].className.replace(' active', '');
    }

    if (n != undefined) {
        clearInterval(timer);
        timer = setInterval(changeSlide, interval);
        currentSlider = n;
    } else {
        currentSlider = (currentSlider + 1) % sliders.length;
    }

    sliders[currentSlider].style.opacity = 1;
    dots[currentSlider].className += ' active';
    
}

document.querySelector('#l').addEventListener('click', function () {
    changeSlide((currentSlider - 1 + sliders.length) % sliders.length);
});

document.querySelector('.ri-arrow-right-wide-line').addEventListener('click', function() {
    changeSlide((currentSlider + 1 ) % sliders.length);
});

function slider() {
    // Initialize the first slide
    sliders[currentSlider].style.opacity = 1;
    dots[currentSlider].className += ' active';
}

function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
slider();
locomotiveAnimation()