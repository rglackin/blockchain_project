function showSection(sectionId) {
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const roleSelect = document.getElementById("view-user-role-select");
  const walletInputDiv = document.getElementById("wallet-address-input-container");
  const divs = [document.getElementById("wallet-balance"),
    document.getElementById("venue-balance"),
    document.getElementById("doorman-check")
  ];

  if (!roleSelect || !walletInputDiv) return;
  function toggleWalletInput() {
    if (roleSelect.value === "venue") {
      walletInputDiv.style.display = "none";
    } else {
      walletInputDiv.style.display = "";
    }
    divs.forEach(div => {
    if (div) div.style.display = "none";
});
  }
  roleSelect.addEventListener("change", toggleWalletInput);
  toggleWalletInput(); 
});
