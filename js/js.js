/*
03- prevent footer from covering the input
*/

// Adding the words arr
const words_Easy = [
	"Hello",
	"code",
	"Town",
	"Css",
	"Coding",
	"Funny",
	"Task",
	"Runner",
	"Roles",
	"Rust",
];
const words_Normal = [
	"Javascript",
	"Country",
	"Youtube",
	"linkedin",
	"Twitter",
	"Github",
	"Internet",
	"Python",
	"Styling",
	"Cascade",
];
const words_Hard = [
	"Programming",
	"Javascript",
	"Destructuring",
	"Documentation",
	"Dependencies",
	"Quintessential",
	"Circumlocution",
	"Discombobulate",
	"Chromosomes",
	"Relationship",
];
// Adding lvls object
const lvls = {
	Easy: words_Easy,
	Normal: words_Normal,
	Hard: words_Hard,
};

// Adding default lvl
let lvlName = "Normal";
let gameSeconds = 3;
// Adding selectors
let startScreen = document.querySelector(".game .start-screen");
let lvlOptions = document.querySelectorAll(".start-screen .lvl-option li");
let lvlNameSpan = document.querySelector(".game .msg .lvl");
let lvlSecondsSpan = document.querySelector(".game .msg .seconds");
let startBtn = document.querySelector(".game .start-btn");
let wordDiv = document.querySelector(".game .word");
let input = document.querySelector(".game .input");
let upcomingWordsDiv = document.querySelector(".game .upcoming-words");
let timeleftSecondsSpan = document.querySelector(".game .control .time span");
let gotScore = document.querySelector(".game .control .score .got");
let totalScore = document.querySelector(".game .control .score .total");
let highestScoreSpan = document.querySelector(".game .highest-score span");
let finishScreen = document.querySelector(".game .finish");
let resultMsg = document.querySelector(".game .finish .result");
let finishScore = document.querySelector(".game .finish .score span");
let finishScreenBtn = document.querySelector(".game .finish button");

// disalbe paste event
input.onpaste = () => {
	return false;
};

// choosing lvl difficulty function
lvlOptions.forEach((option) => {
	option.addEventListener("click", function () {
		lvlName = this.dataset.lvl;
		option.parentElement.querySelectorAll("li").forEach((ele) => {
			ele.style.backgroundColor = "transparent";
		});
		option.style.backgroundColor = option.dataset.color;
		lvlNameSpan.style.color = option.dataset.color;
		lvlNameSpan.innerHTML = lvlName;
        lvlSecondsSpan.style.color = option.dataset.color;
        lvlSecondsSpan.innerHTML = gameSeconds;
	});
});

// playing the game
startBtn.onclick = function () {
	startScreen.remove();
	wordDiv.style.display = "block";
	upcomingWordsDiv.style.display = "block";

	// setting innerHTML lvlName and seconds
	timeleftSecondsSpan.innerHTML = gameSeconds;
    totalScore.innerHTML = lvls[lvlName].length;
    
	// setting the highest score of the level
	highestScoreLvl();
    
    lvlSecondsSpan.innerHTML = gameSeconds;
	input.value = "";
	input.focus();
	getRandomWord();
};

function getRandomWord() {
	// get random word
	let randomWord = lvls[lvlName][Math.floor(Math.random() * lvls[lvlName].length)];

	// show random word on word div
	wordDiv.innerHTML = randomWord;

	// get random word index
	let wordIndex = lvls[lvlName].indexOf(randomWord);

	// remove the random word from words arr
	lvls[lvlName].splice(wordIndex, 1);

	// stating timer
	handleGameTimer();

	// empty upcoming words div
	upcomingWordsDiv.innerHTML = "";

	// show upcoming words
	for (let i = 0; i < lvls[lvlName].length; i++) {
		let div = document.createElement("div");
		let text = document.createTextNode(lvls[lvlName][i]);
		div.appendChild(text);
		upcomingWordsDiv.appendChild(div);
	}
	if (upcomingWordsDiv.innerHTML == "") {
		upcomingWordsDiv.innerHTML = "No more words!";
	}
}

// playing the timer of the game
function handleGameTimer() {
	// reset timer
	timeleftSecondsSpan.innerHTML = gameSeconds;

	let gameTimer = setInterval(function () {
		// decrese time by second
		timeleftSecondsSpan.innerHTML--;

		// stopping the timer and check answer
		if (timeleftSecondsSpan.innerHTML == "0") {
			clearInterval(gameTimer);

			if (input.value.toLowerCase().trim() == wordDiv.innerHTML.toLowerCase()) {
				// increase got score
				gotScore.innerHTML++;

				// empty input field
				input.value = "";

				// get new word
				if (lvls[lvlName].length > 0) {
					getRandomWord();
				} else {
					// display finish screen
					finishScreen.style.display = "block";

					// creating greeting msg
					let span = document.createElement("span");
					let spanText = document.createTextNode("Congratulations!");
					span.appendChild(spanText);
					span.className = "good";
					finishScore.innerHTML = gotScore.innerHTML;
					resultMsg.appendChild(span);

					// make play again btn reload the page
					finishScreenBtn.addEventListener("click", function () {
						location.reload();
					});

					// store score to localStorage if gotscore > stored score
					if (+gotScore.innerHTML > +highestScoreSpan.innerHTML) {
						localStorage.setItem(
							`score-${lvlName}`,
							gotScore.innerHTML
						);
						gotScore.innerHTML = localStorage.getItem(
							`score-${lvlName}`
						);
					}
				}
			} else {
				// display finish screen
				finishScreen.style.display = "block";

				// creating blaming msg
				let span = document.createElement("span");
				let spanText = document.createTextNode("Game over");
				span.appendChild(spanText);
				span.className = "bad";
				finishScore.innerHTML = gotScore.innerHTML;
				resultMsg.appendChild(span);

				// make play again btn reload the page
				finishScreenBtn.addEventListener("click", function () {
					location.reload();
				});

				// store score to localStorage if gotscore > stored score
				if (+gotScore.innerHTML > +highestScoreSpan.innerHTML) {
					localStorage.setItem(
						`score-${lvlName}`,
						gotScore.innerHTML
					);
					gotScore.innerHTML = localStorage.getItem(
						`score-${lvlName}`
					);
				}
			}
		}
	}, 1000);
}

function highestScoreLvl() {
	// setting the highest score
	if (localStorage.getItem(`score-${lvlName}`) != null) {
		highestScoreSpan.innerHTML = `${localStorage.getItem(
			`score-${lvlName}`
		)} [ ${lvlName} ]`;
	} else {
		highestScoreSpan.innerHTML = "0";
	}
}
