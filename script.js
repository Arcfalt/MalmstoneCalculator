const CC_WIN = 900;
const CC_LOSS = 700;
const FL_WIN = 1500;
const FL_MID = 1250;
const FL_LOSS = 1000;
const RANKS = [
	0,    // 0-1
	2000, // 1-2
	2000, // 2-3
	2000, // 3-4
	2000, // 4-5
	3000, // 5-6
	3000, // 6-7
	3000, // 7-8
	3000, // 8-9
	3000, // 9-10
	4000, // 10-11
	4000, // 11-12
	4000, // 12-13
	4000, // 13-14
	4000, // 14-15
	5500, // 15-16
	5500, // 16-17
	5500, // 17-18
	5500, // 18-19
	5500, // 19-20
	7500, // 20-21
	7500, // 21-22
	7500, // 22-23
	7500, // 23-24
	7500, // 24-25
	10000, // 25-26
	10000, // 26-27
	10000, // 27-28
	10000, // 28-29
	10000, // 29-30
	20000, // 30+
]

function getTotalXpToLevel(toLevel) {
	let xp = 0;
	for (let i = 1; i < toLevel; i++) {
		if (i >= RANKS.length) xp += RANKS[RANKS.length - 1];
		else xp += RANKS[i];
	}
	return xp;
}

function validateAndCalcResults() {
	const inputRank = parseInt($('#inputRank').val());
	if (inputRank < 1) $('#inputRank').val(1);
	else if (inputRank > 9999) $('#inputRank').val(9999);
	const inputExp = parseInt($('#inputExp').val());
	if (inputExp < 0) $('#inputExp').val(0);
	else if (inputExp > 20000) $('#inputExp').val(20000);
	const inputTarget = parseInt($('#inputTarget').val());
	if (inputTarget < 1) $('#inputTarget').val(1);
	else if (inputTarget > 9999) $('#inputTarget').val(9999);
	localStorage.setItem("inputRank", inputRank);
	localStorage.setItem("inputExp", inputExp);
	localStorage.setItem("inputTarget", inputTarget);
	calcResults();
}

function calcResults() {
	let inputRank = parseInt($('#inputRank').val());
	if (isNaN(inputRank)) inputRank = 1;
	let inputExp = parseInt($('#inputExp').val());
	if (isNaN(inputExp)) inputExp = 0;
	let inputTarget = parseInt($('#inputTarget').val());
	if (isNaN(inputTarget)) inputTarget = 1;
	const fromXp = getTotalXpToLevel(inputRank) + inputExp;
	const toXp = getTotalXpToLevel(inputTarget);
	const xp = toXp - fromXp;
	$('#resultXp').val(xp);
	$('#resultCcWin').val(Math.ceil(xp / CC_WIN));
	$('#resultCcLoss').val(Math.ceil(xp / CC_LOSS));
	$('#resultFlWin').val(Math.ceil(xp / FL_WIN));
	$('#resultFlLoss').val(Math.ceil(xp / FL_LOSS));
}

function addXp(amount) {
	let inputRank = parseInt($('#inputRank').val());
	if (inputRank < 1) $('#inputRank').val(1);
	else if (inputRank > 9999) $('#inputRank').val(9999);
	let inputExp = parseInt($('#inputExp').val());
	if (inputExp < 0) $('#inputExp').val(0);
	else if (inputExp > 20000) $('#inputExp').val(20000);
	inputExp += amount;
	while (getXpForRank(inputRank) < inputExp) {
		inputExp -= getXpForRank(inputRank);
		inputRank++;
	}
	$('#inputExp').val(inputExp);
	$('#inputRank').val(inputRank);
	localStorage.setItem("inputRank", inputRank);
	localStorage.setItem("inputExp", inputExp);
	calcResults();
}

function getXpForRank(rank) {
	if (rank >= RANKS.length) return RANKS[RANKS.length - 1];
	if (rank < 0) return 0;
	return RANKS[rank];
}

function toggleTheme() {
	const currentTheme = document.documentElement.getAttribute('data-bs-theme');
	if (currentTheme === 'dark') setTheme('light');
	else setTheme('dark');
}

function setTheme(toTheme) {
	document.documentElement.setAttribute('data-bs-theme', toTheme);
	localStorage.setItem("darkMode", toTheme);
}

$('form').submit(function (event) {
	event.preventDefault();
	calcResults();
});

$('#inputRank').on('input', () => validateAndCalcResults());
$('#inputExp').on('input', () => validateAndCalcResults());
$('#inputTarget').on('input', () => validateAndCalcResults());

$('#addCcWin').on('click', () => addXp(CC_WIN));
$('#addCcLoss').on('click', () => addXp(CC_LOSS));
$('#addFlWin').on('click', () => addXp(FL_WIN));
$('#addFlMid').on('click', () => addXp(FL_MID));
$('#addFlLoss').on('click', () => addXp(FL_LOSS));

let inputRank = localStorage.getItem("inputRank");
if (inputRank !== null) $('#inputRank').val(inputRank);
let inputExp = localStorage.getItem("inputExp");
if (inputExp !== null) $('#inputExp').val(inputExp);
let inputTarget = localStorage.getItem("inputTarget");
if (inputTarget !== null) $('#inputTarget').val(inputTarget);

validateAndCalcResults();

$('#toggleTheme').on('click', () => toggleTheme());

window.addEventListener('DOMContentLoaded', () => {
	const useTheme = localStorage.getItem("darkMode");
	if (useTheme === 'dark') setTheme('dark');
	else if (useTheme === 'light') setTheme('light');
	else if (window.matchMedia('(prefers-color-scheme: dark)').matches)  setTheme('dark');
});
