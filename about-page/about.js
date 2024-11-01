let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.timeline-item');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.timeline-item');
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1; 
    } else if (currentSlide >= slides.length) {
        currentSlide = 0; 
    }

    showSlide(currentSlide);
}

showSlide(currentSlide);