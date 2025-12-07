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
