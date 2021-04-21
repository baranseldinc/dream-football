//WPR: Winning Probability Ratio => includes (Team Power, Team Mood, Fan Support)

const wprConstants = {
    teamPowerRate: 0.5,
    teamMoodRate: 0.35,
    fanSupportRate: 0.15
}

class Team {
    constructor(name, teamPower, teamMood, fanSupport, isHome = false) {
        this.name = name;
        this.teamPower = teamPower;
        this.teamMood = teamMood;
        this.fanSupport = fanSupport;
        this.isHome = isHome;
    }

    setIsHome = (isHome) => { this.isHome = isHome }

    WPR = () => (this.teamPower * wprConstants.teamPowerRate) + (this.teamMood * wprConstants.teamMoodRate) + (this.isHome ? this.fanSupport * wprConstants.fanSupportRate : 0)

}

var liverpool = new Team('Liverpool', 45, 10, 40);
var manchester = new Team('Manchester United', 75, 90, 23);

const averages = {
    successGoalPosRate: 0.1,
    goalPosByEachTeam: 10
}

function generateMatchResult(home, away) {
    home.setIsHome(true); // enable fan support

    var wprComparisonRateByHome = (home.WPR() - away.WPR()) / away.WPR();
    var wprComparisonRateByAway = (away.WPR() - home.WPR()) / home.WPR();

    var homeGoalPositions = Math.ceil((1 + wprComparisonRateByHome) * averages.goalPosByEachTeam);
    var awayGoalPositions = Math.ceil((1 + wprComparisonRateByAway) * averages.goalPosByEachTeam);

    var homeGoalScore = 0;
    var awayGoalScore = 0;

    for (var i = 0; i < homeGoalPositions; i++) {
        if (Math.random() < averages.successGoalPosRate) homeGoalScore++;
    }

    for (var i = 0; i < awayGoalPositions; i++) {
        if (Math.random() < averages.successGoalPosRate) awayGoalScore++;
    }

    console.log('Home ' + wprComparisonRateByHome);
    console.log('Away ' + wprComparisonRateByAway);
    console.log();
    console.log('Home total goal Position: ' + homeGoalPositions);
    console.log('Away total goal Position: ' + awayGoalPositions);
    console.log();
    console.log(home.name + ': ' + homeGoalScore + ' - ' + awayGoalScore + ' ' + away.name);

    return { homeScore: homeGoalScore, awayScore: awayGoalScore }


}
generateMatchResult(liverpool, manchester);