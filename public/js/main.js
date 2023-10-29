document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    let currentImageIndex = 0;

    function updateCarousel() {
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
        images[currentImageIndex].style.display = 'block';
    }

    function nextSlide() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateCarousel();
    }

    setInterval(nextSlide, 2000); 

    updateCarousel();
});
