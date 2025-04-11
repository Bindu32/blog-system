const blogFeed = document.getElementById('blog-feed');

async function fetchBlogs() {
  try {
    const res = await fetch('http://localhost:5000/api/blogs');
    const blogs = await res.json();

    blogFeed.innerHTML = '';

    blogs.reverse().forEach(blog => {
      const shortContent = blog.content?.slice(0, 150) || '';
      const shortCategory = (blog.category || 'Uncategorized').slice(0, 20);

      const blogCard = document.createElement('div');
      blogCard.style.border = '2px solid';
      blogCard.style.borderImage = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) 1';
      blogCard.style.borderRadius = '1rem';
      blogCard.style.padding = '1rem';
      blogCard.style.background = '#111';

      blogCard.innerHTML = `
        <h3 style="color: violet;">${blog.title}</h3>
        <p style="color: gray;">by <a href="#" style="color: cyan;">${blog.author?.username || 'Unknown'}</a></p>
        <p style="margin: 1rem 0;">${shortContent}...</p>
        <p><strong>Category:</strong> <span style="color: orange;">${shortCategory}</span></p>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button id="like-${blog._id}" onclick="likeBlog('${blog._id}')" style="${buttonStyle()}">👍 ${blog.likes.length}</button>

          <button onclick="dislikeBlog('${blog._id}')" style="${buttonStyle()}">👎 ${blog.dislikes.length}</button>
          

          <button onclick="commentOnBlog('${blog._id}')" style="${buttonStyle()}">💬 Comments (${blog.comments.length})</button>
          <button onclick="saveBlog('${blog._id}')" style="${buttonStyle()}">💾 Save</button>
          <button class="editBtn" data-id="${blog._id}" style="${buttonStyle()}">✏️ Edit</button>
          <h3 onclick="viewFullBlog('${blog._id}')" style="cursor: pointer; color: violet;">${blog.title}</h3>

        </div>
      `;

      blogFeed.appendChild(blogCard);
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
}



function buttonStyle() {
  return `
    background: none;
    border: 2px solid;
    border-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet) 1;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  `;
}

// Navigate to Create Blog Page
document.getElementById('createBlogBtn')?.addEventListener('click', () => {
  window.location.href = 'create.html';
});

// Listen for Edit buttons (after blogs are loaded)
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('editBtn')) {
    const blogId = e.target.dataset.id;
    window.location.href = `edit.html?id=${blogId}`;
  }
});


// 📌 Action handlers


// Like a blog
async function likeBlog(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:5000/api/blogs/${id}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  });

  if (!res.ok) {
    const err = await res.json();
    alert(`Like failed: ${err.message}`);
    return;
  }

  // ✅ Increase count on button
  const likeBtn = document.getElementById(`like-${id}`);
  if (likeBtn) {
    const currentCount = parseInt(likeBtn.textContent.match(/\d+/)[0]); // extract number
    likeBtn.innerHTML = `👍 ${currentCount + 1}`;
  }
}


async function dislikeBlog(id) {
  await fetch(`http://localhost:5000/api/blogs/${id}/dislike`, {
    method: 'POST',
    headers: { 'Authorization': localStorage.getItem('token') }
  });
  fetchBlogs();
}


function commentOnBlog(blogId) {
  const comment = prompt('💬 Enter your comment:');
  if (!comment) return;

  fetch(`http://localhost:5000/api/blogs/${blogId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ text: comment })
  })
  .then(res => res.json())
  .then(data => {
    alert('✅ Comment added!');
    fetchBlogs(); // reload with new comment count
  })
  .catch(err => {
    alert('❌ Error posting comment');
    console.error(err);
  });
}

//<button onclick="window.location.href='comments.html?id=${blog._id}'" style="${buttonStyle()}">💬 Comments (${blog.comments.length})</button>


async function saveBlog(id) {
  await fetch(`http://localhost:5000/api/user/save/${id}`, {
    method: 'POST',
    headers: { 'Authorization': localStorage.getItem('token') }
  });
  alert('Blog saved!');
}

function viewFullBlog(blogId) {
  window.location.href = `blog.html?id=${blogId}`;
}

function toggleSidePanel() {
  document.getElementById('sidePanel').classList.toggle('open');
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

function goToSettings() {
  window.location.href = 'settings.html';
}

async function loadDashboardUser() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('http://localhost:5000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Profile Picture
    const profilePic = data.profilePic || 'default-profile.png';
    document.getElementById('dashboardProfilePic').src = profilePic;
    document.getElementById('sidePanelProfilePic').src = profilePic;

    // Username, Posts, Likes
    document.getElementById('sideUsername').innerText = '@' + data.username;
    document.getElementById('postCount').innerText = data.blogs.length;
    document.getElementById('likeCount').innerText = data.totalLikes;

  } catch (err) {
    console.error('Error loading dashboard user:', err.message);
  }
}

loadDashboardUser();


fetchBlogs();
