const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dotWrap = document.querySelector(".slider-dots");
const sliderButtons = document.querySelectorAll(".slider-btn");
let activeSlide = 0;
let sliderTimer;

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function setSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });
  document.querySelectorAll(".slider-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeSlide);
  });
}

function restartSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => setSlide(activeSlide + 1), 5600);
}

slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.className = "slider-dot";
  dot.addEventListener("click", () => {
    setSlide(index);
    restartSlider();
  });
  dotWrap.appendChild(dot);
});

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "next" ? 1 : -1;
    setSlide(activeSlide + direction);
    restartSlider();
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.classList.toggle("is-flipped");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${Math.min((index % 5) * 70, 280)}ms`);
  revealObserver.observe(element);
});

function updateParallax() {
  const viewportHeight = window.innerHeight || 1;
  document.querySelectorAll(".parallax-layer").forEach((layer) => {
    const speed = Number(layer.dataset.speed || 0.15);
    const parent = layer.parentElement;
    const rect = parent.getBoundingClientRect();
    const offset = (rect.top - viewportHeight / 2) * speed;
    layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
  });
}

let ticking = false;
function onScroll() {
  updateHeader();
  if (navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}

document.querySelector(".consult-form").addEventListener("submit", (event) => {
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Sending Request...";
  button.disabled = true;
});

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateParallax);

setSlide(0);
restartSlider();
updateHeader();
updateParallax();
