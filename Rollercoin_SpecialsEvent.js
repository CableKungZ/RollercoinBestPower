function main() {
    let PowerPerKecoin = 85000; // Power to get Each 1000 Ecoins
    let BonusPerKEcoin = 10; // Bonus% to get Each 1000 Ecoins
    let miners = getBestRatioMiners(PowerPerKecoin, BonusPerKEcoin);
    console.log("Sort By Best Ecoin Ratio");
    console.log("Power/1000Ecoin : "+PowerPerKecoin+" GH/S");
    console.log("Bonus/1000Ecoin : "+BonusPerKEcoin)+" %";
    displayMiners(miners);

    // เพิ่ม Event Listener สำหรับแต่ละตัวของ item-title
    let minerTitles = document.getElementsByClassName('item-title');
    for (let i = 0; i < minerTitles.length; i++) {
        minerTitles[i].addEventListener('click', function () {
            // เรียกใช้ฟังก์ชัน getBestRatioMiners เพื่อดึงข้อมูลใหม่
            miners = getBestRatioMiners(PowerPerKecoin, BonusPerKEcoin);
            // เรียกใช้ฟังก์ชัน displayMiners เพื่อแสดงข้อมูลทันที
            displayMiners(miners);
        });
    }
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

        let power = convertPowerToGigaHash(powerText);
        let bonus = parseFloat(bonusText);
        let price = parseFloat(priceText.replace(/\s/g, '').replace('RLT', ''));
        let ratio = (power / 1000) / price;
        let Ecoin = (power / (PowerPerKecoin / 1000)) + (bonus / (BonusPerKEcoin / 1000));
	let EcoinRatio = Ecoin/price;

        miners.push({
            'Name': name,
            'Price': price,
            'BurnEvent': Ecoin.toFixed(2),
	    'EcoinRatio': EcoinRatio.toFixed(2),
            'Power': power,
            'Bonus': bonus,
            'Ratio': ratio.toFixed(2)

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