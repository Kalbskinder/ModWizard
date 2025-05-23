const projectsGrid = document.getElementById("projectsGrid");
const filterButton = document.getElementById("filterButton");

async function fetchProjects(filter) {
    filterButton.innerHTML = `Filter: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`;
    try {
        const response = await fetch(`/projects/public?filter=${filter}`);

        if (!response.ok) {
            const error = await response.json();
            console.error("Fehler vom Server:", error);
            projectsGrid.innerHTML = '<h4 class="m-auto mt-4">Error: ' + (error.error || "Undefined") + '</h4>';
            return;
        }

        const content = await response.json();
        const projects = content.projects;
        const users = content.users;

        if (!Array.isArray(projects)) {
            console.error("Unerwartete Antwort vom Server:", projects);
            projectsGrid.innerHTML = '<h4 class="m-auto mt-4">Fehler beim Laden der Projekte.</h4>';
            return;
        }

        projectsGrid.innerHTML = "";
        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "card";
        
            const user = users.find(user => user.id === project.user_id);
            const userImg = user?.profileImage || './images/users/profileimages/default.png';
        
            card.innerHTML = `
                <img src="${project.banner || './images/icons/placeholder.png'}" class="card-img-top" alt="Project Image">
                <div class="card-body">
                    <div class="space-between">
                        <h5 class="card-title">${project.name}</h5>
                        <a href="/users?id=${project.user_id}">
                            <img src="${userImg}" class="card-user" alt="User Profile Picture">
                        </a>
                    </div>
                    <p class="card-text">${project.description || "No description"}</p>
                    <div class="card-voter">
                        <div>
                            <span class="view-count">${project.views || 0} views</span>
                        </div>
                        <div>
                            <button class="btn btn-primary" onclick="previewProject(${project.id}, ${project.user_id})">Preview</button>
                        </div>
                    </div>
                </div>
            `;
        
            projectsGrid.appendChild(card);
        });        
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

fetchProjects('newest');


function previewProject(projectId, user_id) {
    window.location.href = `/projects/${projectId}?user_id=${user_id}`;
}
