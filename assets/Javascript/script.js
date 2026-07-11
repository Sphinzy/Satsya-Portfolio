const body = document.body;
const themeButtons = document.querySelectorAll(".themeToggle");

// Load saved theme, otherwise default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-bs-theme", savedTheme);

// Set the correct icon when the page first loads
themeButtons.forEach(btn => {
    const icon = btn.querySelector("i");

    icon.className = `bi ${savedTheme === "dark" ? "bi-sun-fill" : "bi-moon-fill"
        } icon-animate`;

    btn.addEventListener("click", () => {
        const current = body.getAttribute("data-bs-theme");
        const next = current === "dark" ? "light" : "dark";

        icon.style.transform = "rotate(180deg)";
        icon.style.opacity = "0";

        setTimeout(() => {
            body.setAttribute("data-bs-theme", next);
            localStorage.setItem("theme", next);

            icon.className = `bi ${next === "dark" ? "bi-sun-fill" : "bi-moon-fill"
                } icon-animate`;

            icon.style.transform = "rotate(0)";
            icon.style.opacity = "1";
        }, 250);
    });
});
const projectList = document.getElementById("project-list");

fetch("assets/data/projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load projects");
        }

        return response.json();
    })
    .then(projects => {
        projects.forEach(project => {
            projectList.innerHTML += `
                <div class="col-md-4 col-sm-6">
                    <div class="pixel-card">

                        <div class="badge">${project.badge}</div>

                        <img 
                            src="${project.image}" 
                            class="card-img" 
                            alt="${project.title}"
                        />

                        <div class="content my-2">
                            <div class="title clamp-1">
                                ${project.title}
                            </div>

                            <div class="subtitle clamp-1">
                                ${project.subtitle}
                            </div>

                            <div class="desc clamp-3 mb-3">
                                ${project.description}
                            </div>

                            <a 
                                href="${project.link}"
                                target="_blank"
                                class="btn pixel-btn text-decoration-none py-1 px-2"
                            >
                                View
                            </a>
                        </div>

                    </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });

const experienceList = document.getElementById("experience-list");

fetch("assets/data/experiences.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load experiences");
        }

        return response.json();
    })
    .then(experiences => {
        experiences.forEach(experience => {

            // Generate tags
            const tags = experience.tags
                .map(tag => `<span>${tag}</span>`)
                .join("");

            experienceList.innerHTML += `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>

                    <div class="timeline-content">
                        <h3>${experience.title}</h3>

                        <span class="company">
                            ${experience.company}
                        </span>

                        <span class="date">
                            ${experience.date}
                        </span>

                        <p>
                            ${experience.description}
                        </p>

                        <div class="tags">
                            ${tags}
                        </div>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => {
        console.error("Error loading experiences:", error);
    });