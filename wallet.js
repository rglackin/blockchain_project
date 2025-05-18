const walletAddressSpan = document.getElementById("wallet-address");
const keystoreTextArea = document.getElementById("wallet-keystore-file");

function createWallet() {
  const passwordInput = document.getElementById("password-create");
  const password = passwordInput.value;

  if (password == "") {
    alert("Enter a password for the Key Store File please.");
    return;
  }

  var wallet = web3.eth.accounts.create();

  walletAddressSpan.textContent = wallet.address;

  const privateKeySpan = document.getElementById("wallet-private-key");
  privateKeySpan.textContent = wallet.privateKey;

  const keystore = web3.eth.accounts.encrypt(wallet.privateKey, password);

  keystoreTextArea.textContent = JSON.stringify(keystore);

  const walletDetailsDiv = document.getElementById("wallet-details");
  walletDetailsDiv.style.display = "block";
}

function downloadWallet() {
  const keystore = keystoreTextArea.textContent;
  const filename = walletAddressSpan.textContent + ".json";

  const blob = new Blob([keystore], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
