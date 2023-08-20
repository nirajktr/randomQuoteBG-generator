const QUOTABLE_API_URL = "https://api.quotable.io/random";
const UNSPLASH_ACCESS_KEY = "UNSPLASH_API_KEY";

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
            console.error("Response status:", response.status);
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

async function generateImageBasedOnQuote(quoteText) {
    const query = encodeURIComponent(quoteText);
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
        return data.results[0].urls.regular;
    } else {
        return "URL_TO_DEFAULT_IMAGE";
    }
}

async function displayRandomQuote() {
    generateButton.disabled = true; // Disable the button while loading
    loading.style.display = 'block'; // Show the loading indicator

    try {
        const quoteData = await fetchRandomQuote();
        quoteText.textContent = quoteData.content;
        authorText.textContent = "- " + quoteData.author;

        const randomImageUrl = await generateImageBasedOnQuote(quoteData.content);
        const backgroundImage = document.getElementById("background-image"); // Select the background image container
        backgroundImage.style.backgroundImage = `url(${randomImageUrl})`;

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