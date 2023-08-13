const QUOTABLE_API_URL = "https://api.quotable.io/random";

async function fetchRandomQuote() {
    try {
        const response = await fetch(QUOTABLE_API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        return {
            content: data.content,
            author: data.author,
        };
    } catch (error) {
        console.error("Error fetching quote:", error);
        return {
            content: "Failed to fetch a quote. Please try again.",
            author: "",
        };
    }
}

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const generateButton = document.getElementById("generate-button");

async function displayRandomQuote() {
    const quoteData = await fetchRandomQuote();
    quoteText.textContent = quoteData.content;
    authorText.textContent = "- " + quoteData.author;
}

generateButton.addEventListener("click", displayRandomQuote);

// Initial quote
displayRandomQuote();
