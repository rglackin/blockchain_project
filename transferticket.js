document.addEventListener("DOMContentLoaded", function () {
    const transferButton = document.getElementById("transfer-ticket-button");
    const keystoreInput = document.getElementById("transfer-keystore-file");
    const passwordInput = document.getElementById("transfer-keystore-password");
    const loadWalletButton = document.getElementById("load-transfer-wallet-button");
    const walletInfoDiv = document.getElementById("transfer-wallet-info");
    const walletAddressSpan = document.getElementById("transfer-wallet-address");
    const requestDiv = document.getElementById("transfer-ticket-request");
    const requestPre = document.getElementById("transfer-ticket-request-json");
    const resultDiv = document.getElementById("transfer-ticket-result");
    const resultPre = document.getElementById("transfer-ticket-result-json");

    let keystoreJson = null;
    let decryptedAccount = null;

    keystoreInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                keystoreJson = JSON.parse(evt.target.result);
                passwordInput.value = "";
                decryptedAccount = null;
                walletInfoDiv.style.display = "none";
                walletAddressSpan.textContent = "";
            } catch (err) {
                alert("Invalid keystore file.");
                keystoreJson = null;
                decryptedAccount = null;
                walletInfoDiv.style.display = "none";
                walletAddressSpan.textContent = "";
            }
        };
        reader.readAsText(file);
    });

    loadWalletButton.addEventListener("click", function () {
        if (!keystoreJson) {
            alert("Please upload a valid keystore file.");
            return;
        }
        const password = passwordInput.value;
        if (!password) {
            alert("Please enter your keystore password.");
            return;
        }
        try {
            decryptedAccount = web3.eth.accounts.decrypt(keystoreJson, password);
            walletInfoDiv.style.display = "block";
            walletAddressSpan.textContent = decryptedAccount.address;
        } catch (error) {
            decryptedAccount = null;
            walletInfoDiv.style.display = "none";
            walletAddressSpan.textContent = "";
            alert("Failed to decrypt keystore: " + error.message);
        }
    });

    transferButton.addEventListener("click", async function () {
        if (!decryptedAccount) {
            alert("Please load your wallet first.");
            return;
        }
        const fromAddress = decryptedAccount.address;
        const contract = new web3.eth.Contract(ABI, contractAddress);
        const txData = contract.methods.returnTicket().encodeABI();
        const tx = {
            from: fromAddress,
            to: contractAddress,
            data: txData,
            gas: 300000
        };
        requestDiv.style.display = "block";
        requestPre.textContent = JSON.stringify(tx, null, 2);
        resultDiv.style.display = "none";
        try {
            const signed = await web3.eth.accounts.signTransaction(tx, decryptedAccount.privateKey);
            web3.eth.sendSignedTransaction(signed.rawTransaction)
                .on('transactionHash', function(hash) {
                    resultDiv.style.display = "block";
                    resultPre.innerHTML = `<strong>Transaction sent!</strong><br>Hash: <a href=\"https://sepolia.etherscan.io/tx/${hash}\" target=\"_blank\">${hash}</a><br><em>You can track your transaction status using the hash above in a block explorer.</em>`;
                })
                .on('error', function(err) {
                    resultDiv.style.display = "block";
                    resultPre.innerHTML += `<br><br><span style=\"color:red;\"><strong>Error:</strong> ${err.message || JSON.stringify(err)}</span>`;
                });
        } catch (err) {
            resultDiv.style.display = "block";
            resultPre.innerHTML = `<span style=\"color:red;\"><strong>Error:</strong> ${err.message || JSON.stringify(err)}</span>`;
        }
    });
});
