const QUOTABLE_API_URL = "https://api.quotable.io/random";

// Cache DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const generateButton = document.getElementById("generate-button");
const loading = document.getElementById("loading");

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

async function displayRandomQuote() {
    generateButton.disabled = true; // Disable the button while loading
    loading.style.display = 'block'; // Show the loading indicator

    try {
        const quoteData = await fetchRandomQuote();
        quoteText.textContent = quoteData.content;
        authorText.textContent = "- " + quoteData.author;
    } catch (error) {
        console.error("Error fetching quote:", error);
        quoteText.textContent = "Failed to fetch a quote. Please try again.";
        authorText.textContent = "";
    } finally {
        loading.style.display = 'none'; // Hide the loading indicator
        generateButton.disabled = false; // Re-enable the button
    }
}

generateButton.addEventListener("click", displayRandomQuote);

// Initial quote
displayRandomQuote();