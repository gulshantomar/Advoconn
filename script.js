var currentSlider = 0;
var sliders = document.querySelectorAll(".overlay");
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

document.querySelector('.ri-arrow-left-wide-line').addEventListener('click', function() {
    changeSlide((currentSlider - 1 + sliders.length) % sliders.length);
});

document.querySelector('.ri-arrow-right-wide-line').addEventListener('click', function() {
    changeSlide((currentSlider + 1) % sliders.length);
});