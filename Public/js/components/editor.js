// /public/js/editor.js
document.addEventListener("DOMContentLoaded", function () {
  // pastikan Quill sudah di-load
  if (typeof Quill === "undefined") {
    console.error(
      "Quill belum dimuat. Pastikan CDN Quill dimasukkan sebelum editor.js"
    );
    return;
  }

  // Init Quill
  const quill = new Quill("#editor", {
    theme: "snow",
    modules: { toolbar: "#toolbar" },
    placeholder: "Tulis isi artikel di sini...",
  });

  // Ambil elemen penting
  const editorEl = document.getElementById("editor");
  let hiddenInformasi = document.getElementById("informasi");

  // Jika hiddenInformasi ada (mis. update), load ke quill
  if (
    hiddenInformasi &&
    hiddenInformasi.value &&
    hiddenInformasi.value.trim() !== ""
  ) {
    quill.root.innerHTML = hiddenInformasi.value;
  } else if (editorEl && editorEl.innerHTML.trim() !== "") {
    // atau jika server menyisipkan konten langsung di #editor
    quill.root.innerHTML = editorEl.innerHTML;
  }

  // cari form (cari by id dulu, kalau nggak ada fallback ke first form)
  const form =
    document.getElementById("articleForm") || document.querySelector("form");
  if (!form) {
    console.error(
      "Form artikel tidak ditemukan. Tambahkan id='articleForm' atau pastikan ada <form> di page."
    );
    return;
  }

  // pastikan hidden inputs ada (jika tidak ada, buat)
  const judulEl = document.getElementById("judul");
  let judulInput = document.getElementById("judulInput");
  if (!judulInput) {
    judulInput = document.createElement("input");
    judulInput.type = "hidden";
    judulInput.name = "judul";
    judulInput.id = "judulInput";
    form.appendChild(judulInput);
  }

  if (!hiddenInformasi) {
    hiddenInformasi = document.createElement("input");
    hiddenInformasi.type = "hidden";
    hiddenInformasi.name = "informasi";
    hiddenInformasi.id = "informasi";
    form.appendChild(hiddenInformasi);
  }

  let ringkasanInput = document.getElementById("ringkasanInput");
  if (!ringkasanInput) {
    ringkasanInput = document.createElement("input");
    ringkasanInput.type = "hidden";
    ringkasanInput.name = "ringkasan";
    ringkasanInput.id = "ringkasanInput";
    form.appendChild(ringkasanInput);
  }

  // Submit handler: isi semua hidden inputs & validasi client-side sederhana
  form.addEventListener("submit", function (e) {
    // isi judul
    const judulText = judulEl ? judulEl.innerText.trim() : "";
    judulInput.value = judulText;

    // isi informasi (HTML)
    hiddenInformasi.value = quill.root.innerHTML.trim();

    // buat ringkasan dari plain text (first 200 chars)
    const plain = quill.getText().trim();
    const summary = plain
      ? plain.length > 200
        ? plain.slice(0, 200) + "..."
        : plain
      : "";
    ringkasanInput.value = summary;

    console.log("DEBUG submit article:", {
      judul: judulInput.value,
      informasiLength: hiddenInformasi.value.length,
      ringkasan: ringkasanInput.value,
    });

    // simple client validation to avoid Mongoose required error
    if (!judulInput.value || !hiddenInformasi.value || !ringkasanInput.value) {
      e.preventDefault();
      alert("Judul, ringkasan, dan isi artikel harus terisi.");
      return false;
    }
    // else submit proceeds
  });

  // Image preview (sama seperti sebelumnya)
  const imageInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");
  if (imageInput && imagePreview) {
    imageInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) {
        imagePreview.innerHTML = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" class="img-fluid rounded mt-2" style="max-height:300px;" />`;
      };
      reader.readAsDataURL(file);
    });
  }
});
