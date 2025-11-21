document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-view-online").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const id = btn.dataset.id;

      try {
        const res = await fetch(`/employee/documents/${id}/view`);
        const data = await res.json();

        if (data.document && data.document.viewUrl) {
          const fixedUrl = data.document.viewUrl.replace(
            "?dl=0?cloud_editor=word&dl=0",
            "?raw=1"
          );
          window.open(fixedUrl, "_blank");
        } else {
          alert("Gagal mendapatkan URL viewer dari Dropbox.");
        }
      } catch (err) {
        console.error("Error membuka dokumen:", err);
        alert("Terjadi kesalahan saat membuka dokumen.");
      }
    });
  });
});
