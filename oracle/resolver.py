from sapphirepy import sapphire, envelope, error
from web3 import Web3
# from web3.middleware import construct_sign_and_send_raw_middleware
import os, json
from dotenv import load_dotenv

load_dotenv()

# Initialize Web3 with Sapphire middleware
w3 = Web3(Web3.HTTPProvider(sapphire.NETWORKS["sapphire-testnet"]))
w3 = sapphire.wrap(w3)

private_key = os.getenv("ORACLE_PRIVATE_KEY")  
account = w3.eth.account.from_key(private_key)
# w3.middleware_onion.add(
#     construct_sign_and_send_raw_middleware(account),
#     layer=0
# )

w3.eth.default_account = account.address

# Contract configuration
CONTRACT_ADDRESS = "0xAe599d6C9C53599E70342E7293b1ce8359Eb8a68"
CONTRACT_ABI = json.loads("""[
    {
        "inputs": [],
        "name": "nextUnresolvedBetId",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "_betId", "type": "uint256"},
            {"internalType": "bool", "name": "_actualOutcome", "type": "bool"}
        ],
        "name": "resolveBet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]""")

# Initialize contract instance
contract = w3.eth.contract(
    address=CONTRACT_ADDRESS,
    abi=CONTRACT_ABI
)

def fetch_real_world_result(event_id: str) -> bool:
    # For Future : Add API integration
    return True 

def process_event(event_id: int):
    try:
        # Fetch real-world outcome
        result = fetch_real_world_result(str(event_id))
        
        # Build encrypted transaction
        tx = contract.functions.resolveBet(event_id, result).build_transaction({
            'chainId': 23295, 
            'gas': 200000,
            'gasPrice': w3.to_wei('100', 'gwei'),  
            'nonce': w3.eth.get_transaction_count(account.address)
        })
        
        # Sign and send transaction
        signed_tx = account.sign_transaction(tx)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        return tx_hash.hex()
    
    except envelope.DecryptError as e:
        print(f"Decryption failed: {e}")
    except envelope.CallError as e:
        print(f"Contract call failed: {e}")
    except error.SapphireError as e:
        print(f"Sapphire error: {e}")

def get_unresolved_events():
    event_filter = contract.events.NewBet.create_filter(fromBlock='latest')
    return event_filter.get_new_entries()

def get_event_id_from_contract():
    # Get next unresolved bet ID
    try:
        result = contract.functions.nextUnresolvedBetId().call()
        print(f"Successfully fetched unresolved ID: {result}")
        return result
    except Exception as e:
        print(f"Error fetching unresolved ID: {e}")
        return 0  # Return 0 instead of None to avoid type errors

def test_connection():
    """Test if we can connect to the contract"""
    try:
        # Test basic connection
        chain_id = w3.eth.chain_id
        print(f"Connected to chain ID: {chain_id}")
        
        # Test contract connection
        contract_address = contract.address
        print(f"Contract address: {contract_address}")
        
        # Test if contract is deployed
        code = w3.eth.get_code(contract_address)
        if code == b'':
            print("ERROR: No contract code found at this address!")
            return False
        else:
            print("Contract code found - contract is deployed")
            return True
            
    except Exception as e:
        print(f"Connection test failed: {e}")
        return False

def main():
    print("=== Oracle Service Starting ===")
    
    # Test connection first
    if not test_connection():
        print("Cannot connect to contract. Please check:")
        print("1. Contract is deployed")
        print("2. Network is correct")
        print("3. Contract address is correct")
        return
    
    # Get event ID from contract
    event_id = get_event_id_from_contract()  
    print(f"Next unresolved bet ID: {event_id}")

    if event_id > 0:
        tx_hash = process_event(event_id)
        print(f"Resolved bet {event_id} in tx: {tx_hash}")
    else:
        print("No pending bets to resolve.")

if __name__ == "__main__":
    main()