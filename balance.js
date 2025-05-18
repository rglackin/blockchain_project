const venueBalanceSpan = document.getElementById("venue-balance-span");
const venueBalanceDiv = document.getElementById("venue-balance");

async function getBalance() {
  const roleSelector = document.getElementById("view-user-role-select");
  const selectedRole = roleSelector.value;
  switch (selectedRole) {
    case "venue":
      await venueBalance();
      return;
    case "attendee":
      await attendeeBalance();
      return;
    case "doorman":
      await doormanBalance();
      return;
  }
}

async function attendeeBalance() {
  const walletAddressInput = document.getElementById(
    "view-wallet-address-input"
  );
  const walletAddress = walletAddressInput.value;
  if (!web3.utils.isAddress(walletAddress)) {
    alert("Please enter a valid wallet address.");
    return;
  }
  try {
    const balance = await web3.eth.getBalance(walletAddress);
    const balanceInEther = web3.utils.fromWei(balance, "ether");
    const balanceSpan = document.getElementById("crypto-balance");
    balanceSpan.textContent = balanceInEther + " ETH";
  } catch (error) {
    console.error("Error fetching balance:", error);
  }

  const contract = new web3.eth.Contract(ABI, contractAddress);
  try {
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const balanceInTokens = web3.utils.fromWei(balance, "ether");
    const balanceSpan = document.getElementById("ticket-balance");
    try {
      const symbol = await contract.methods.symbol().call();
      balanceSpan.textContent = balanceInTokens + " " + symbol;
    } catch (error) {
      console.error("Error fetching ticket symbol:", error);
    }
  } catch (error) {
    console.error("Error fetching ticket balance:", error);
  }
  const balanceDiv = document.getElementById("wallet-balance");
  balanceDiv.style.display = "block";
}

async function venueBalance() {
  const contract = new web3.eth.Contract(ABI, contractAddress);
  try {
    const address = await contract.methods.vendor().call();
    const balance = await contract.methods.balanceOf(address).call();
    const balanceInTokens = web3.utils.fromWei(balance, "ether");
    try {
      const symbol = await contract.methods.symbol().call();
      venueBalanceSpan.textContent = balanceInTokens + " " + symbol;
    } catch (error) {
      console.error("Error fetching ticket symbol:", error);
    }
  } catch (error) {
    console.error("Error fetching venue balance:", error);
  }
  venueBalanceDiv.style.display = "block";
}

function doormanBalance() {
    
}


