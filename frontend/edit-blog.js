const blogId = new URLSearchParams(window.location.search).get("id");
const form = document.getElementById("editBlogForm");

window.onload = async () => {
  if (!blogId) {
    alert("No blog ID found!");
    return;
  }

  try {
    // Replace with your API endpoint
    const res = await fetch(`/api/blogs/${blogId}`);
    const blog = await res.json();

    document.getElementById("title").value = blog.title;
    document.getElementById("category").value = blog.category;
    document.getElementById("content").value = blog.content;

  } catch (error) {
    alert("Failed to load blog.");
    console.error(error);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedBlog = {
    title: form.title.value,
    category: form.category.value,
    content: form.content.value,
  };

  try {
    const res = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedBlog),
    });

    if (res.ok) {
      alert("Blog updated successfully!");
      window.location.href = "profile.html";
    } else {
      throw new Error("Update failed");
    }
  } catch (err) {
    alert("Something went wrong while updating the blog.");
    console.error(err);
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
