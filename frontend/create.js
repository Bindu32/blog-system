const form = document.getElementById('createBlogForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const category = document.getElementById('category').value;
  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
      ,
      body: JSON.stringify({ title, content }),
    });

   
      
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create blog');

    alert('✅ Blog created!');
    window.location.href = 'dashboard.html';
  } catch (err) {
    alert('❌ Error: ' + err.message);
  }
});
