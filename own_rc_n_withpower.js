function main() {
    let CurrentPower = 51310000; // Your Current Power in GH/S
    let CurrentBonus = 13.55; // Put the bonus displayed on your profile. 1 = +1% , 100 = +100%

    let ownedMiners = ['E.V.A.',
    "CP-106",
    "DjBone",
    "Night Witnesses",
    "Awaken",
    "MineDrone",
    "The Transducer",
    "Bloody Mary",
    "Tetromino",
    "Hamster's Enemy",
    "Whatta Duck",
    "RollerMiner G1",
    "BioGauge 67",
    "RPMiner",
    "8bubbled",
    "Deepdiver",
    "Khepri",
    "Ouroboros",
    "RollerArc S1",
    "Armageddon",
    "Shifter",
    "Prescilla",
    "JBS-200",
    "Rolleron 741",
    "RollerMiner S7",
    "HauntedHouse",
    "Uncommon Pink Strom",
    "Uncommon Black Cat",
    "Uncommon Tron",
    "Uncommon Mergedge Mk. I",
    "Uncommon Tron",
    "Uncommon RollerMiner G1",
    "Uncommon Chattanooga Choo",
    "Epic Mergedge",
    "Rare Mergedge",
    "Uncommon Mergedge",
    "Uncommon Deepdiver",
    "Uncommon RollerArc S1",
    "Rare RollerArc S1",
    "Uncommon CP-106",
    "Uncommon RollerMiner S7"]; // Example: List of owned miners
    let miners = getBestRatioMiners(CurrentPower,CurrentBonus, ownedMiners);
    console.log("Sort By Ratio");
    console.log("Your Power is : " + CurrentPower + " GH/S")
    console.log("Your Current Bonus is : "+CurrentBonus+" %")
    displayMiners(miners);
}

function getBestRatioMiners(CurrentPower,CurrentBonus, ownedMiners) {
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
        let owned = ownedMiners.includes(name);
        let totalbonus = (bonus+CurrentBonus)/100;

        // CurrentPower * MinerBonus
        let ctm = owned ? 0 : CurrentPower*(bonus/100) ;
        // MinerPower * Total Bonus
        let mtb = power*totalbonus;
        // MinerPower + (CurrentPower*MinerPower) + (Minerpower*TotalBonus)
        let totalpower = power+ctm+mtb;
        let ratio = (totalpower/1000) / price;


        miners.push({
            'Name': name,
            'owned': owned ? "✔" : "❌",
            'Price': price,
            'Power': power,
            'Bonus[%]': bonus,
            'Ratio': ratio.toFixed(2),
            'Cur.Pow X Add.Bonus': ctm.toFixed(0),
            'Mine.Pow X Tot.Bonus': mtb.toFixed(0), 
            'Addition Power': totalpower.toFixed(0), 
            'TotalPower [GH/S]': (totalpower+CurrentPower).toFixed(2),
            'Total Bonus %': (totalbonus*100).toFixed(3)
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
}

main();
