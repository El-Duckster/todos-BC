
const WalletDisplay = ({ accounts, balance }) => {
  const isConnected =  accounts.length > 0;
  console.log("Accounts:", accounts, "Balance:", balance);

  return (
    <div className="wallet-display">
      {isConnected ? (
        <>
          <h3>Wallet Connected</h3>
          <div>
            <strong>Account:</strong> {accounts[0]}
          </div>
          <div>
            <strong>Balance:</strong> {balance} ETH
          </div>
        </>
      ) : (
        <div>No wallet connected.</div>
      )}
    </div>
  );
};

export default WalletDisplay;


