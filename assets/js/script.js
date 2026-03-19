console.log("script.js loaded!");

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

  console.log("Setting up click listener...");
  menuBtn.addEventListener("click", function (e) {
    console.log("✓ Menu button CLICKED");
    e.stopPropagation();
    sidebar.classList.toggle("open");
    console.log("Sidebar classes:", sidebar.className);
    console.log("Is open?", sidebar.classList.contains("open"));
  });

  console.log("Script ready");
});
