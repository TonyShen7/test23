'use strict';

const words = {
    normal: ["worst", "youth", "happy", "state", "billy", "alert", "after", "fifth", "chase", "hairy", "share", "still", "lease", "links", "today", "plain", "boost", "brand", "threw", "apple", "album", "broad", "noise", "breed", "maybe", "curve", "draft", "booth", "eager", "brief", "delay", "raise", "stand", "rapid", "these", "close", "aside", "clear", "their", "plane", "about", "earth", "bases", "small"],
    colours: ["amber", "ashen", "azure", "beige", "beryl", "black", "blond", "blush", "brown", "coral", "cream", "dusky", "ebony", "eosin", "flame", "green", "gules", "hazel", "henna", "hoary", "indol", "ivory", "khaki", "lemon", "liard", "liart", "lilac", "livid", "lovat", "lyart", "mauve", "milky", "mocha", "mousy", "murex", "ochre", "olive", "orcin", "orpin", "pansy", "peach", "pearl", "rouge", "ruddy", "sable", "sandy", "sepia", "smoky", "snowy", "sooty", "steel", "straw", "taupe", "tawny", "topaz", "unmber", "virid", "wheat", "white"],
    countries: ["aruba", "benin", "chile", "china", "chile", "egypt", "ghana", "india", "italy", "japan", "kenya", "laos", "malta", "nepal", "niger", "oman", "qatar", "sudan", "tonga", "yemen", "zambia"],
    animals: ["snake", "eagle", "horse", "otter", "panda", "shark", "sheep", "skunk", "sloth", "snail", "swine", "tiger", "toad", "whale", "wombat", "zebra"],
    food: ["apple", "bread", "grape", "kiwi", "lemon", "mango", "melon", "olive", "onion", "orange", "peach", "pecan", "plum", "salad", "toast", "treat"]
};

let guessesRemaining;
let currentWord;
let currentGuess;
let nextLetter;

function initBoard() {
    let board = document.getElementById('game-board');
    board.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('div');
        row.className = 'letter-row';

        for (let j = 0; j < 5; j++) {
            let box = document.createElement('div');
            box.className = 'letter-box';
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

function startGame(category) {
    guessesRemaining = 6;
    currentWord = words[category][Math.floor(Math.random() * words[category].length)];
    currentGuess = [];
    nextLetter = 0;
    initBoard();
}

function handleKeyClick(key) {
    if (guessesRemaining === 0) return;

    if (key === 'Enter') {
        checkGuess();
        return;
    }

    if (key === 'Backspace') {
        deleteLetter();
        return;
    }

    if (key.match(/^[a-z]$/) && currentGuess.length < 5) {
        insertLetter(key);
    }
}

function insertLetter(letter) {
    if (nextLetter === 5) return;

    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = letter;
    box.classList.add('filled-box');
    currentGuess.push(letter);
    nextLetter += 1;
}

function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = '';
    box.classList.remove('filled-box');
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining];
    let guessString = currentGuess.join('');
    let rightGuess = Array.from(currentWord);

    if (guessString.length != 5) {
        alert("Not enough letters!");
        return;
    }

    if (guessString === currentWord) {
        for (let i = 0; i < 5; i++) {
            let box = row.children[i];
            box.style.backgroundColor = 'green';
        }
        alert("You guessed right! Game over!");
        guessesRemaining = 0;
        return;
    }

    for (let i = 0; i < 5; i++) {
        let box = row.children[i];
        let letter = currentGuess[i];
        let letterPosition = rightGuess.indexOf(letter);

        if (letterPosition === -1) {
            box.style.backgroundColor = 'gray';
        } else {
            if (letter === rightGuess[i]) {
                box.style.backgroundColor = 'green';
            } else {
                box.style.backgroundColor = 'yellow';
            }
            rightGuess[letterPosition] = '#';
        }
    }

    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
        alert("You've run out of guesses! Game over!");
        alert(`The correct word was: "${currentWord}"`);
    }
}
