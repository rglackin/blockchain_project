const web3 = new Web3("https://holesky.drpc.org");

function showSection(sectionId) {
    const sections = document.querySelectorAll('.tab-content');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

const walletAddressSpan = document.getElementById('wallet-address')
const keystoreTextArea = document.getElementById("wallet-keystore-file");

function createWallet() {
    const passwordInput = document.getElementById('password-create')
    const password = passwordInput.value;

    if(password==""){
        alert("Enter a password for the Key Store File please.");
        return;
    }

    var wallet = web3.eth.accounts.create();

    walletAddressSpan.textContent = wallet.address;

    const privateKeySpan = document.getElementById('wallet-private-key')
    privateKeySpan.textContent = wallet.privateKey;

    const keystore = web3.eth.accounts.encrypt(wallet.privateKey, password);
    
    keystoreTextArea.textContent = JSON.stringify(keystore);

    const walletDetailsDiv = document.getElementById('wallet-details');
    walletDetailsDiv.style.display = 'block';
}

function downloadWallet(){
    const keystore = keystoreTextArea.textContent;
    const filename = walletAddressSpan.textContent + ".json";

    const blob = new Blob([keystore], {type:'application/json'} );
    const url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

document.addEventListener('DOMContentLoaded', () => {
    const createWalletLink = document.getElementById('nav-create-wallet');
    const viewBalanceLink = document.getElementById('nav-view-balance');
    const buyTicketLink = document.getElementById('nav-buy-ticket');
    const transferTicketLink = document.getElementById('nav-transfer-ticket');

    createWalletLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('create-wallet');
    });

    viewBalanceLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('view-balance');
    });

    buyTicketLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('buy-ticket');
    });

    transferTicketLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSection('transfer-ticket');
    });

    const createWalletButton = document.getElementById('create-wallet-button');
    const downloadWalletButton = document.getElementById('download-wallet-button');

    createWalletButton.addEventListener('click', createWallet);
    downloadWalletButton.addEventListener('click', downloadWallet);

});

