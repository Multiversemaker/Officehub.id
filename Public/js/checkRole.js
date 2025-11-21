const roleSelect = document.getElementById("roleSelect");
const departementContainer = document.getElementById("departementContainer");
const departementSelect = document.getElementById("departementSelect");

function checkRole() {
    const role = roleSelect.value;

    if (role === "manager") {
        departementContainer.style.display = "none";
        departementSelect.removeAttribute("required");
        departementSelect.value = "";
        departementSelect.disabled = true;
    } else {
        departementContainer.style.display = "";
        departementSelect.setAttribute("required", "required");
        departementSelect.disabled = false;
    }
}

roleSelect.addEventListener("change", checkRole);
checkRole();