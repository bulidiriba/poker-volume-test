#!/usr/bin/env node
const { argv } = require('yargs');
const shell = require('shelljs');

switch (argv.mode) {
    case "texas-holdem":
        runTexasHoldemTests(argv.players, argv.testCase);
        break;
    case "five-card-draw":
        runFiveCardDrawTests(argv.players, argv.testCase);
    case "cancel-tournament":
        runCancelTournamentTests();
    default:
        break;
}

/**
 * Run Texas Holdem Tests
 * 
 * @param {*} players   Number Of Players
 * @param {*} testCase  Test Case
 */
function runTexasHoldemTests(players, testCase) {
    testCase = testCase ? testCase : 1;
    players = players && players > 2 ? players : 2;

    if (players == 2) {
        if (testCase == 1) {
            console.log("Running Texas Holdem Tests Case #1 with 2 Players");
            shell.exec("cypress run --spec=**/texas-holdem-2-players/case-1/player1.spec.js --headed --browser chrome", { async: true });
            shell.exec("cypress run --spec=**/texas-holdem-2-players/case-1/player2.spec.js --headed --browser chrome", { async: true });
        }
        else if (testCase == 2) {
            console.log("Running Texas Holdem Tests Case #2 with 2 Players");
            shell.exec("cypress run --spec=**/texas-holdem-2-players/case-2/player1.spec.js --headed --browser chrome");
            shell.exec("cypress run --spec=**/texas-holdem-2-players/case-2/player2.spec.js --headed --browser chrome");
        }
    }
}

/**
 * Run Five Card Draw Tests
 * 
 * @param {*} players   Number Of Players
 * @param {*} testCase  Test Case
 */
function runFiveCardDrawTests(players, testCase) {
    testCase = testCase ? testCase : 1;
    players = players && players > 2 ? players : 2;

    if (players == 2) {
        if (testCase == 1) {
            console.log("Running Five Card Draw Tests Case #1 with 2 Players");
            shell.exec("cypress run --spec=**/five-card-draw-2-players/case-1/player1.spec.js --headed --browser chrome", { async: true });
            shell.exec("cypress run --spec=**/five-card-draw-2-players/case-1/player2.spec.js --headed --browser chrome", { async: true });
        }
    }
}

/**
 * Run Cancel Tournament Tests
 * 
 */
function runCancelTournamentTests() {
    shell.exec("cypress run --spec=**/cancel_tournament/admin.spec.js --headed --browser chrome", { async: true });
    shell.exec("cypress run --spec=**/cancel_tournament/player1.spec.js --headed --browser chrome", { async: true });
    shell.exec("cypress run --spec=**/cancel_tournament/player2.spec.js --headed --browser chrome", { async: true });
}
