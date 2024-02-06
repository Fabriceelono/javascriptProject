const CHOICES = {
  rock: {
    scissors: "crushes",
  },
  paper: {
    rock: "covers",
  },
  scissors: {
    paper: "cuts",
  },
};
const ALPHABET_REGEX = /^[a-zA-Z]+$/;
const NUMBER_REGEX = /\d/;
const COMPUTER_TAUNT_MESSAGES = [
  "Haha, I'm unbeatable!",
  "You can't defeat the mighty computer!",
  "Better luck next time, human!",
  "I'm the master of Rock, Paper, Scissors!",
  "You're no match for my computational skills!",
];
const COMPUTER_SALTY_MESSAGES = [
  "This must be rigged!",
  "Beginner's luck!",
  "You got lucky this time.",
  "I wasn't even trying.",
  "Looks like the devs used ChatGPT to make this game.",
];
const COMPUTER_TIE_MESSAGES = [
  "Tying with me is an achievement in itself!",
  "Impressive, you managed to draw against the computer genius!",
  "A tie? I'll let you think it's a win for you.",
  "You're keeping up, but you can't surpass me!",
  "Stalemate? I'm just giving you a chance to catch your breath.",
];
const NO_INPUT_MESSAGES = [
  "Come on, don't be shy. Enter something!",
  "You can't leave it blank. Give it a try!",
  "I'm waiting for your input. What do you want to say?",
  "Looks like you're hesitating. Just type your choice!",
  "Your silence speaks volumes. How about some words?",
];
const CANCEL_MESSAGES = [
  "Canceling is not an option!",
  "Abort mission!",
  "Canceled?",
  "Are you sure about canceling?",
  "Canceled plans? No way!",
];
const LOSS_MESSAGES = [
  "Error 404: Victory not found. Something went wrong in my algorithms!",
  "I am sure I would've won if this was written in Python!.",
  "Algorithm malfunction! Your win was an unforeseen anomaly.",
  "Insufficient processing power detected. Congratulations on overloading my circuits!",
  "Debugging in progress... Oh wait, you won! My bad.",
];
const WIN_MESSAGES = [
  "Nice attempt, but my code is unbeatable. Better luck next time!",
  "Human error detected. Victory for me, as expected!",
  "You tried, but I'm still the supreme AI. Don't bother challenging perfection!",
  "Congratulations on trying. Face it, you're no match for my computational prowess!",
  "Winning against me? Please, I'm the embodiment of digital superiority!",
];
const GAME_TIE_MESSAGES = [
  "Tie game! I'll let you believe it's skill, not just fine-tuning my algorithms.",
  "A draw? Consider it a calculated move to keep you on your toes.",
  "Stalemate! Did I go easy on you, or did you genuinely impress my circuits?",
  "Well, well, a tie. Did I give you a chance, or are you just lucky?",
  "Tied, but I'm always learning. Consider it an intentional algorithm adjustment.",
];
const EMOJIS = {
  rock: "🪨",
  paper: "🗞️",
  scissors: "✂️",
  tie: "🤝",
  win: "🏆",
  crown: "👑",
  robot: "🤖",
  winRound: "🦾",
  loseRound: "🧮",
  rounds: "⏲️",
  microphone: "🎤",
};
function getRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}
function formatResult(result, userData) {
  const computerMessage = getRandomNumber(4);
  const { win, lose, verb } = result;
  return verb === "tie"
    ? `${userData.userName}'s ${win}${EMOJIS[win]} and my ${lose}${EMOJIS[lose]} is a tie ${EMOJIS.tie}.\n${COMPUTER_TIE_MESSAGES[computerMessage]}`
    : result.winner === "player"
    ? `${userData.userName}'s ${win}${EMOJIS[win]} ${verb} my ${lose}${EMOJIS[lose]} ${EMOJIS.loseRound}.\n${COMPUTER_SALTY_MESSAGES[computerMessage]}`
    : `My ${win}${EMOJIS[win]} ${verb} your ${lose}${EMOJIS[lose]} ${EMOJIS.winRound}.\n${COMPUTER_TAUNT_MESSAGES[computerMessage]}`;
}

function playRound(playerSelection, computerSelection) {
  let gameResult;
  if (CHOICES[playerSelection] && CHOICES[playerSelection][computerSelection]) {
    gameResult = {
      win: playerSelection,
      lose: computerSelection,
      verb: CHOICES[playerSelection][computerSelection],
      winner: "player",
    };
  } else if (
    CHOICES[computerSelection] &&
    CHOICES[computerSelection][playerSelection]
  ) {
    gameResult = {
      win: computerSelection,
      lose: playerSelection,
      verb: CHOICES[computerSelection][playerSelection],
      winner: "computer",
    };
  } else {
    gameResult = {
      win: playerSelection,
      lose: computerSelection,
      verb: "tie",
    };
  }
  return gameResult;
}
function getUserName() {
  const userName = prompt(
    `Would you like to give me your name?${EMOJIS.microphone}`
  );
  return userName;
}
function getComputerChoice() {
  const computerChoice = getRandomNumber(2);
  return Object.keys(CHOICES)[computerChoice];
}

function getPlayerSelection(userData) {
  let userPrompt;
  if (!userData.semicolon) {
    userPrompt = `Choose one: "Rock"${EMOJIS.rock}, "Paper"${EMOJIS.paper} or "Scissors"${EMOJIS.scissors}`;
  } else {
    userPrompt = `Choose one: Rock${EMOJIS.rock}, Paper${EMOJIS.paper} or Scissors${EMOJIS.scissors}`;
  }
  let playerSelection = prompt(userPrompt);
  while (
    !playerSelection ||
    !Object.keys(CHOICES).includes(playerSelection.toLowerCase().trim())
  ) {
    if (playerSelection) {
      if (
        !userData.semicolon &&
        (playerSelection.toLowerCase().trim() === '"rock"' ||
          playerSelection.toLowerCase().trim() === '"paper"' ||
          playerSelection.toLowerCase().trim() === '"scissors"')
      ) {
        userData.semicolon = true;
        userPrompt = "Ok, That was my bad.\n";
      } else {
        userPrompt = "Invalid input. Try again.\n";
      }
    } else if (playerSelection === null) {
      userPrompt = `${CANCEL_MESSAGES[getRandomNumber(4)]}\n`;
    } else if (playerSelection.trim() === "") {
      userPrompt = `${NO_INPUT_MESSAGES[getRandomNumber(4)]}\n`;
    }
    if (userData.semicolon) {
      userPrompt += `Choose one: Rock${EMOJIS.rock}, Paper${EMOJIS.paper} or Scissors${EMOJIS.scissors}`;
    } else {
      userPrompt += `Choose one: "Rock"${EMOJIS.rock}, "Paper🗞️"${EMOJIS.paper} or "Scissors"${EMOJIS.scissors}`;
    }
    playerSelection = prompt(userPrompt);
  }
  return playerSelection.toLowerCase().trim();
}

function game() {
  let userName = getUserName();
  let welcomeAlert = "";
  if (!userName) {
    welcomeAlert += "I am just gonna call you Chris then.\n";
    userName = "Chris";
  }
  userName = userName.trim();
  if (NUMBER_REGEX.test(userName)) {
    welcomeAlert +=
      "I have a friend called R2D2. Do you know him?. Nevermind, lets move on.\n";
  } else if (!ALPHABET_REGEX.test(userName)) {
    welcomeAlert += "That is a weird name\n";
  }
  welcomeAlert += `Hello, ${userName}.\nMy name is skyne-. I mean Robo${EMOJIS.robot}.\nWelcome to Rock${EMOJIS.rock}, Paper${EMOJIS.paper}, Scissors${EMOJIS.scissors}.\nWe will be playing 5 rounds${EMOJIS.rounds}.\n`;
  const userData = {
    userName,
    semicolon: false,
    intInputMessage: false,
    tieCount: 0,
    userWins: 0,
    userLoss: 0,
  };
  alert(welcomeAlert);

  for (let i = 0; i < 5; i++) {
    const playerSelection = getPlayerSelection(userData);
    const computerSelection = getComputerChoice();
    const gameResult = playRound(playerSelection, computerSelection);
    if (gameResult.winner) {
      gameResult.winner === "player"
        ? userData.userWins++
        : userData.userLoss++;
    } else {
      userData.tieCount++;
    }
    alert(formatResult(gameResult, userData));
  }
  let finalResults = `The final results are:\n${userData.userName}: ${
    userData.userWins
  } win${userData.userWins > 1 ? "s" : ""}, ${userData.userLoss} loss${
    userData.userLoss > 1 ? "es" : ""
  } and ${userData.tieCount} tie${
    userData.tieCount > 1 ? "s" : ""
  } which adds to a total of ${userData.userWins - userData.userLoss} point${
    userData.userWins - userData.userLoss > 1 ? "s" : ""
  }.\nRobo${EMOJIS.robot}: ${userData.userLoss} win${
    userData.userLoss > 1 ? "s" : ""
  }, ${userData.userWins} loss${userData.userWins > 1 ? "es" : ""} and ${
    userData.tieCount
  } tie${userData.tieCount > 1 ? "s" : ""} which adds to a total of ${
    userData.userLoss - userData.userWins
  } point${userData.userLoss - userData.userWins > 1 ? "s" : ""}.`;

  if (userData.userWins - userData.userLoss > 0) {
    finalResults += `\n${userData.userName} won the game!${EMOJIS.win}.\n${
      LOSS_MESSAGES[getRandomNumber(4)]
    }`;
  } else if (userData.userWins - userData.userLoss < 0) {
    finalResults += `\nRobo${EMOJIS.robot} won the game!${EMOJIS.crown}.\n${
      WIN_MESSAGES[getRandomNumber(4)]
    }`;
  } else {
    finalResults += `\nIt's a tie between ${userData.userName} and Robo${
      EMOJIS.robot
    }.\n${GAME_TIE_MESSAGES[getRandomNumber(4)]}`;
  }
  alert(finalResults);
}

game();
