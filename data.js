const jobListings = [{
        id: 1,
        company: "Photosnap",
        logo: "./photosnap.svg",
        new: true,
        featured: true,
        position: "Senior Frontend Developer",
        role: "Frontend",
        level: "Senior",
        postedAt: "1d ago",
        contract: "Full Time",
        location: "USA Only",
        languages: ["HTML", "CSS", "JavaScript"],
        tools: [],
    },
    {
        id: 2,
        company: "Manage",
        logo: "./manage.svg",
        new: true,
        featured: true,
        position: "Fullstack Developer",
        role: "Fullstack",
        level: "Midweight",
        postedAt: "1d ago",
        contract: "Part Time",
        location: "Remote",
        languages: ["Python"],
        tools: ["React"],
    },
    {
        id: 3,
        company: "Account",
        logo: "./account.svg",
        new: false,
        featured: false,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "2d ago",
        contract: "Part Time",
        location: "USA Only",
        languages: ["JavaScript"],
        tools: ["React", "Sass"],
    },
    {
        id: 4,
        company: "MyHome",
        logo: "./myhome.svg",
        new: false,
        featured: false,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "5d ago",
        contract: "Contract",
        location: "USA Only",
        languages: ["CSS", "JavaScript"],
        tools: [],
    },
    {
        id: 5,
        company: "Loop Studios",
        logo: "./loop-studios.svg",
        new: false,
        featured: false,
        position: "Software Engineer",
        role: "Fullstack",
        level: "Midweight",
        postedAt: "1w ago",
        contract: "Full Time",
        location: "Worldwide",
        languages: ["JavaScript", "Ruby"],
        tools: ["Sass"],
    },
    {
        id: 6,
        company: "FaceIt",
        logo: "./faceit.svg",
        new: false,
        featured: false,
        position: "Junior Backend Developer",
        role: "Backend",
        level: "Junior",
        postedAt: "2w ago",
        contract: "Full Time",
        location: "UK Only",
        languages: ["Ruby"],
        tools: ["RoR"],
    },
    {
        id: 7,
        company: "Shortly",
        logo: "./shortly.svg",
        new: false,
        featured: false,
        position: "Junior Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "2w ago",
        contract: "Full Time",
        location: "Worldwide",
        languages: ["HTML", "JavaScript"],
        tools: ["Sass"],
    },
    {
        id: 8,
        company: "Insure",
        logo: "./insure.svg",
        new: false,
        featured: false,
        position: "Junior Frontend Developer",
        role: "Frontend",
        level: "Junior",
        postedAt: "2w ago",
        contract: "Full Time",
        location: "USA Only",
        languages: ["JavaScript"],
        tools: ["Vue", "Sass"],
    },
    {
        id: 9,
        company: "Eyecam Co.",
        logo: "./eyecam-co.svg",
        new: false,
        featured: false,
        position: "Full Stack Engineer",
        role: "Fullstack",
        level: "Midweight",
        postedAt: "3w ago",
        contract: "Full Time",
        location: "Worldwide",
        languages: ["JavaScript", "Python"],
        tools: ["Django"],
    },
    {
        id: 10,
        company: "The Air Filter Company",
        logo: "./the-air-filter-company.svg",
        new: false,
        featured: false,
        position: "Front-end Dev",
        role: "Frontend",
        level: "Junior",
        postedAt: "1mo ago",
        contract: "Part Time",
        location: "Worldwide",
        languages: ["JavaScript"],
        tools: ["React", "Sass"],
    },
];

const jobContainer = document.querySelector(".job-listings");
const filterContainer = document.querySelector(".filter-tags");
const clearButton = document.querySelector(".clear");

let jobs = [...jobListings];
let filters = [];

function displayJobs() {
    jobContainer.innerHTML = "";
    jobs.forEach((job) => {
                const jobElement = document.createElement("div");
                jobElement.classList.add("job-listing");
                if (job.featured) jobElement.classList.add("featured");

                jobElement.innerHTML = `
            <img src="${job.logo}" alt="${job.company} logo">
            <div class="info-container">
                <div class="job-info">
                    <div class="job-header">
                        <h3>${job.company}</h3>
                        ${job.new ? '<span class="new">NEW!</span>' : ""}
                        ${job.featured ? '<span class="featured">FEATURED</span>' : ""}
                    </div>
                    <h2>${job.position}</h2>
                    <p>${job.postedAt} · ${job.contract} · ${job.location}</p>
                </div>
                <div class="job-tags">
                    <span>${job.role}</span>
                    <span>${job.level}</span>
                    ${job.languages.map(lang => `<span>${lang}</span>`).join("")}
                    ${job.tools.map(tool => `<span>${tool}</span>`).join("")}
                </div>
            </div>
        `;
        jobContainer.appendChild(jobElement);
    });

    addJobTagEventListeners();
}

function updateFilters() {
    filterContainer.innerHTML = filters.map(filter =>
        `<span>${filter}<button class="remove-filter" data-filter="${filter}">&times;</button></span>`
    ).join("");
}

function addJobTagEventListeners() {
    document.querySelectorAll(".job-tags span").forEach(tag => {
        tag.addEventListener("click", () => {
            if (!filters.includes(tag.textContent)) {
                filters.push(tag.textContent);
                updateFilters();
                filterJobs();
            }
        });

        tag.addEventListener("mouseenter", () => {
            tag.classList.add("hovered");
        });

        tag.addEventListener("mouseleave", () => {
            tag.classList.remove("hovered");
        });
    });
}

function addRemoveFilterListeners() {
    document.querySelectorAll(".remove-filter").forEach(button => {
        button.addEventListener("click", (e) => {
            const filter = e.target.dataset.filter;
            filters = filters.filter(f => f !== filter);
            updateFilters();
            filterJobs();
        });

        button.addEventListener("mouseenter", () => {
            button.classList.add("hovered");
        });

        button.addEventListener("mouseleave", () => {
            button.classList.remove("hovered");
        });
    });
}

function filterJobs() {
    jobs = jobListings.filter(job => {
        const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
        return filters.every(filter => jobTags.includes(filter));
    });
    displayJobs();
}

clearButton.addEventListener("click", () => {
    filters = [];
    updateFilters();
    resetJobs();
});

function resetJobs() {
    jobs = [...jobListings];
    displayJobs();
}

displayJobs();