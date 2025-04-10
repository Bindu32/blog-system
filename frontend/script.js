console.log("Page loaded and ready!");

// ===================
// Register Redirect
// ===================
const registerLink = document.getElementById('register-link');
if (registerLink) {
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'register.html';
  });
}

// ===================
// Read More Toggle
// ===================
const readMoreBtn = document.getElementById('read-more-btn');
const moreText = document.querySelector('.more-text');

if (readMoreBtn && moreText) {
  readMoreBtn.addEventListener('click', () => {
    const isHidden = moreText.style.display === 'none';
    moreText.style.display = isHidden ? 'block' : 'none';
    readMoreBtn.textContent = isHidden ? 'Read Less' : 'Read More';
  });
}

// ===================
// View All Categories Scroll
// ===================
const viewAllBtn = document.getElementById('view-all-categories');
if (viewAllBtn) {
  viewAllBtn.addEventListener('click', () => {
    const categoriesSection = document.querySelector('.categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ===================
// Dark/Light Mode Toggle
// ===================
const toggleBtn = document.getElementById("mode-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Load saved theme
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀";
    }
  });
}

// ===================
// Settings Page Logic (optional, auto-executes only if elements exist)
// ===================
if (window.location.pathname.includes("settings.html")) {
  const form = document.getElementById("settings-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const deleteBtn = document.getElementById("delete-account");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedData = {
      username: usernameInput?.value,
      email: emailInput?.value,
      password: passwordInput?.value,
    };
    console.log("Updated profile data:", updatedData);
    alert("Settings saved! (placeholder)");
  });

  deleteBtn?.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      console.log("Account deleted.");
      alert("Your account has been deleted! (placeholder)");
    }
  });
}
