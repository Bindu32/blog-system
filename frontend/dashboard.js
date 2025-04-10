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

// Function to render blogs dynamically
function renderBlogs() {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = ""; // Clear existing blogs

  blogs.forEach((blog) => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <div class="blog-title">${blog.title}</div>
      <p>${blog.content.substring(0, 150)}...</p>
      <div class="blog-actions">
        <button class="like-btn" onclick="like(${blog.id})">❤️ <span id="like-count-${blog.id}">${blog.likes}</span></button>
        <button class="dislike-btn" onclick="dislike(${blog.id})">👎 <span id="dislike-count-${blog.id}">${blog.dislikes}</span></button>
        <button class="comment-btn" onclick="toggleComments(${blog.id})">💬 ${blog.comments.length}</button>
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

// Like functionality
function like(id) {
  const blog = blogs.find((b) => b.id === id);
  if (blog) {
    blog.likes++;
    document.getElementById(`like-count-${id}`).textContent = blog.likes;
  }
}

// Dislike functionality
function dislike(id) {
  const blog = blogs.find((b) => b.id === id);
  if (blog) {
    blog.dislikes++;
    document.getElementById(`dislike-count-${id}`).textContent = blog.dislikes;
  }
}

// Toggle comments section
function toggleComments(id) {
  const commentsSection = document.getElementById(`comments-${id}`);
  commentsSection.style.display =
    commentsSection.style.display === "none" ? "block" : "none";
}

// Add a new comment
function addComment(id) {
  const commentInput = document.getElementById(`comment-input-${id}`);
  const newComment = commentInput.value.trim();
  if (newComment) {
    const blog = blogs.find((b) => b.id === id);
    if (blog) {
      blog.comments.push(newComment);
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
