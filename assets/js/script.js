document.addEventListener("DOMContentLoaded", () => {
  const menuBtnWrap = document.getElementById("menu-btn");
  const menuBtn = menuBtnWrap ? menuBtnWrap.querySelector("button") : null;
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const sidebar = document.getElementById("sidebar");

  if (!menuBtnWrap || !menuBtn || !closeMenuBtn || !sidebar) return;

  const openSidebar = (e) => {
    if (e) e.stopPropagation();
    sidebar.classList.add("open");
    document.body.classList.add("sidebar-open");
  };

  const closeSidebar = (e) => {
    if (e) e.stopPropagation();
    sidebar.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  };

  menuBtn.addEventListener("click", openSidebar);
  closeMenuBtn.addEventListener("click", closeSidebar);

  document.addEventListener("click", (e) => {
    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedMenuWrap = menuBtnWrap.contains(e.target);
    const clickedCloseBtn = closeMenuBtn.contains(e.target);

    if (!clickedInsideSidebar && !clickedMenuWrap && !clickedCloseBtn) {
      closeSidebar();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSidebar();
    }
  });
});
