const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const fileNameText = document.getElementById("fileNameText");

dropArea.addEventListener("click", () => fileInput.click());
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("border-primary");
  dropArea.style.backgroundColor = "#e3f2fd";
});
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("border-primary");
  dropArea.style.backgroundColor = "#f8f9fa";
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("border-primary");
  dropArea.style.backgroundColor = "#f8f9fa";
  if (e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    fileInput.files = e.dataTransfer.files;
    fileNameText.textContent = `File terpilih: ${file.name}`;
  }
});
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileNameText.textContent = `File terpilih: ${fileInput.files[0].name}`;
  }
});
