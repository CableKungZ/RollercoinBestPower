function main() {
    let PowerPerKecoin = 90000; // Power required to generate each 1000 Ecoins
    let BonusPerKEcoin = 8; // Bonus percentage per 1000 Ecoins
    let miners = getBestRatioMiners(PowerPerKecoin, BonusPerKEcoin);
    console.log("Sort By Best Ecoin Ratio");
    console.log("Power/1000Ecoin : " + PowerPerKecoin + " GH/S");
    console.log("Bonus/1000Ecoin : " + BonusPerKEcoin + " %");
    displayMiners(miners);
}

function getBestRatioMiners(PowerPerKecoin, BonusPerKEcoin) {
    let miners = [];
    let minerTitles = document.getElementsByClassName('item-title');
    let minerPrices = document.getElementsByClassName('item-price');
    let minerPowers = document.getElementsByClassName('item-addition-power');
    let minerBonuses = document.getElementsByClassName('item-addition-bonus');

    for (let i = 0; i < minerTitles.length; i++) {
        let name = minerTitles[i].textContent.trim();
        let powerText = minerPowers[i].textContent.trim();
        let bonusText = minerBonuses[i].textContent.trim();
        let priceText = minerPrices[i].textContent.trim();

        // Convert power string to numerical GH/s value
        let power = convertPowerToGigaHash(powerText);
        let bonus = parseFloat(bonusText);
        let price = parseFloat(priceText.replace(/\s/g, '').replace('RLT', '')); // Remove spaces & "RLT" currency symbol
        let ratio = (power / 1000) / price; // Calculate power-to-price ratio

        // Calculate expected Ecoin earnings and Ecoin ratio
        let Ecoin = (power / (PowerPerKecoin / 1000)) + (bonus / (BonusPerKEcoin / 1000));
        let EcoinRatio = Ecoin / price;

        miners.push({
            'Element': minerTitles[i], // Store element reference for later updates
            'Name': name,
            'Price': price,
            'BurnEvent': Ecoin.toFixed(2), // Expected Ecoin earnings
            'EcoinRatio': EcoinRatio.toFixed(2), // Efficiency ratio
            'Power': power,
            'Bonus': bonus,
            'Ratio': ratio.toFixed(2)
        });
    }

    // Sort miners by EcoinRatio in descending order
    miners.sort((a, b) => b.EcoinRatio - a.EcoinRatio);

    return miners;
}

function convertPowerToGigaHash(powerText) {
    let power = parseFloat(powerText);
    if (powerText.includes(" Ph/s")) {
        power *= 1000000; // Convert PH/s to GH/s (1 PH/s = 1,000,000 GH/s)
    } else if (powerText.includes(" Th/s")) {
        power *= 1000; // Convert TH/s to GH/s (1 TH/s = 1,000 GH/s)
    }
    return power;
}

function displayMiners(miners) {
    miners.forEach(miner => {
        // Check if extra info already exists to avoid duplication
        let existingInfo = miner.Element.querySelector(".extra-info");

        if (!existingInfo) {
            // Create a new div to display extra information
            let extraInfo = document.createElement("div");
            extraInfo.classList.add("extra-info");
            miner.Element.appendChild(extraInfo);
            existingInfo = extraInfo;
        }

        // Update miner's extra information
        existingInfo.innerHTML = `<strong>Event Coin:</strong> ${miner.BurnEvent} <br> 
                                  <strong>Ratio:</strong> ${miner.EcoinRatio}`;
        existingInfo.style.fontSize = "12px";
        existingInfo.style.color = "#888";
    });
}

// Run the main function every 1 second for real-time updates
setInterval(main, 1000);

// Run the script once immediately to avoid waiting for the first 1-second interval
main();
