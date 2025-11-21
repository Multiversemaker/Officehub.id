const toggleButton = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("mainContent");

toggleButton.addEventListener("click", () => {
  const isCollapsed = sidebar.classList.contains("collapsed");

  // Toggle sidebar terlebih dahulu
  sidebar.classList.toggle("collapsed");
  sidebar.classList.toggle("expanded");

  // Baru atur main content berdasarkan kondisi sebelumnya
  if (isCollapsed) {
    // collapsed -> expanded
    mainContent.classList.add("shifted");
    mainContent.classList.remove("shifted-collapsed");
  } else {
    // expanded -> collapsed
    mainContent.classList.add("shifted-collapsed");
    mainContent.classList.remove("shifted");
  }
});


document.querySelectorAll(".sidebar .nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    if (sidebar.classList.contains("collapsed")) {
      e.preventDefault();
      sidebar.classList.remove("collapsed");
      sidebar.classList.add("expanded");

      mainContent.classList.add("shifted");
      mainContent.classList.remove("shifted-collapsed");

      setTimeout(() => {
        link.click();
      }, 300);
    }
  });
});