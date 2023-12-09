function main() {
    let CurrentPower = 5444400; // Your Current Power in GH/S
    let miners = getBestRatioMiners(CurrentPower);
    console.log("Sort By Ratio");
    console.log("Your Power is : "+CurrentPower+" GH/S")
    displayMiners(miners);
}

function getBestRatioMiners(CurrentPower){
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
        let addpower = ((bonus/100)*CurrentPower);
        let ratio = ((power / 1000)+(addpower/1000)) / price;
        let totalpower = power+addpower;

        miners.push({
            'Name': name,
            'Price': price,
            'Power': power,
            'Bonus': bonus,
            'Addition[GH/S] ': addpower.toFixed(2),
            'Ratio': ratio.toFixed(2),
            'TotalPower [GH/S]': totalpower.toFixed(2)

        });
    }

    // เรียงลำดับ miners ตาม Ratio จากสูงไปต่ำ
    miners.sort((a, b) => b.EcoinRatio - a.EcoinRatio);

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

