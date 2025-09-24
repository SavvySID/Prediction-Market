export const SAPPHIRE_TESTNET = {
  chainId: '0x5aff', // 23295
  chainName: 'Oasis Sapphire Testnet',
  nativeCurrency: { name: 'Test ROSE', symbol: 'tROSE', decimals: 18 },
  rpcUrls: ['https://testnet.sapphire.oasis.io'],
  blockExplorerUrls: ['https://sapphire-explorer.oasis.io/testnet']
};

export async function ensureEthereumProvider() {
  const { ethereum } = window;
  if (!ethereum || !ethereum.request) {
    throw new Error('MetaMask not detected');
  }
  return ethereum;
}

export async function switchOrAddChain(targetChain = SAPPHIRE_TESTNET) {
  const ethereum = await ensureEthereumProvider();
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetChain.chainId }]
    });
  } catch (switchError) {
    // 4902 = chain not added to MetaMask
    if (switchError && switchError.code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [targetChain]
      });
    } else {
      throw switchError;
    }
  }
}

export async function connectWalletSafely() {
  const ethereum = await ensureEthereumProvider();
  try {
    // Prefer checking existing accounts first
    const existing = await ethereum.request({ method: 'eth_accounts' });
    if (existing && existing.length > 0) {
      return existing[0];
    }

    // Ensure correct network before requesting permissions
    await switchOrAddChain();

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts returned');
    }
    return accounts[0];
  } catch (error) {
    // Normalize common errors into user-friendly messages
    if (error && (error.code === 4001 || error.message?.includes('User rejected'))) {
      throw new Error('Connection request rejected in MetaMask');
    }
    if (error && error.message?.includes('MetaMask not detected')) {
      throw error;
    }
    throw new Error('Failed to connect to MetaMask');
  }
}


