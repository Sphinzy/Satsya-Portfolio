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

const typingEl = document.getElementById("typing");

const words = ["Frontend Developer", "Vue.js", "Backend Developer ", "Node.js", "MySQL"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word before deleting
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the effect
typeEffect();
const projectList = document.getElementById("project-list");
let allProjects = [];

fetch("assets/data/projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load projects");
        }
        return response.json();
    })
    .then(projects => {
        allProjects = projects;

        projects.forEach((project, index) => {
            projectList.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="pixel-card h-100 d-flex flex-column">

                        <div class="badge">${project.badge}</div>

                        <img 
                            src="${project.image}" 
                            class="card-img" 
                            alt="${project.title}"
                        />

                        <div class="content my-2 flex-grow-1 d-flex flex-column">
                            <div class="title clamp-1">
                                ${project.title}
                            </div>

                            <div class="subtitle clamp-1">
                                ${project.subtitle}
                            </div>

                            <div class="desc clamp-3 mb-3 flex-grow-1">
                                ${project.description}
                            </div>

                            <button 
                                type="button"
                                class="btn pixel-btn text-decoration-none py-1 px-2 mt-auto align-self-start view-project-btn"
                                data-index="${index}"
                            >
                                View
                            </button>
                        </div>

                    </div>
                </div>
            `;
        });

        attachModalListeners();
    })
    .catch(error => {
        console.error("Error:", error);
    });

function attachModalListeners() {
    const modalEl = document.getElementById("projectModal");
    const modal = new bootstrap.Modal(modalEl);

    document.querySelectorAll(".view-project-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const project = allProjects[btn.dataset.index];

            document.getElementById("modalTitle").textContent = project.title;
            document.getElementById("modalSubtitle").textContent = project.subtitle;
            document.getElementById("modalDescription").textContent = project.description;
            document.getElementById("modalImage").src = project.image;
            document.getElementById("modalImage").alt = project.title;
            document.getElementById("modalLink").href = project.link;

            modal.show();
        });
    });
}
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
let allCertificates = [];

fetch("assets/data/certificates.json")
.then(res => res.json())
.then(data => {

    allCertificates = data.certificates;

    let desktopHtml = "";
    let mobileHtml = "";

    allCertificates.forEach((item, index) => {

        // ---------- DESKTOP (zigzag) ----------
        if (index % 2 === 0) {

            desktopHtml += `
            <div class="col-lg-5">
                <div class="pixel-card me-auto">
                    <img src="${item.image}" 
                        class="w-100 rounded-3 shadow-lg preview-trigger" 
                        data-fullimg="${item.image}">
                    <button type="button" class="btn pixel-btn w-100 view-cert-btn" data-index="${index}">
                        View Certificate
                    </button>
                </div>
            </div>

            <div class="col-lg-2"></div>

            <div class="col-lg-5">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div>
                        <h2 class="pixel-text">${item.title}</h2>

                        <p class="fade-up fs-5">
                            This certificate is awarded to 
                            <span class="date fs-4">${item.name}</span>
                            for successfully completing
                            <span class="date fs-5">${item.course}</span>
                            with outstanding performance and dedication.
                        </p>

                        <span class="date fs-5">${item.date}</span>
                    </div>
                </div>
            </div>
            `;

        } else {

            desktopHtml += `
            <div class="col-lg-5">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div>
                        <h2 class="pixel-text">${item.title}</h2>

                        <p class="fade-up fs-5">
                            This certificate is awarded to 
                            <span class="date fs-4">${item.name}</span>
                            for successfully completing
                            <span class="date fs-5">${item.course}</span>
                            with outstanding performance and dedication.
                        </p>

                        <span class="date fs-5">${item.date}</span>
                    </div>
                </div>
            </div>

            <div class="col-lg-2"></div>

            <div class="col-lg-5">
                <div class="pixel-card ms-auto">
                    <img src="${item.image}" 
                        class="w-100 rounded-3 shadow-lg preview-trigger" 
                        data-fullimg="${item.image}">
                    <button type="button" class="btn pixel-btn w-100 view-cert-btn" data-index="${index}">
                        View Certificate
                    </button>
                </div>
            </div>
            `;
        }

        // ---------- MOBILE (stacked card) ----------
        mobileHtml += `
        <div class="col-12">
            <div class="pixel-card">
                <img src="${item.image}" 
                    class="w-100 rounded-3 shadow-lg preview-trigger" 
                    data-fullimg="${item.image}">
                <div class="content p-3">
                    <h2 class="pixel-text fs-5">${item.title}</h2>
                    <p class="fade-up fs-6">
                        Awarded to <span class="date">${item.name}</span> for 
                        <span class="date">${item.course}</span>
                    </p>
                    <span class="date fs-6">${item.date}</span>
                    <button type="button" class="btn pixel-btn w-100 mt-2 view-cert-btn" data-index="${index}">
                        View Certificate
                    </button>
                </div>
            </div>
        </div>
        `;

    });

    document.getElementById("certificateList").innerHTML = desktopHtml;
    document.getElementById("certificateList-sm-screen").innerHTML = mobileHtml;

    attachCertModalListeners();
});

function attachCertModalListeners() {
    const modal = new bootstrap.Modal(document.getElementById("certificateModal"));
    const previewModal = new bootstrap.Modal(document.getElementById("imagePreviewModal"));

    document.querySelectorAll(".view-cert-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const cert = allCertificates[btn.dataset.index];

            document.getElementById("certModalTitle").textContent = cert.title;
            document.getElementById("certModalImage").src = cert.image;
            document.getElementById("certModalImage").alt = cert.title;
            document.getElementById("certModalDescription").textContent = cert.description;
            document.getElementById("certModalDate").textContent = cert.date;

            modal.show();
        });
    });

    document.querySelectorAll(".preview-trigger").forEach(img => {
        img.addEventListener("click", () => {
            document.getElementById("previewImage").src = img.dataset.fullimg;
            resetZoom();
            previewModal.show();
        });
    });

    document.getElementById("certModalImage").addEventListener("click", () => {
        document.getElementById("previewImage").src = document.getElementById("certModalImage").src;
        resetZoom();
        previewModal.show();
    });

    // Reset zoom when modal closes
    document.getElementById("imagePreviewModal").addEventListener("hidden.bs.modal", resetZoom);

    setupZoomListeners();
}
// Zoom state
let currentZoom = 1;
let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

function resetZoom() {
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
}

function applyTransform() {
    const img = document.getElementById("previewImage");
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
}

function setupZoomListeners() {
    const img = document.getElementById("previewImage");
    const wrapper = document.querySelector("#imagePreviewModal .modal-body");

    // Mouse wheel zoom (desktop)
    wrapper.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        currentZoom = Math.min(Math.max(1, currentZoom + delta), 4);
        if (currentZoom === 1) { translateX = 0; translateY = 0; }
        applyTransform();
    }, { passive: false });

    // Double-click to toggle zoom
    img.addEventListener("dblclick", () => {
        currentZoom = currentZoom === 1 ? 2 : 1;
        if (currentZoom === 1) { translateX = 0; translateY = 0; }
        applyTransform();
    });

    // Drag to pan (desktop)
    img.addEventListener("mousedown", (e) => {
        if (currentZoom === 1) return;
        isPanning = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
        if (!isPanning) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    });

    window.addEventListener("mouseup", () => {
        isPanning = false;
        img.style.cursor = "grab";
    });

    // Pinch to zoom (mobile/touch)
    let initialDistance = null;
    let initialZoom = 1;

    wrapper.addEventListener("touchstart", (e) => {
        if (e.touches.length === 2) {
            initialDistance = getDistance(e.touches[0], e.touches[1]);
            initialZoom = currentZoom;
        } else if (e.touches.length === 1 && currentZoom > 1) {
            isPanning = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        }
    });

    wrapper.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2 && initialDistance) {
            e.preventDefault();
            const newDistance = getDistance(e.touches[0], e.touches[1]);
            const scale = newDistance / initialDistance;
            currentZoom = Math.min(Math.max(1, initialZoom * scale), 4);
            applyTransform();
        } else if (e.touches.length === 1 && isPanning) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            applyTransform();
        }
    }, { passive: false });

    wrapper.addEventListener("touchend", () => {
        initialDistance = null;
        isPanning = false;
    });

    function getDistance(touch1, touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
