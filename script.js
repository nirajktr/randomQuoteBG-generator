const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    // Add more quotes
];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const generateButton = document.getElementById("generate-button");

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteText.textContent = randomQuote;
}

generateButton.addEventListener("click", getRandomQuote);

// Initial quote
getRandomQuote();
