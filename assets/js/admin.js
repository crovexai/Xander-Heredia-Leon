document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      firebase.auth().signOut()
        .then(function () {
          window.location.href = "admin-login.html";
        })
        .catch(function (error) {
          console.error("Logout error:", error.message);
        });
    });
  }
});
