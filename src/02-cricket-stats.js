/**
 * 🏏 Cricket Player Stats Dashboard
 *
 * IPL ka stats dashboard bana raha hai tu! Har function ARROW FUNCTION
 * hona chahiye (const fn = () => ...). Regular function declarations
 * mat use karna — arrow functions ki practice karna hai!
 *
 * Functions (sab arrow functions honge):
 *
 *   1. calcStrikeRate(runs, balls)
 *      - Strike rate = (runs / balls) * 100, rounded to 2 decimal places
 *      - Agar balls <= 0 ya runs < 0, return 0
 *
 *   2. calcEconomy(runsConceded, overs)
 *      - Economy = runsConceded / overs, rounded to 2 decimal places
 *      - Agar overs <= 0 ya runsConceded < 0, return 0
 *
 *   3. calcBattingAvg(totalRuns, innings, notOuts = 0)
 *      - Batting avg = totalRuns / (innings - notOuts), rounded to 2 decimal places
 *      - Default notOuts = 0
 *      - Agar innings - notOuts <= 0, return 0
 *
 *   4. isAllRounder(battingAvg, economy)
 *      - Return true agar battingAvg > 30 AND economy < 8
 *
 *   5. getPlayerCard(player)
 *      - player object: { name, runs, balls, totalRuns, innings, notOuts, runsConceded, overs }
 *      - Return: { name, strikeRate, economy, battingAvg, isAllRounder }
 *      - Use the above functions internally
 *      - Agar player null/undefined hai ya name missing, return null
 *
 * Hint: Use const fn = (params) => expression or const fn = (params) => { ... }
 *
 * @example
 *   calcStrikeRate(45, 30)  // => 150
 *   calcEconomy(24, 4)      // => 6
 *   getPlayerCard({ name: "Jadeja", runs: 35, balls: 20, totalRuns: 2000, innings: 80, notOuts: 10, runsConceded: 1500, overs: 200 })
 *   // => { name: "Jadeja", strikeRate: 175, economy: 7.5, battingAvg: 28.57, isAllRounder: false }
 */
export const calcStrikeRate = (runs, balls) => {
    // Your code here
    if (balls > 0 && runs >= 0 && typeof runs === "number" && typeof balls === "number") {
        const fn = (runs, balls) => {
            return Number(((runs / balls) * 100).toFixed(2))
        };
        return fn(runs, balls)
    } else {
        return 0;
    }
};

export const calcEconomy = (runsConceded, overs) => {
    // Your code here
    if (typeof overs === "number" && typeof runsConceded === "number" && overs > 0 && runsConceded >= 0) {
        const economyCalcolator = (runs, overs) => (Number((runs / overs).toFixed(2)));
        return economyCalcolator(runsConceded , overs)
    }
    else {
        return 0;
    }
};

export const calcBattingAvg = (totalRuns, innings, notOuts = 0) => {
    // Your code here
    if (innings > 0 && notOuts >= 0 && innings !== notOuts && innings > notOuts) {
        const battingAvgCalculator = (tr, inn, not) => (Number((tr / (inn - not)).toFixed(2)));
        return battingAvgCalculator(totalRuns, innings, notOuts);
    }
    else {
        return 0;
    }
};

export const isAllRounder = (battingAvg, economy) => {
    // Your code here
    const allrounder = (bAvg, eco) => ((bAvg > 30 && eco < 8) ? true : false);
    return allrounder(battingAvg , economy)
};

export const getPlayerCard = (player) => {
    // Your code here
    if (typeof player === "object" && player != null && !Array.isArray(player)) {
        if (player.name) {
            const strikeRate = (runs,balls)=>(Number(((runs/balls)*100).toFixed(2)))
            const economy = (runs,over)=>(Number((runs/over).toFixed(2)))
            const battingAvgCalculator = (totalruns, innings, notout) => (Number((totalruns / (innings - notout)).toFixed(2)));
            const allrounder = (bAvg, eco) => ((bAvg > 30 && eco < 8) ? true : false);
            return {
                name : player.name,
                strikeRate : strikeRate(player.runs , player.balls),
                economy: economy(player.runsConceded , player.overs),
                battingAvg : battingAvgCalculator(player.totalRuns , player.innings , player.notOuts),
                isAllRounder:allrounder(player.battingAvg , player.economy),

            }
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
