// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Sapphire } from "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract PredictionMarket {
    using Sapphire for bytes;

    struct Bet {
        address better;
        uint256 amount;
        bytes encryptedPrediction;
        bytes32 nonce;
    }

    mapping(uint256 => Bet) public bets;
    uint256 public betCounter;

    // Store public key as user-defined type
    Sapphire.Curve25519PublicKey public publicKey;
    Sapphire.Curve25519SecretKey private secretKey;

    event NewBet(uint256 indexed betId, address indexed better);

    constructor() {
        // Generate Curve25519 keypair
        (publicKey, secretKey) = Sapphire.generateCurve25519KeyPair("");
    }

    function placeBet(bool _prediction) external payable {
        uint256 betId = betCounter++;
        bytes32 nonce = keccak256(abi.encodePacked(
            block.prevrandao,
            betId,
            msg.sender
        ));

        bytes memory encrypted = Sapphire.encrypt(
            Sapphire.Curve25519PublicKey.unwrap(publicKey), // unwrap to bytes32
            nonce,
            abi.encode(_prediction),
            bytes("")
        );

        bets[betId] = Bet({
            better: msg.sender,
            amount: msg.value,
            encryptedPrediction: encrypted,
            nonce: nonce
        });

        emit NewBet(betId, msg.sender);
    }

    function resolveBet(uint256 _betId, bool _actualOutcome) external {
        Bet storage bet = bets[_betId];

        bytes memory decrypted = Sapphire.decrypt(
            Sapphire.Curve25519PublicKey.unwrap(publicKey),
            bet.nonce,
            bet.encryptedPrediction,
            bytes("")
        );

        bool userPrediction = abi.decode(decrypted, (bool));

        if (userPrediction == _actualOutcome) {
            payable(bet.better).transfer(bet.amount * 2);
        }
        delete bets[_betId];
    }

    function nextUnresolvedBetId() public view returns (uint256) {
        for (uint256 i = 0; i < betCounter; i++) {
            if (bets[i].better != address(0)) {
                return i;
            }
        }
        return type(uint256).max; // All resolved
    }
}