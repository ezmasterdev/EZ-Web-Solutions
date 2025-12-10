// ------- //
// GENERAL
// ------- //
AOS.init({duration:700, once:true});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
});



// --------------- //
// Form Submission
// --------------- //
const form = document.getElementById("contactForm");
const formWrapper = document.getElementById("formWrapper");
const thankYouCard = document.getElementById("thankYouCard");
const backToForm = document.getElementById("backToForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // Show thank-you card
      form.style.display = "none";
      thankYouCard.style.display = "block";
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Oops! Network error. Please try again.");
    console.error(error);
  }
});
// Reset form if user clicks "Send Another"
backToForm.addEventListener("click", () => {
  form.reset();
  form.style.display = "block";
  thankYouCard.style.display = "none";
});

// -------------------- //
// Testimonial Rotation
// -------------------- //
document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
  const cards = Array.from(carousel.children);
  cards.forEach(card => carousel.appendChild(card.cloneNode(true))); // duplicate for seamless loop

  let isDragging = false, startX = 0, currentTranslate = 0, lastTranslate = 0, velocity = 0;
  const autoSpeed = 0.5; // px per frame

  const setTranslate = x => {
    carousel.style.transform = `translateX(${x}px)`;
  };

  const startDrag = e => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    lastTranslate = currentTranslate;
    velocity = 0;
    carousel.style.cursor = 'grabbing';
  };

  const drag = e => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const delta = x - startX;
    currentTranslate = lastTranslate + delta;
    velocity = delta; // for momentum
    setTranslate(currentTranslate);
  };

  const endDrag = () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
  };

  const loop = () => {
    if (!isDragging) {
      currentTranslate += carousel.classList.contains('reverse') ? -autoSpeed : autoSpeed;
      currentTranslate += velocity * 0.1; // momentum
      velocity *= 0.95;

      // reset for seamless loop
      const totalWidth = carousel.scrollWidth / 2;
      if (currentTranslate > 0) currentTranslate -= totalWidth;
      if (currentTranslate < -totalWidth) currentTranslate += totalWidth;

      setTranslate(currentTranslate);
    }
    requestAnimationFrame(loop);
  };

  loop();

  // Event listeners
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('touchstart', startDrag);
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('touchmove', drag);
  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('mouseleave', endDrag);
  carousel.addEventListener('touchend', endDrag);
});



// ----------------- //
// Match Card Height
// ----------------- //
function setUniformTestimonialHeight() {
  document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
    const cards = carousel.querySelectorAll('.testimonial-card');
    let maxHeight = 0;

    // Reset heights
    cards.forEach(card => card.style.height = 'auto');

    // Find tallest card
    cards.forEach(card => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) maxHeight = cardHeight;
    });

    // Apply tallest height to all cards
    cards.forEach(card => card.style.height = maxHeight + 'px');
  });
}
// Initial call
setUniformTestimonialHeight();
// Recalculate on window resize
window.addEventListener('resize', setUniformTestimonialHeight);


// ------------- //
// Screen Loader
// ------------- //
// Hide loader after 3 seconds
  window.addEventListener("load", function () {
    setTimeout(() => {
      const loader = document.getElementById("screen-loader");
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.6s ease";
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }, 3000);
  });
