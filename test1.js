const fs = require('fs');

// Function to check if a line on the bingo card is complete
function isLineComplete(line) {
  return line.every(num => calledNumbers.includes(num));
}

// Function to check if any row or column on the bingo card is complete
function isBingo(card) {
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (isLineComplete(card[i])) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    const column = card.map(row => row[i]);
    if (isLineComplete(column)) {
      return true;
    }
  }

  return false;
}

// Read called numbers from external file
const calledNumbers = fs.readFileSync('called_numbers.txt', 'utf-8')
  .split(',')
  .map(num => parseInt(num));

// Read bingo card from external file
const bingoCard = fs.readFileSync('bingo_card.txt', 'utf-8')
  .split('\n')
  .map(row => row.split(' ').map(num => parseInt(num)));

// Check if the card will ever get Bingo
if (isBingo(bingoCard)) {
  console.log('Bingo is possible!');
} else {
  console.log('No Bingo for this card.');
}
