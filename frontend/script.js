document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "login.html");

  try {
    const res = await fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    document.getElementById("username").value = data.username || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("profilePic").value = data.profilePic || "";

  } catch (err) {
    alert("Error loading settings: " + err.message);
  }
});

document.getElementById("settingsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const profilePic = document.getElementById("profilePic").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/users/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        profilePic,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    alert("✅ Settings updated successfully!");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
});

function cancelSettings() {
  window.location.href = "dashboard.html";
}
