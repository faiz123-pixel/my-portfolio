document.addEventListener('DOMContentLoaded', () => {
    // Assuming data.js contains:
    // personalInfo, skillsData, projectsData

    // --- Core Functions ---
    const createSkillElement = (skill) => {
        const span = document.createElement('span');
        span.className = 'skillsspan';
        span.innerHTML = `
            <img src="${skill.image}" alt="${skill.name.toLowerCase()} logo" />
            <span>${skill.name}</span>
        `;
        return span;
    };

    const createProjectCard = (project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" />
            <h3>${project.title}</h3>
            <p>${project.overview}</p>
            <div class="tech-stack">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>
            <div class="project-links">
                <a href="${project.live}" target="_blank">Live Demo</a> | 
                <a href="${project.github}" target="_blank">GitHub</a>
            </div>
        `;
        return card;
    };

    const renderProjects = (projectsToRender) => {
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = '';
        projectsToRender.forEach(project => {
            projectsContainer.appendChild(createProjectCard(project));
        });
    };

    const populateContent = () => {
        // Basic Info
        document.getElementById('headerName').textContent = personalInfo.name;
        document.getElementById('homeName').textContent = `I'm ${personalInfo.name.split(' ')[0]}`;
        document.getElementById('aboutDescription').textContent = personalInfo.description;
        document.getElementById('aboutName').textContent = personalInfo.name;
        document.getElementById('aboutDOB').textContent = personalInfo.dob;
        document.getElementById('aboutAddress').textContent = personalInfo.address;

        // Contact Info
        document.getElementById('contactPhone').textContent = personalInfo.phone;
        document.getElementById('contactEmail').textContent = personalInfo.email;
        document.getElementById('contactLinkedin').href = personalInfo.linkedin;
        document.getElementById('contactLinkedin').textContent = personalInfo.linkedin;
        document.getElementById('contactGithub').href = personalInfo.github;
        document.getElementById('contactGithub').textContent = personalInfo.github;

        // Skills
        const skillsContainer = document.getElementById('skillsContainer');
        skillsData.forEach(skill => {
            skillsContainer.appendChild(createSkillElement(skill));
        });
    };

    // --- Dynamic Features ---

    // ✅ Project Filters
    const setupProjectFilters = () => {
        const filterButtonsContainer = document.createElement('div');
        filterButtonsContainer.className = 'filter-buttons';
        document.getElementById('project').prepend(filterButtonsContainer);

        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.className = 'filter-btn active';
        filterButtonsContainer.appendChild(allButton);

        const technologies = [...new Set(projectsData.flatMap(project => project.tech))];
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
    };

    // ✅ Smooth Scroll
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    };

    // ✅ Sticky Header
    const setupStickyHeader = () => {
        const header = document.querySelector('.fix-header');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    };

    // ✅ Dark/Light Mode with LocalStorage
    const setupDarkModeToggle = () => {
        const toggleBtn = document.getElementById('darkModeToggle');
        const body = document.body;

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            toggleBtn.textContent = '☀️';
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    };

    // ✅ Highlight Active Section in Navbar
    const setupActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 70;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    };

    // --- Initialization ---
    populateContent();
    setupProjectFilters();
    renderProjects(projectsData);
    setupSmoothScroll();
    setupStickyHeader();
    setupDarkModeToggle();
    setupActiveNavLink();
});
