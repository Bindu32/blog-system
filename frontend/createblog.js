// filepath: c:\Users\bhair\project\frontend\create-blog.js

document.getElementById('create-blog-form').addEventListener('submit', async (e) => {
      e.preventDefault();
    
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
    
      try {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required
          },
          body: JSON.stringify({ title, content }),
        });
    
        if (response.ok) {
          alert('Blog post created successfully!');
          window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to create blog post.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong. Please try again later.');
      }
    });
