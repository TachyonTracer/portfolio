export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
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
    title: "I work across the full stack with modern technologies",
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
    title: "Distributed Task Queue System",
    des: "High-performance task queue with Redis backend, supporting priority scheduling, retries, and horizontal scaling for processing millions of jobs.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "/github.com",
  },
  {
    id: 2,
    title: "Real-Time Analytics Platform",
    des: "Microservices-based analytics engine processing streaming data with Kafka, featuring custom aggregation pipelines and sub-second query performance.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "/github.com",
  },
  {
    id: 3,
    title: "GraphQL API Gateway",
    des: "Unified API gateway with schema stitching, authentication middleware, rate limiting, and comprehensive monitoring for multiple backend services.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "/github.com",
  },
  {
    id: 4,
    title: "CLI DevOps Toolkit",
    des: "Command-line tool for automating deployment workflows, infrastructure provisioning, and CI/CD pipeline management with multi-cloud support.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "/github.com",
  },
];

export const testimonials = [
  {
    quote:
      "Outstanding engineer who delivered a complex distributed system ahead of schedule. Their deep understanding of system architecture and ability to optimize for scale was impressive. The codebase is clean, well-documented, and maintainable.",
    name: "Sarah Chen",
    title: "CTO at DataFlow Systems",
  },
  {
    quote:
      "Exceptional problem-solver with strong technical skills across the entire stack. They refactored our legacy monolith into microservices, improving performance by 60% while maintaining zero downtime during migration.",
    name: "Marcus Rodriguez",
    title: "Engineering Manager at CloudScale",
  },
  {
    quote:
      "Rare combination of technical depth and pragmatic thinking. They built our API infrastructure from scratch with proper testing, monitoring, and documentation. The system has been rock-solid in production.",
    name: "Emily Watson",
    title: "VP Engineering at TechVentures",
  },
  {
    quote:
      "Brilliant architect who designed our event-driven system handling millions of transactions daily. Their expertise in distributed systems and attention to edge cases prevented countless production issues.",
    name: "David Kim",
    title: "Lead Architect at FinTech Solutions",
  },
  {
    quote:
      "Top-tier developer with excellent communication skills. They not only delivered high-quality code but also mentored junior developers and improved our entire development workflow with better tooling and practices.",
    name: "Jennifer Martinez",
    title: "Director of Engineering at StartupHub",
  },
];

export const companies = [
  {
    id: 1,
    name: "AWS",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "PostgreSQL",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "Kubernetes",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "Redis",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "Docker",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Senior Software Engineer",
    desc: "Architected and implemented microservices infrastructure, reducing system latency by 40% and improving deployment frequency.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
    year: "Jan 2023",
    company: "TechCorp Inc.",
    skills: ["Node.js", "Kubernetes", "AWS", "Microservices"],
  },
  {
    id: 2,
    title: "Backend Engineer - Tech Startup",
    desc: "Built scalable REST and GraphQL APIs handling 10M+ requests/day, implemented caching strategies and database optimization.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
    year: "Mar 2021",
    company: "StartupHub",
    skills: ["GraphQL", "Redis", "PostgreSQL", "Docker"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    desc: "Developed end-to-end features across the stack, from database design to frontend implementation, with focus on performance and UX.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    year: "Jun 2019",
    company: "Digital Solutions",
    skills: ["React", "TypeScript", "MongoDB", "Express"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    desc: "Automated CI/CD pipelines, managed cloud infrastructure with IaC, and implemented monitoring solutions for production systems.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    year: "Feb 2018",
    company: "CloudScale",
    skills: ["Terraform", "Jenkins", "Prometheus", "Ansible"],
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
