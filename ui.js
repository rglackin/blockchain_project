function showSection(sectionId) {
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const roleSelect = document.getElementById("view-user-role-select");
  const walletInputDiv = document.getElementById("wallet-address-input-container");
  if (!roleSelect || !walletInputDiv) return;
  function toggleWalletInput() {
    if (roleSelect.value === "venue") {
      walletInputDiv.style.display = "none";
    } else {
      walletInputDiv.style.display = "";
    }
  }
  roleSelect.addEventListener("change", toggleWalletInput);
  toggleWalletInput(); 
});
