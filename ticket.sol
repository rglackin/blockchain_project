// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract TicketToken is IERC20 {
    string public name = "TicketToken";
    string public symbol = "TIX";
    uint8 public decimals = 18;

    uint256 private _totalSupply;
    address public owner;
    address public vendor;
    uint256 public ticketPrice = 0.01 ether;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) public ticketHolders;

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        vendor = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function allowance(address owner_, address spender) public view override returns (uint256) {
        return _allowances[owner_][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(_allowances[from][msg.sender] >= amount, "Allowance exceeded");
        _allowances[from][msg.sender] -= amount;
        _transfer(from, to, amount);
        return true;
    }

    function _mint(address to, uint256 amount) internal {
        _totalSupply += amount;
        _balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(_balances[from] >= amount, "Insufficient balance");
        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
    }

    function buyTicket() public payable {
        require(msg.value >= ticketPrice, "Insufficient ETH sent");
        require(_balances[vendor] >= 1 * 10**decimals, "No tickets left");

        _transfer(vendor, msg.sender, 1 * 10**decimals);
        ticketHolders[msg.sender] = true;
    }

    function returnTicket() public {
        uint256 ticketAmount = 1 * 10**decimals;
        require(_balances[msg.sender] >= ticketAmount, "You don't own a ticket");

        _transfer(msg.sender, vendor, ticketAmount);
        ticketHolders[msg.sender] = false;
        payable(msg.sender).transfer(ticketPrice);
    }

    function hasTicket(address user) public view returns (bool) {
        return ticketHolders[user];
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
