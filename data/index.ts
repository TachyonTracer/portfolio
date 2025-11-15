export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "LeetCode", link: "#leetcode" },
  { name: "Tech Stack", link: "#tech-stack" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize clean code, scalable architecture, and best practices",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I work across the SDE with modern technologies",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "Always learning and evolving",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Passionate about building robust, maintainable software systems",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently architecting distributed systems and microservices",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Let's build something great together",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Fitpro",
    des: "High-performance task queue with Redis backend, supporting priority scheduling, retries, and horizontal scaling for processing millions of jobs.",
    img: "/fitpro.png",
    iconLists: [
      "/dotnet-tile.svg",
      "/tail.svg",
      "/ts.svg",
      "/redis-tile.svg",
      "/postgresql-tile.svg",
    ],
    link: "https://www.github.com/tachyontracer/fitpro",
    live: "https://poetic-sprinkles-96abfb.netlify.app/",
  },
  {
    id: 2,
    title: "Reware",
    des: "Microservices-based analytics engine processing streaming data with Kafka, featuring custom aggregation pipelines and sub-second query performance.",
    img: "/rewear.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://www.github.com/tachyontracer/rewear",
    live: "https://rewear-tawny.vercel.app/",
  },

  {
    id: 3,
    title: "Dealer Portal",
    des: "Unified API gateway with schema stitching, authentication middleware, rate limiting, and comprehensive monitoring for multiple backend services.",
    img: "/dealerportal.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://github.com/TachyonTracer/dealerportal",
    live: "https://dealerportal-phi.vercel.app/",
  },
  {
    id: 4,
    title: "n8n Open Source Contribution ",
    des: "Command-line tool for automating deployment workflows, infrastructure provisioning, and CI/CD pipeline management with multi-cloud support.",
    img: "/n8n.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://github.com/n8n-io/n8n",
    live: "https://n8n.io/",
  },
];

export const testimonials = [
  {
    quote:
      "Excellent work on implementing our microservices architecture. They quickly grasped complex distributed systems concepts and contributed to reducing our system latency significantly. Strong technical skills in .NET and cloud technologies.",
    name: "Rajesh Kumar",
    title: "Tech Lead at Samrisa Infotech",
  },
  {
    quote:
      "Impressed by their ability to build scalable APIs and optimize database performance. They took initiative in implementing caching strategies that improved our response times. Great team player who collaborates well.",
    name: "Priya Sharma",
    title: "Senior Developer at Casepoint Pvt Ltd.",
  },
  {
    quote:
      "Passionate learner with strong fundamentals and hands-on project experience. They've built impressive full-stack applications demonstrating solid understanding of modern web technologies and best practices. Shows great potential for growth.",
    name: "Ankit Mehta",
    title: "Senior Developer & Mentor",
  },
  {
    quote:
      "Outstanding student with strong fundamentals in computer science. Their capstone project on microservices architecture demonstrated deep understanding of distributed systems. Always eager to learn and apply new concepts.",
    name: "Dr. Meena Verma",
    title: "Professor at Parul University",
  },
  {
    quote:
      "Dedicated professional who consistently delivers quality work. They show great attention to detail in code reviews and actively contribute to improving our development processes. Reliable and always meets commitments.",
    name: "Vikram Singh",
    title: "Senior Engineer at Samrisa Infotech",
  },
];

export const companies = [
  {
    id: 1,
    name: "ASP.NET",
    img: "/dotnet-tile.svg",
    nameImg: "/dotnetName.svg",
  },
  {
    id: 2,
    name: "Go",
    img: "/go-tile.svg",
    nameImg: "/goName.svg",
  },
  {
    id: 3,
    name: "React",
    img: "/react-tile.svg",
    nameImg: "/reactName.svg",
  },
  {
    id: 4,
    name: "PostgreSQL",
    img: "/postgresql-tile.svg",
    nameImg: "/postgresName.svg",
  },
  {
    id: 5,
    name: "Docker",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 6,
    name: "TypeScript",
    img: "/typescript-tile.svg",
    nameImg: "/tsName.svg",
  },
  {
    id: 7,
    name: "MongoDB",
    img: "/mongodb-tile.svg",
    nameImg: "/mongoName.svg",
  },
  {
    id: 8,
    name: "Redis",
    img: "/redis-tile.svg",
    nameImg: "/redisName.svg",
  },
  {
    id: 9,
    name: "Kubernetes",
    img: "/kubernets-tile.svg",
    nameImg: "/k8sName.svg",
  },
  {
    id: 10,
    name: "AWS",
    img: "/aws-tile.svg",
    nameImg: "/awsName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Software Engineer",
    desc: "Architected and implemented microservices infrastructure, reducing system latency by 40% and improving deployment frequency.",
    className: "md:col-span-2",
    thumbnail: "/samrisa.png",
    year: "July 2025",
    company: "Samrisa Infotech",
    skills: [".Net", "Node.js", "Kubernetes", "AWS", "Microservices"],
  },
  {
    id: 2,
    title: "Software Developer Trainee",
    desc: "Built scalable REST and GraphQL APIs handling 10M+ requests/day, implemented caching strategies and database optimization.",
    className: "md:col-span-2",
    thumbnail: "/casepoint.svg",
    year: "Jan 2025",
    company: "Casepoint Pvt Ltd.",
    skills: ["GraphQL", "Redis", "PostgreSQL", "Docker"],
  },
  {
    id: 3,
    title: "Aspiring SDE",
    desc: "Building personal projects and contributing to open source. Developing end-to-end features across the stack, from database design to frontend implementation, with a focus on performance, scalable architecture, and preparing for SDE responsibilities.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    year: "Jun 2022",
    company: "Self-Learning & Projects",
    skills: ["React", "TypeScript", "MongoDB", "Express"],
  },
  {
    id: 4,
    title: "Bachelor's in Computer Science",
    desc: "Completed a Bachelor of Computer Science with emphasis on distributed systems, algorithms, and software engineering. Capstone project involved designing and implementing a scalable microservices architecture; coursework included Operating Systems, Databases, and Advanced Algorithms.",
    className: "md:col-span-2",
    thumbnail: "/parul-logo.png",
    year: "Sep 2021",
    company: "Parul University",
    skills: ["React", "TypeScript", "MongoDB", "Express"],
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];

export const leetcode = {
  username: "Tachyon Tracer",
  link: "https://leetcode.com/TachyonTracer/",
  totalSolved: 512,
  easy: 230,
  medium: 240,
  hard: 42,
  topTags: [
    "Algorithms",
    "Divide and Conquer",
    "Hash Table",
    "Dynamic Programming",
    "Graphs",
  ],
  featuredProblems: [
    {
      title: "Longest Increasing Subsequence",
      url: "https://leetcode.com/problems/longest-increasing-subsequence/",
    },
    { title: "Word Ladder", url: "https://leetcode.com/problems/word-ladder/" },
    {
      title: "Number of Islands",
      url: "https://leetcode.com/problems/number-of-islands/",
    },
  ],
};
