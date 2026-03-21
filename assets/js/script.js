document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");

  if (!menuBtn || !sidebar) return;

  const closeSidebar = () => {
    sidebar.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  };

  const toggleSidebar = (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
  };

  menuBtn.addEventListener("click", toggleSidebar);

  document.addEventListener("click", (e) => {
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedMenuBtn = menuBtn.contains(e.target);

    if (!clickedInsideSidebar && !clickedMenuBtn) {
      closeSidebar();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSidebar();
    }
  });
});
