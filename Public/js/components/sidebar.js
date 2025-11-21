document.querySelectorAll(".dropdown-toggle-custom").forEach(function (toggle) {
  toggle.addEventListener("click", function (e) {
    if (e.target.classList.contains("toggle-arrow")) {
      const submenu = toggle.parentElement.querySelector(".dropdown-submenu");
      if (submenu) {
        submenu.style.display =
          submenu.style.display === "none" ? "block" : "none";
      }
      e.preventDefault();
    }
  });
});

