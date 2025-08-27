// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Assuming data.js has been loaded and contains the following global variables:
    // personalInfo, skillsData, projectsData

    // --- Core Functions for Creating Elements ---

    function createSkillElement(skill) {
        const span = document.createElement('span');
        span.className = 'skillsspan';
        span.innerHTML = `
            <img src="${skill.image}" alt="${skill.name.toLowerCase()}logo" />
            <span>${skill.name}</span>
        `;
        return span;
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'card';
        const techList = project.tech.map(t => `<p>${t}</p>`).join('');
        card.innerHTML = `
            <h2 class="card-title">${project.title}</h2>
            <div class="card-content">
                <h3>Project Overview</h3>
                <p>${project.overview}</p>
                <h3>Your Role</h3>
                <p>${project.role}</p>
                <h3>Technologies and Tools Used</h3>
                ${techList}
            </div>
        `;
        return card;
    }

    // --- Initial Content Population ---

    // This function will handle both the initial render and the filtering.
    const projectsContainer = document.getElementById('projectsContainer');
    function renderProjects(projectsToRender) {
        projectsContainer.innerHTML = ''; // Clear existing projects
        projectsToRender.forEach(project => {
            projectsContainer.appendChild(createProjectCard(project));
        });
    }

    function populateContent() {
        // Populate basic info
        document.getElementById('headerName').textContent = personalInfo.name;
        document.getElementById('homeName').textContent = `I'm ${personalInfo.name.split(' ')[0]}`;
        document.getElementById('aboutDescription').textContent = personalInfo.description;
        document.getElementById('aboutName').textContent = personalInfo.name;
        document.getElementById('aboutDOB').textContent = personalInfo.dob;
        document.getElementById('aboutAddress').textContent = personalInfo.address;

        // Populate contact info
        document.getElementById('contactPhone').textContent = personalInfo.phone;
        document.getElementById('contactEmail').textContent = personalInfo.email;
        document.getElementById('contactLinkedin').href = personalInfo.linkedin;
        document.getElementById('contactLinkedin').textContent = personalInfo.linkedin;
        document.getElementById('contactGithub').href = personalInfo.github;
        document.getElementById('contactGithub').textContent = personalInfo.github;

        // Populate skills section
        const skillsContainer = document.getElementById('skillsContainer');
        skillsData.forEach(skill => {
            skillsContainer.appendChild(createSkillElement(skill));
        });
    }

    // --- Dynamic Features ---

    // Filterable Projects
    function setupProjectFilters() {
        const technologies = [...new Set(projectsData.flatMap(project => project.tech))];
        const filterButtonsContainer = document.createElement('div');
        filterButtonsContainer.className = 'filter-buttons';
        projectsContainer.before(filterButtonsContainer);

        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.className = 'filter-btn active';
        filterButtonsContainer.appendChild(allButton);

        technologies.forEach(tech => {
            const button = document.createElement('button');
            button.textContent = tech;
            button.className = 'filter-btn';
            filterButtonsContainer.appendChild(button);
        });

        filterButtonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                const filterTech = e.target.textContent;
                const filteredProjects = (filterTech === 'All') 
                    ? projectsData 
                    : projectsData.filter(project => project.tech.includes(filterTech));
                renderProjects(filteredProjects);
            }
        });
    }

    // Smooth Scroll Animation
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Sticky Header with State Change
    function setupStickyHeader() {
        const header = document.querySelector('.fix-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Initialization ---

    // Call all setup functions when the DOM is ready
    populateContent();
    setupProjectFilters();
    renderProjects(projectsData); // Initial render
    setupSmoothScroll();
    setupStickyHeader();
});