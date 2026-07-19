export const profileData = {
    name: "Deepak Rawat",
    username: "deepakrawat18",
    jobTitle: "Full-Stack Developer",
    heroText: {
        title: "Deepak Rawat builds things that work.",
        highlight: "things",
        sub: "// deepakrawat18 — full-stack developer — click an icon to explore",
        avatar: "/deepak.jpeg",
        tags: ["Full-Stack", "Web Engineer", "Open Source", "Delhi, IN"]
    },
    bootLines: [
        "booting portfolio-os v2.1 ...",
        "mounting /projects ...",
        "loading skills.app ...",
        "checking coffee levels [OK]",
        "starting window manager ...",
        "",
        "welcome back, Deepak Rawat (deepakrawat18)."
    ],
    about: {
        prompt: "$ cat about.txt",
        message: "Hi, I'm Deepak Rawat (deepakrawat18) — a developer who enjoys clean code, fast feedback loops, and shipping things people actually use.",
        details: "I'm Deepak Rawat (deepakrawat18), a developer who likes turning vague ideas into things that actually ship — clean APIs, fast interfaces, and code my future self won't hate. When I'm not at the keyboard I'm probably breaking something on purpose just to learn how it works.",
        location: "Delhi NCR",
        status: "freelance / full-time"
    },
    projects: [
        {
            id: "soberdev",
            title: "soberdev.in",
            description: "Live project (Chrome) — a personal project I'm shipping; visit the site or install the Chrome offering to try it.",
            tags: ["Chrome", "JavaScript", "Web"],
            link: "https://soberdev.in",
            thumbnail: "/soberdev-logo.svg",
            cardClass: "p4"
        },
        {
            id: "sahilbajaj",
            title: "sahilbajaj.me",
            description: "Personal portfolio (Chrome) — my professional portfolio site showcasing projects and case studies.",
            tags: ["Chrome", "Portfolio", "HTML"],
            link: "https://sahilbajajportfolio.vercel.app/",
            cardClass: "p5"
        },
        {
            id: "proj1",
            title: "Project One",
            description: "A short, punchy line about what it does and the problem it solves for real users.",
            tags: ["React", "Node", "Postgres"],
            link: "#",
            cardClass: "p1"
        },
        {
            id: "proj2",
            title: "Project Two",
            description: "Another project summary — what you built, the stack, and the outcome or scale.",
            tags: ["Python", "FastAPI", "Docker"],
            link: "#",
            cardClass: "p2"
        },
        {
            id: "proj3",
            title: "Project Three",
            description: "One more highlight. Keep these tight — one sentence, one clear takeaway.",
            tags: ["TypeScript", "AWS"],
            link: "#",
            cardClass: "p3"
        }
    ],
    skills: [
        { name: "JavaScript / TypeScript", percentage: 92, color: "var(--pink)" },
        { name: "React / Next.js", percentage: 88, color: "var(--teal)" },
        { name: "Python", percentage: 80, color: "var(--violet)" },
        { name: "System Design", percentage: 75, color: "#FFD166" },
        { name: "DevOps / Cloud", percentage: 70, color: "var(--pink)" }
    ],
    contact: {
        prompt: "$ ./contact.sh --run",
        email: "dpkrwt1305@gmail.com",
        github: "dpkrwt21",
        linkedin: "deepak-rawat-95003a363",
        githubUrl: "https://github.com/dpkrwt21",
        linkedinUrl: "https://www.linkedin.com/in/deepak-rawat-95003a363"
    },
    music: {
        tracks: [
            { id: 1, title: "Lofi Coding Session", artist: "Developer Beats", duration: "6:12", url: "/song1.mp3" },
            { id: 2, title: "Midnight Synths", artist: "Retrowave", duration: "7:05", url: "/song2.mp3" },
            { id: 3, title: "Debug Mode", artist: "NullPointer", duration: "5:44", url: "/song3.mp3" }
        ]
    },
    resume: {
        pdfUrl: "/Deepak_Rawat_Resume.pdf",
        name: "Deepak Rawat",
        role: "Developer & Designer | Delhi, India",
        experience: [
            {
                role: "Frontend Dev",
                period: "2024 - Present",
                description: "Shipped 12+ premium React dashboards. Reduced page loading sizes by 40% using modern asset packing mechanisms."
            },
            {
                role: "Freelance Developer",
                period: "2022 - 2024",
                description: "Built responsive sites and headless CMS configurations for client brands. Handled serverless integrations."
            }
        ],
        education: [
            {
                degree: "BCA",
                period: "Graduating 2027",
                description: "Focusing on Full-Stack systems, Data structures, and Interface engineering."
            }
        ]
    },
    themes: [
        { id: "peach", name: "Peach 🍑" },
        { id: "dark", name: "Midnight 🌙" },
        { id: "neon", name: "Cyberpunk ⚡" },
        { id: "light", name: "Minimal 💡" }
    ]
};
