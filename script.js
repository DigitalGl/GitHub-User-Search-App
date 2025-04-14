
const form = document.querySelector("[data-search-form]");
const input = document.querySelector("[data-search-input]");
const userInfoContainer = document.querySelector("[data-user-info-container]");
const reposContainer = document.querySelector("[data-repos-container]");


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = input.value.trim();

    if (!username) {
        alert("Please enter a Github username");
        return;
    }

    try {
        const userResponse = await fetch()
    } catch (error) {
        
    }
})















