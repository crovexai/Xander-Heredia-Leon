document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded fired");
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");

  console.log("menuBtn:", menuBtn);
  console.log("sidebar:", sidebar);

  if (!menuBtn || !sidebar) {
    console.log("Menu button or sidebar not found");
    return;
  }

  menuBtn.addEventListener("click", function (e) {
    console.log("Menu button clicked!", e);
    e.stopPropagation();
    sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
    console.log("Sidebar open class:", sidebar.classList.contains("open"));
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== menuBtn &&
      !menuBtn.contains(e.target)
    ) {
      sidebar.classList.remove("open");
      document.body.classList.remove("sidebar-open");
    }
  });
});
