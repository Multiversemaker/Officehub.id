const judulDiv = document.getElementById("judul");
const judulInput = document.getElementById("judulInput");
const form = document.querySelector("form");

form.addEventListener("submit", () => {
  judulInput.value = judulDiv.innerText.trim(); // isi input hidden dengan judul
  document.getElementById("informasi").value =
    document.getElementById("editor").innerHTML;
});
