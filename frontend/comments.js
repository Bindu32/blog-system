const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get('id');

const blogTitleDiv = document.getElementById('blogTitle');
const commentsList = document.getElementById('commentsList');

async function loadComments() {
  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch blog');

    blogTitleDiv.innerHTML = `<h2>${data.title}</h2>`;
    
    if (data.comments.length === 0) {
      commentsList.innerHTML = '<p style="color: gray;">No comments yet.</p>';
      return;
    }

    data.comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.style.borderBottom = '1px solid gray';
      commentDiv.style.padding = '1rem 0';

      commentDiv.innerHTML = `
        <p><strong style="color: cyan;">${comment.commentedBy?.username || 'Anonymous'}</strong></p>
        <p style="color: lightgray;">${comment.text}</p>
        <p style="font-size: 0.8rem; color: gray;">${new Date(comment.createdAt).toLocaleString()}</p>
      `;

      commentsList.appendChild(commentDiv);
    });
  } catch (err) {
    console.error('Error loading comments:', err);
    commentsList.innerHTML = '<p style="color: red;">Error loading comments.</p>';
  }
}

if (blogId) {
  loadComments();
} else {
  commentsList.innerHTML = '<p style="color: red;">No blog ID provided.</p>';
}
