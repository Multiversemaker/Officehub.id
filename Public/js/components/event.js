const subEventSection = document.getElementById("subEventSection");
const subEventWrapper = document.getElementById("subEventWrapper");
const btnAddSubEvent = document.getElementById("btnAddSubEvent");

// ✅ Pastikan section terlihat kalau sudah ada subEvents dari server
if (subEventWrapper.children.length > 0) {
  subEventSection.style.display = "block";
}

// ✅ Fungsi helper untuk membuat tombol Remove baru
function createRemoveButton(parentDiv) {
  const btnRemove = document.createElement("button");
  btnRemove.type = "button";
  btnRemove.className = "btn";
  btnRemove.textContent = "Remove";
  btnRemove.addEventListener("click", () => {
    parentDiv.remove();
    if (subEventWrapper.children.length === 0) {
      subEventSection.style.display = "none";
    }
  });
  return btnRemove;
}

// ✅ Tambah sub-event baru
btnAddSubEvent.addEventListener("click", () => {
  subEventSection.style.display = "block"; // tampilkan section

  const div = document.createElement("div");
  div.className = "d-flex gap-2 mb-2 align-items-center";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "subEvents[]";
  input.className = "form-control";
  input.placeholder = "Deskripsi Sub Event";

  const btnRemove = createRemoveButton(div);

  div.appendChild(input);
  div.appendChild(btnRemove);
  subEventWrapper.appendChild(div);
});

// ✅ Aktifkan tombol Remove yang sudah ada (pas edit event)
document.querySelectorAll(".btnRemoveSubEvent").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    parent.remove();

    // Sembunyikan section kalau tidak ada subevent tersisa
    if (subEventWrapper.children.length === 0) {
      subEventSection.style.display = "none";
    }
  });
});
