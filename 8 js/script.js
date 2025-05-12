class Slider {
    constructor(images, options = {}) {
      this.images = images;
      this.currentSlide = 0;
      this.autoplay = options.autoplay || false;
      this.duration = options.duration || 500;
      this.showArrows = options.showArrows !== undefined ? options.showArrows : true;
      this.showDots = options.showDots !== undefined ? options.showDots : true;
      this.sliderContainer = document.querySelector('.slider-container');
      this.slider = document.querySelector('.slider');
      this.dots = document.querySelectorAll('.dot');
      this.prevButton = document.querySelector('.prev');
      this.nextButton = document.querySelector('.next');
      
      this.init();
    }
  
    init() {
      if (this.showArrows) {
        this.prevButton.addEventListener('click', () => this.changeSlide(-1));
        this.nextButton.addEventListener('click', () => this.changeSlide(1));
      }
  
      if (this.showDots) {
        this.dots.forEach((dot, index) => {
          dot.addEventListener('click', () => this.goToSlide(index));
        });
      }
  
      if (this.autoplay) {
        this.startAutoplay();
        this.sliderContainer.addEventListener('mouseenter', () => this.stopAutoplay());
        this.sliderContainer.addEventListener('mouseleave', () => this.startAutoplay());
      }
  
      this.updatePagination();
    }
  
    changeSlide(direction) {
      this.currentSlide = (this.currentSlide + direction + this.images.length) % this.images.length;
      this.updateSlider();
    }
  
    goToSlide(index) {
      this.currentSlide = index;
      this.updateSlider();
    }
  
    updateSlider() {
      this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
      this.updatePagination();
    }
  
    updatePagination() {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
    }
  
    startAutoplay() {
      this.autoplayInterval = setInterval(() => this.changeSlide(1), 3000);
    }
  
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new Slider([
      'image1.jpg', 'image2.jpg', 'image3.jpg'
    ], {
      autoplay: true,
      duration: 500,
      showArrows: true,
      showDots: true
    });
  });
  