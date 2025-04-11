// admin.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Admin not authenticated!');
      window.location.href = 'login.html';
      return;
    }
  
    fetchUsers();
    fetchBlogs();
  
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: token
          }
        });
        const users = await res.json();
  
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
  
        users.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'admin-card';
          userCard.innerHTML = `
            <strong>${user.username}</strong> (${user.email})
            <button onclick="deleteUser('${user._id}')">❌ Delete</button>
          `;
          usersList.appendChild(userCard);
        });
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    }
  
    async function fetchBlogs() {
      try {
        const res = await fetch('http://localhost:5000/api/admin/blogs', {
          headers: {
            Authorization: token
          }
        });
        const blogs = await res.json();
  
        const blogsList = document.getElementById('blogsList');
        blogsList.innerHTML = '';
  
        blogs.forEach(blog => {
          const blogCard = document.createElement('div');
          blogCard.className = 'admin-card';
          blogCard.innerHTML = `
            <strong>${blog.title}</strong> by ${blog.author?.username || 'Unknown'}
            <button onclick="deleteBlog('${blog._id}')">❌ Delete</button>
          `;
          blogsList.appendChild(blogCard);
        });
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    }
  
    window.deleteUser = async (userId) => {
      if (!confirm('Are you sure you want to delete this user?')) return;
  
      try {
        const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token
          }
        });
  
        if (!res.ok) throw new Error('Deletion failed');
  
        alert('User deleted!');
        fetchUsers();
      } catch (err) {
        alert('Error deleting user: ' + err.message);
      }
    };
  
    window.deleteBlog = async (blogId) => {
      if (!confirm('Are you sure you want to delete this blog?')) return;
  
      try {
        const res = await fetch(`http://localhost:5000/api/admin/blogs/${blogId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token
          }
        });
  
        if (!res.ok) throw new Error('Deletion failed');
  
        alert('Blog deleted!');
        fetchBlogs();
      } catch (err) {
        alert('Error deleting blog: ' + err.message);
      }
    };
  });
  