const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

const form = document.getElementById('editBlogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const categoryInput = document.getElementById('category');

// Populate form with existing blog data
async function loadBlog() {
  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
    const data = await res.json();

    if (res.ok) {
      titleInput.value = data.title;
      contentInput.value = data.content;
      categoryInput.value = data.category || '';
    } else {
      alert(data.message || 'Failed to load blog');
    }
  } catch (err) {
    console.error('Error loading blog:', err);
    alert('Error loading blog');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const updatedBlog = {
    title: titleInput.value.trim(),
    content: contentInput.value.trim(),
    category: categoryInput.value.trim()
  };

  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(updatedBlog)
    });

    const data = await res.json();

    if (res.ok) {
      alert('Blog updated successfully!');
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'Failed to update blog.');
    }
  } catch (err) {
    console.error('Error updating blog:', err);
    alert('Something went wrong.');
  }
});

if (!blogId) {
  alert('No blog ID provided.');
  window.location.href = 'dashboard.html';
} else {
  loadBlog();
}
