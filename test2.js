const fs = require('fs');

// Function to check if a line on the bingo card is complete
function isLineComplete(line, calledNumbers) {
  return line.every(num => calledNumbers.includes(num));
}

// Function to check if any row or column on the bingo card is complete
function isBingo(card, calledNumbers) {
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (isLineComplete(card[i], calledNumbers)) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    const column = card.map(row => row[i]);
    if (isLineComplete(column, calledNumbers)) {
      return true;
    }
  }

  return false;
}

// Read called numbers from external file
const calledNumbers = fs.readFileSync('called_numbers.txt', 'utf-8')
  .split(',')
  .map(num => parseInt(num));

// Read all bingo cards from external file
const allCards = fs.readFileSync('all_bingo_cards.txt', 'utf-8')
  .split('\n\n')
  .map(card => card.split('\n').map(row => row.split(' ').map(num => parseInt(num))));

// Find the board with the highest chance of winning
let maxWinningCount = 0;
let bestBoardIndex = -1;

allCards.forEach((card, index) => {
  let winningCount = 0;

  // Check for each called number if the card wins
  calledNumbers.forEach(number => {
    if (isBingo(card, [...calledNumbers, number])) {
      winningCount++;
    }
  });

  // Update the best board if necessary
  if (winningCount > maxWinningCount) {
    maxWinningCount = winningCount;
    bestBoardIndex = index;
  }
});

// Output the best board index
if (bestBoardIndex !== -1) {
  console.log(`Choose Board ${bestBoardIndex + 1} to guarantee a win against the giant squid!`);
} else {
  console.log('No board guarantees a win against the giant squid.');
}
