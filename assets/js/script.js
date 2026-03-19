document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");

  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== menuBtn
    ) {
      sidebar.classList.remove("open");
      document.body.classList.remove("sidebar-open");
    }
  });
});
