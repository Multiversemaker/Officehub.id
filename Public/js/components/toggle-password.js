const togglePassword = document.querySelector("#togglePassword i");
const passwordInput = document.querySelector("#password");

document.querySelector("#togglePassword").addEventListener("click", () => {
  // toggle input type
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // toggle icon
  togglePassword.classList.toggle("bi-eye");
  togglePassword.classList.toggle("bi-eye-slash");
});
