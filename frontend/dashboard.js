// Sample data - replace with fetch from backend
const blogs = [
  {
    id: 1,
    title: "How I built my first project",
    content: "It all started with an idea...",
    likes: 0, // Set likes to 0
    dislikes: 0, // Set dislikes to 0
    comments: [], // Set comments to an empty array
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    content: "Closures are powerful...",
    likes: 0, // Set likes to 0
    dislikes: 0, // Set dislikes to 0
    comments: [], // Set comments to an empty array
  },
];

// Track user likes and dislikes
const userLikes = JSON.parse(localStorage.getItem("userLikes")) || {};
const username = localStorage.getItem("username") || "Guest";

// Function to render blogs dynamically
function renderBlogs() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = ""; // Clear existing blogs

  blogs.forEach((blog) => {
    const isLiked = userLikes[username]?.likes?.includes(blog.id); // Check if the user has liked this blog

    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <div class="blog-title">${blog.title}</div>
      <p>${blog.content.substring(0, 150)}...</p>
      <div class="blog-actions">
        <button class="like-btn" onclick="toggleLike(${blog.id})">
          ❤️ <span id="like-count-${blog.id}">${blog.likes}</span>
        </button>
        <button class="comment-btn" onclick="toggleComments(${blog.id})">
          💬 <span id="comment-count-${blog.id}">${blog.comments.length}</span>
        </button>
      </div>
      <div class="comments-section" id="comments-${blog.id}" style="display: none;">
        <h4>Comments:</h4>
        <ul>
          ${blog.comments.map((comment) => `<li>${comment}</li>`).join("")}
        </ul>
        <textarea placeholder="Add a comment..." id="comment-input-${blog.id}"></textarea>
        <button onclick="addComment(${blog.id})">Post Comment</button>
      </div>
    `;
    blogList.appendChild(card);
  });
}

// Toggle like functionality
function toggleLike(blogId) {
  const blog = blogs.find((b) => b.id === blogId);
  if (!blog) return;

  const userLikedBlogs = userLikes[username]?.likes || [];
  if (userLikedBlogs.includes(blogId)) {
    // Unlike the blog
    blog.likes--;
    userLikes[username].likes = userLikedBlogs.filter((id) => id !== blogId);
  } else {
    // Like the blog
    blog.likes++;
    userLikes[username] = {
      ...userLikes[username],
      likes: [...userLikedBlogs, blogId],
    };
  }

  // Save updated data to localStorage
  localStorage.setItem("blogs", JSON.stringify(blogs));
  localStorage.setItem("userLikes", JSON.stringify(userLikes));

  // Re-render blogs
  renderBlogs();
}

// Toggle comments section
function toggleComments(blogId) {
  const commentsSection = document.getElementById(`comments-${blogId}`);
  commentsSection.style.display =
    commentsSection.style.display === "none" ? "block" : "none";
}

// Add a new comment
function addComment(blogId) {
  const commentInput = document.getElementById(`comment-input-${blogId}`);
  const newComment = commentInput.value.trim();
  if (newComment) {
    const blog = blogs.find((b) => b.id === blogId);
    if (blog) {
      blog.comments.push(newComment);
      commentInput.value = ""; // Clear the input field
      renderBlogs(); // Re-render blogs to update the comments
    }
  }
}

// Logout functionality
function logout() {
  window.location.href = "index.html";
}

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
  renderBlogs(); // Render blogs when the page loads
});
