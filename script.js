
const form = document.querySelector("[data-search-form]");
const input = document.querySelector("[data-search-input]");
const userInfoContainer = document.querySelector("[data-user-info-container]");
const reposContainer = document.querySelector("[data-repos-container]");

const API_GITHUB = "https://api.github.com/users";


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = input.value.trim();

    if (!username) {
        alert("Please enter a Github username");
        return;
    }

    try {
        const userResponse = await fetch(`${API_GITHUB}/${username}`);
        if (!userResponse.ok) throw new Error("User not Found");

        const userData = await userResponse.json();

        userInfoContainer.innerHTML = `
        <div>
            <img src="${userData.avatar_url}" alt="${userData.login}"/>
            <h2>${userData.name || userData.login}</h2>
            <p>${userData.bio || "No bio available"}</p>
        </div>
        `;

    } catch (error) {
        userInfoContainer.innerHTML = `<p>${error.message}</p>`
    }
})















