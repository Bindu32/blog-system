const container = document.getElementById('fullBlogContainer');
const blogId = new URLSearchParams(window.location.search).get('id');

async function loadBlog() {
  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
    const data = await res.json();

    if (res.ok) {
      container.innerHTML = `
        <h1>${data.title}</h1>
        <p><strong>By:</strong> ${data.author?.username || 'Unknown'}</p>
        <p><strong>Category:</strong> ${data.category || 'Uncategorized'}</p>
        <div style="margin-top: 2rem;">${data.content}</div>
      `;
    } else {
      container.innerHTML = `<p>Error: ${data.message}</p>`;
    }
  } catch (err) {
    container.innerHTML = `<p>Error loading blog.</p>`;
  }
}

loadBlog();
