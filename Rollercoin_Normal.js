function main() {
    let miners = getBestRatioMiners();
    console.log("Sort By Best POWER Ratio");
    displayMiners(miners);
}

function getBestRatioMiners() {
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

        let power = convertPowerToGigaHash(powerText);
        let bonus = parseFloat(bonusText);
        let price = parseFloat(priceText.replace(/\s/g, '').replace('RLT', ''));
        let ratio = (power / 1000) / price;


        miners.push({
            'Name': name,
            'Price': price,
            'Power': power,
            'Bonus': bonus,
            'Ratio': ratio.toFixed(2)

        });
    }

    // เรียงลำดับ miners ตาม Ratio จากสูงไปต่ำ
    miners.sort((a, b) => b.Ratio - a.Ratio);

    return miners;
}

function convertPowerToGigaHash(powerText) {
    let power = parseFloat(powerText);
    if (powerText.includes(" Ph/s")) {
        power *= 1000000; // 1 PH/s = 1000000 Gh/s
    } else if (powerText.includes(" Th/s")) {
        power *= 1000; // 1 TH/s = 1000 Gh/s
    }
    return power;
}

function displayMiners(miners) {
    console.table(miners);
    // แสดงข้อมูลในตำแหน่งที่คุณต้องการ
}

main();
