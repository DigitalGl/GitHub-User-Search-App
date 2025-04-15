
const form = document.querySelector("[data-search-form]");
const input = document.querySelector("[data-search-input]");
const userInfoContainer = document.querySelector("[data-user-info-container]");
const reposContainer = document.querySelector("[data-repos-container]");

const API_GITHUB = "https://api.github.com";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (!query) {
        alert("Please enter a name, bio, or username");
        return;
    }

    userInfoContainer.innerHTML = "<p>Loading...</p>";
    reposContainer.innerHTML = "";

    try {
        // Поиск пользователей по ключевым словам
        const searchResponse = await fetch(`${API_GITHUB}/search/users?q=${encodeURIComponent(query)}`);
        if (!searchResponse.ok) throw new Error("Search failed");

        const searchData = await searchResponse.json();

        if (searchData.items.length === 0) {
            userInfoContainer.innerHTML = "<p>No users found</p>";
            return;
        }

        // Очищаем контейнер
        userInfoContainer.innerHTML = "";

        // Создаем список пользователей
        const userList = document.createElement("div");
        userList.className = "user-list";
        userInfoContainer.appendChild(userList);

        // Обрабатываем каждого пользователя
        for (const user of searchData.items) {
            // Запрашиваем полные данные пользователя
            const userResponse = await fetch(`${API_GITHUB}/users/${user.login}`);
            if (!userResponse.ok) continue; // Пропускаем, если ошибка

            const userData = await userResponse.json();

            // Создаем карточку пользователя
            const userCard = document.createElement("div");
            userCard.className = "user-card";
            userCard.innerHTML = `
                <img src="${userData.avatar_url}" alt="${userData.login}"/>
                <h3>${userData.name || userData.login}</h3>
                <p>${userData.bio || "No bio available"}</p>
            `;

            // Добавляем событие для показа репозиториев при клике
            userCard.addEventListener("click", async () => {
                reposContainer.innerHTML = "<p>Loading repositories...</p>";
                try {
                    const reposResponse = await fetch(`${userData.repos_url}?per_page=100`);
                    if (!reposResponse.ok) throw new Error("Could not fetch repos");

                    const repos = await reposResponse.json();

                    if (repos.length) {
                        let reposHTML = `<h3>Repositories for ${userData.login}:</h3>`;
                        repos.forEach(repo => {
                            reposHTML += `
                                <div class="repo">
                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                </div>
                            `;
                        });
                        reposContainer.innerHTML = reposHTML;
                    } else {
                        reposContainer.innerHTML = `<p>No repositories found for ${userData.login}</p>`;
                    }
                } catch (error) {
                    reposContainer.innerHTML = `<p>${error.message}</p>`;
                }
            });

            userList.appendChild(userCard);
        }

    } catch (error) {
        userInfoContainer.innerHTML = `<p>${error.message}</p>`;
        reposContainer.innerHTML = "";
    }
});















