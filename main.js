document.addEventListener("DOMContentLoaded", () => {
  const createWalletLink = document.getElementById("nav-create-wallet");
  const viewBalanceLink = document.getElementById("nav-view-balance");
  const buyTicketLink = document.getElementById("nav-buy-ticket");
  const transferTicketLink = document.getElementById("nav-transfer-ticket");

  createWalletLink.addEventListener("click", (event) => {
    event.preventDefault();
    showSection("create-wallet");
  });

  viewBalanceLink.addEventListener("click", (event) => {
    event.preventDefault();
    showSection("view-balance");
  });

  buyTicketLink.addEventListener("click", (event) => {
    event.preventDefault();
    showSection("buy-ticket");
  });

  transferTicketLink.addEventListener("click", (event) => {
    event.preventDefault();
    showSection("transfer-ticket");
  });

  const createWalletButton = document.getElementById("create-wallet-button");
  const downloadWalletButton = document.getElementById(
    "download-wallet-button"
  );

  createWalletButton.addEventListener("click", createWallet);
  downloadWalletButton.addEventListener("click", downloadWallet);

  const getBalanceButton = document.getElementById("view-balance-button");
  getBalanceButton.addEventListener("click", getBalance);
});
