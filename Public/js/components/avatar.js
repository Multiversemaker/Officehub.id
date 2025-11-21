function previewPhoto(event) {
  const file = event.target.files[0];
  const previewImage = document.getElementById("previewImage");
  const defaultIcon = document.getElementById("defaultIcon");

  if (file) {
    previewImage.src = URL.createObjectURL(file);
    previewImage.style.display = "block";   // tampilkan gambar
    defaultIcon.style.display = "none";     // sembunyikan icon
  }
}
