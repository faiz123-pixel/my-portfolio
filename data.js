// ✅ Personal Information
const personalInfo = {
  name: "Mohd Faiz",
  title: "Full Stack Developer",
  dob: "08/08/2001",
  address: "Andheri (East), Mumbai",
  email: "mo111faiz@gmail.com",
  phone: "+91 77180 29725",
  linkedin: "https://www.linkedin.com/in/mohd-faiz-16882b242",
  github: "https://github.com/faiz123-pixel",
  description: "I’m an enthusiastic web developer with a passion for building responsive and user-friendly websites. As a recent B.Sc IT graduate from Mumbai University, I have a strong foundation in web development technologies, including HTML, CSS, JavaScript, and React.js."
};

// ✅ Skills Data
const skillsData = [
  { name: "HTML", image: "image/htmllogo.webp" },
  { name: "CSS", image: "image/csslogo.webp" },
  { name: "JavaScript", image: "image/jslogo.webp" },
  { name: "React.js", image: "image/Reactlogo.webp" },
  { name: "Python", image: "image/python.webp" },
  { name: "Java", image: "image/javalogo.webp" },
  { name: "MySQL", image: "image/mysqllogo.webp" },
  { name: "GitHub", image: "image/githublogo.webp" }
];

// ✅ Projects Data with Categories for Filtering
const projectsData = [
  {
    title: "Weather Forecasting Web",
    category: "Web",
    overview: "A weather forecast website providing real-time weather updates using APIs, optimized for performance and cross-device compatibility.",
    role: "Front-end development, API integration, UI/UX design",
    tech: ["HTML", "CSS", "JavaScript", "React.js"],
    liveDemo: "#", // Add live demo link
    githubLink: "#", // Add GitHub repo link
    image: "image/weather-project.webp" // Add thumbnail
  },
  {
    title: "Hind Handloom",
    category: "Full-Stack",
    overview: "An e-commerce platform offering a wide range of products including fashion, home essentials, and electronics.",
    role: "Full-stack development, backend integration, UI/UX design",
    tech: ["HTML", "CSS", "JavaScript", "Python (Django)"],
    liveDemo: "#", // Add live demo link
    githubLink: "#",
    image: "image/handloom-project.webp"
  },
  {
    title: "Portfolio Website",
    category: "Web",
    overview: "Personal portfolio website showcasing skills, projects, and contact details with dark mode toggle and smooth navigation.",
    role: "Frontend development and deployment",
    tech: ["HTML", "CSS", "JavaScript"],
    liveDemo: "https://faiz123-pixel.github.io/my-portfolio/",
    githubLink: "https://github.com/faiz123-pixel/my-portfolio",
    image: "image/portfolio-project.webp"
  }
];

// ✅ Function to Render Skills Dynamically
function renderSkills() {
  const skillsContainer = document.querySelector(".skillsdiv");
  skillsContainer.innerHTML = skillsData
    .map(skill => `
      <div class="skillsspan">
        <img src="${skill.image}" alt="${skill.name}">
        <p>${skill.name}</p>
      </div>
    `).join("");
}

// ✅ Function to Render Projects Dynamically
function renderProjects(filter = "All") {
  const projectsContainer = document.querySelector(".cards");
  let filteredProjects = filter === "All" ? projectsData : projectsData.filter(project => project.category === filter);
  
  projectsContainer.innerHTML = filteredProjects
    .map(project => `
      <div class="card">
        <img src="${project.image}" alt="${project.title}" class="project-img">
        <h3 class="card-title">${project.title}</h3>
        <p>${project.overview}</p>
        <p><strong>Role:</strong> ${project.role}</p>
        <p><strong>Tech:</strong> ${project.tech.join(", ")}</p>
        <div class="card-links">
          <a href="${project.liveDemo}" target="_blank">Live Demo</a>
          <a href="${project.githubLink}" target="_blank">GitHub</a>
        </div>
      </div>
    `).join("");
}

// ✅ Event Listener for Filter Buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// ✅ Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
});
