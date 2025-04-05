document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
  
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Save token in localStorage
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      // Redirect to dashboard or home page
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Login failed');
    }
  });
  