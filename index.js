function computerPlay() {
    const array = ["Rock", "Paper", "Scissors"]
    const randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() == "paper" && computerSelection.toLowerCase() == "rock") {
        console.log("You won! Paper beats Rocks!");
        return 0;
    }
    else if (computerSelection.toLowerCase() == "paper" && playerSelection.toLowerCase() == "rock") {
        console.log("You Lost! Paper beats Rocks!");
        return 1;
    }

    if (playerSelection.toLowerCase() == "rock" && computerSelection.toLowerCase() == "scissors") {
        console.log("You won! Rocks beats Scissors!");
        return 0;
    }
    else if (computerSelection.toLowerCase() == "rock" && playerSelection.toLowerCase() == "scissors") {
        console.log("You Lost! Paper beats Rocks!");
        return 1;

    }

    if (playerSelection.toLowerCase() == "scissors" && computerSelection.toLowerCase() == "paper") {
        console.log("You won! Scissors beats Paper!");
        return 0;
    }
    else if (computerSelection.toLowerCase() == "scissors" && playerSelection.toLowerCase() == "paper") {
        console.log("You Lost! Scissors beats Paper!");
        return 1;
    }

    return -1
}

function getPlayerInput() {
    const array = ["rock", "paper", "scissors"]
    var input = prompt("Pick Rock / Paper / Scissors?")
    while (!array.includes(input.toLocaleLowerCase())) {
        input = prompt("Invalid Input! -  Pick Rock / Paper / Scissors?")
    }

    return input;
}

function game() {


    var roundsWon = 0;
    var roundsLost = 0;
    for (let index = 0; index < 5; index++) {
        console.log("===================================")
        console.log("======= ROCK PAPER SCISSORS =======")
        console.log(`== Round won ${roundsWon} of 5  ===`)
        console.log(`== Round lost ${roundsLost} of 5  ===`)
        console.log("===================================")
        var playerSelection = getPlayerInput();
        var computerSelection = computerPlay();
        console.log(`Computer pick : ${computerSelection}`)
        console.log(`Your pick : ${playerSelection}`)
        var result = playRound(playerSelection, computerSelection);
        if (result == 0) roundsWon++;
        else if (result == 1) roundsLost++;
    }

    if (roundsWon > roundsLost)
        console.log("You won !")
    else if (roundsLost > roundsWon)
        console.log("You Lost !")
}

game();
