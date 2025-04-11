const profileContainer = document.getElementById('profileContainer');

// Get userId from query string: profile.html?userId=123
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// Function to fetch and display profile info and blogs
async function loadUserProfile() {
  try {
    const res = await fetch(`http://localhost:5000/api/users/${userId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to load profile');
    }

    const { username, profilePic, blogs, totalLikes } = data;

    profileContainer.innerHTML = `
      <div class="profile-header">
        <img src="${profilePic || 'default-profile.png'}" alt="Profile Pic" class="profile-pic" />
        <div>
          <div class="username">@${username}</div>
          <div class="stats">
            📝 Blogs: ${blogs.length} &nbsp;&nbsp; ❤️ Total Likes: ${totalLikes}
          </div>
        </div>
      </div>

      <div class="blog-list">
        ${blogs.map(blog => `
          <div class="blog-card">
            <h3>${blog.title}</h3>
            <p>${blog.content.slice(0, 150)}...</p>
            <p><strong>Likes:</strong> ${blog.likes.length} | <strong>Category:</strong> ${blog.category || 'Uncategorized'}</p>
          </div>
        `).join('')}
      </div>
    `;
  } catch (err) {
    console.error('Error:', err.message);
    profileContainer.innerHTML = `<p style="color: red;">❌ ${err.message}</p>`;
  }
}

// Load the profile
if (userId) {
  loadUserProfile();
} else {
  profileContainer.innerHTML = `<p style="color: red;">❌ No user ID provided.</p>`;
}
