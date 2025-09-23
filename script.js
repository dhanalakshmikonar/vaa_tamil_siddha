const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    slide.style.display = "none";
    if (idx === i) {
      slide.classList.add("active");
      slide.style.display = "block";
    }
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
showSlide(index);


//card js
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-icon').classList.add('bounce');
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-icon').classList.remove('bounce');
  });
});

// Simple bounce animation
const style = document.createElement('style');
style.innerHTML = `
  .bounce { animation: bounce 0.6s; }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }
`;
document.head.appendChild(style);


const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    showTestimonial(currentIndex);
  });
});

// Auto-scroll effect every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 5000);
