// You can expand this later — animations, fetching blog data, scroll effects etc.
// You can expand this later — animations, fetching blog data, scroll effects etc.
console.log("Page loaded and ready!");
document.getElementById('register-link').addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default anchor behavior
      window.location.href = 'register.html'; // Redirect to the register page
  });
  document.getElementById('read-more-btn').addEventListener('click', function () {
    const moreText = document.querySelector('.more-text');
    const btn = this;
  
    if (moreText.style.display === 'none') {
      moreText.style.display = 'block';
      btn.textContent = 'Read Less';
    } else {
      moreText.style.display = 'none';
      btn.textContent = 'Read More';
    }
  });
  document.getElementById('view-all-categories').addEventListener('click', () => {
    const categoriesSection = document.querySelector('.categories');
    categoriesSection.scrollIntoView({ behavior: 'smooth' });
  });
  const toggleBtn = document.getElementById("mode-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Optional: Change icon
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // Optional: Save preference
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀";
  }
});
