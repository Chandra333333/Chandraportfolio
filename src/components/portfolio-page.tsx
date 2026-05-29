"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AtSign,
  ArrowUp,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  FolderGit2,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  MoonStar,
  Rocket,
  SunMedium,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Research" },
  { id: "contact", label: "Contact" },
];

const STAT_CARDS = [
  { label: "LeetCode Problems", value: "200+" },
  { label: "CGPA", value: "8.65" },
  { label: "Internships", value: "2" },
  { label: "Major Projects", value: "4+" },
  { label: "IEEE Publication", value: "1" },
];

const SKILL_GROUPS = [
  {
    name: "Programming",
    skills: [
      { skill: "Java", level: 94 },
      { skill: "Python", level: 88 },
      { skill: "SQL", level: 86 },
      { skill: "JavaScript", level: 84 },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { skill: "Spring Boot", level: 92 },
      { skill: "Flask", level: 86 },
      { skill: "Selenium", level: 82 },
      { skill: "Firebase", level: 80 },
    ],
  },
  {
    name: "Computer Science",
    skills: [
      { skill: "Data Structures", level: 92 },
      { skill: "Algorithms", level: 90 },
      { skill: "DBMS", level: 88 },
      { skill: "Operating Systems", level: 84 },
      { skill: "Computer Networks", level: 82 },
      { skill: "OOP", level: 93 },
    ],
  },
  {
    name: "Data & Analytics",
    skills: [
      { skill: "Data Mining", level: 80 },
      { skill: "Web Scraping", level: 86 },
      { skill: "Data Cleaning", level: 82 },
      { skill: "Excel", level: 85 },
      { skill: "Pandas", level: 84 },
      { skill: "Matplotlib", level: 81 },
    ],
  },
  {
    name: "Other",
    skills: [
      { skill: "Cloud Computing", level: 87 },
      { skill: "REST APIs", level: 90 },
      { skill: "Problem Solving", level: 95 },
      { skill: "Team Collaboration", level: 89 },
    ],
  },
];

const INTERNSHIPS = [
  {
    company: "Bluestock Technologies",
    role: "Full Stack Developer Intern",
    highlights: [
      "Developed a financial analytics platform for actionable portfolio insights.",
      "Built dashboard experiences with high signal visualizations.",
      "Integrated REST APIs and optimized SQL and MongoDB data flows.",
      "Delivered both frontend and backend features in agile iterations.",
    ],
  },
  {
    company: "Agnirva Space",
    role: "Cloud Computing & AI Intern",
    highlights: [
      "Designed cloud-first solutions for scalable workloads.",
      "Integrated AI modules into automation systems.",
      "Contributed to software architecture focused on performance and reliability.",
      "Collaborated across teams to ship production-grade prototypes.",
    ],
  },
];

const PROJECTS = [
  {
    name: "StudyTube",
    category: "Backend",
    description:
      "Distraction-free educational platform that filters noisy content and personalizes learning pathways.",
    features: [
      "YouTube filtering",
      "Web scraping",
      "Learning recommendations",
      "Analytics dashboard",
    ],
    tech: ["Flask", "Selenium", "Python", "HTML", "CSS", "JavaScript"],
  },
  {
    name: "Fitness Band with Stress & Dehydration Detection",
    category: "IoT",
    description:
      "Smart wearable IoT system for stress and hydration monitoring with intelligent alerting.",
    features: [
      "Sensor integration",
      "Firebase cloud",
      "Machine Learning",
      "Android app and real-time notifications",
    ],
    tech: ["IoT", "Firebase", "Android", "Embedded C", "ML"],
  },
  {
    name: "Digital Complaint Management and Grievance Portal",
    category: "Full Stack",
    description: "Enterprise-grade grievance portal with analytics and lifecycle management.",
    features: [
      "Role-based access",
      "Complaint tracking",
      "Dashboard analytics",
      "Workflow management",
    ],
    tech: ["Angular", "Node.js", "Express.js", "MySQL"],
  },
  {
    name: "Real-Time Adaptive Access Control System",
    category: "Security",
    description:
      "Cybersecurity platform using behavioral analytics for dynamic access control in IoT and cloud environments.",
    features: [
      "Dynamic access control",
      "Risk scoring",
      "AI behavior monitoring",
      "IoT security",
    ],
    tech: ["Java", "Spring Boot", "AI", "Cloud Computing"],
  },
];

const PUBLICATIONS = [
  "Real Time Adaptive Access Control with Behavioral Analytics for Enhanced Cybersecurity in IoT and Cloud Systems",
  "Designing a Power Bank from E-Waste and Used Batteries",
];

const CERTIFICATIONS = [
  "Deloitte Technology Job Simulation",
  "Microsoft Career Essentials in Software Development",
  "NPTEL Technical Programming Workshop",
  "Design and Analysis of Algorithms (CodeChef)",
];

const ACHIEVEMENTS = [
  "Solved 200+ LeetCode Problems",
  "IEEE Research Publication",
  "NPTEL Motivated Learner Award",
  "Multiple Technical Certifications",
  "Hackathon Participation",
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/chandra-sekhar-yamparala",
    icon: AtSign,
  },
  {
    name: "GitHub",
    href: "https://github.com/chandrasekharyamparala",
    icon: FolderGit2,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/chandrasekharyamparala",
    icon: Code2,
  },
  {
    name: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/user/chandrasekharyamparala",
    icon: Link2,
  },
];

const TYPING_PHRASES = [
  "Java Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Cloud & AI Enthusiast",
];

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label="Toggle theme"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full"
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  );
}

function CursorGlow({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-50 h-10 w-10 rounded-full border border-white/40 bg-white/20 mix-blend-difference backdrop-blur-sm"
      animate={{ x: x - 20, y: y - 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.4 }}
    />
  );
}

export default function PortfolioPage() {
  const [typedText, setTypedText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [visitorCount, setVisitorCount] = useState(1);
  const [chartReady, setChartReady] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [githubRepos, setGithubRepos] = useState<
    Array<{
      id: number;
      name: string;
      description: string | null;
      stargazers_count: number;
      html_url: string;
      language: string | null;
      forks_count: number;
    }>
  >([]);
  const [leetcode, setLeetcode] = useState({ solved: 200, ranking: "Top 20%", acceptanceRate: "73%" });

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    if (!currentPhrase) {
      return;
    }

    if (typedIndex <= currentPhrase.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedIndex));
        setTypedIndex((value) => value + 1);
      }, 90);
      return () => clearTimeout(timeout);
    }

    const pause = setTimeout(() => {
      setTypedIndex(0);
      setPhraseIndex((value) => (value + 1) % TYPING_PHRASES.length);
    }, 1200);

    return () => clearTimeout(pause);
  }, [phraseIndex, typedIndex]);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? (top / height) * 100 : 0);
      setShowTop(top > 500);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const key = "chandra-portfolio-visitor-count";
    const current = Number(localStorage.getItem(key) ?? "0") + 1;
    localStorage.setItem(key, String(current));
    setVisitorCount(current);
    setChartReady(true);
  }, []);

  useEffect(() => {
    async function loadIntegrations() {
      try {
        const [repoResponse, leetResponse] = await Promise.all([
          fetch("/api/github?username=chandrasekharyamparala", { cache: "no-store" }),
          fetch("/api/leetcode?username=chandrasekharyamparala", { cache: "no-store" }),
        ]);

        const repoData = (await repoResponse.json()) as { repos?: typeof githubRepos };
        const leetData = (await leetResponse.json()) as typeof leetcode;

        if (repoData.repos && Array.isArray(repoData.repos)) {
          setGithubRepos(repoData.repos);
        }

        if (leetData.solved) {
          setLeetcode(leetData);
        }
      } catch {
        // Keep graceful fallback values when APIs are unavailable.
      }
    }

    void loadIntegrations();
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, index) => ({
        id: index,
        left: `${(index * 13) % 100}%`,
        delay: (index * 0.15) % 3,
        duration: 7 + (index % 5),
        size: 4 + (index % 5),
      })),
    []
  );

  const projectFilters = ["All", "Backend", "IoT", "Full Stack", "Security"];

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  const chartData = SKILL_GROUPS.flatMap((group) =>
    group.skills.slice(0, 4).map((item) => ({
      category: `${group.name.split(" ")[0]}-${item.skill}`,
      score: item.level,
    }))
  ).slice(0, 10);

  const contributionCells = useMemo(
    () =>
      Array.from({ length: 84 }).map((_, index) => {
        const value = ((index * 17 + visitorCount * 3) % 100) + 1;
        return value;
      }),
    [visitorCount]
  );

  const onSubmitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "Portfolio Contact");
    const message = String(formData.get("message") ?? "");

    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:yemparala1234@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div className="relative overflow-x-hidden">
      <CursorGlow x={cursor.x} y={cursor.y} />

      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <motion.div
          className="h-full bg-[linear-gradient(90deg,var(--brand-1),var(--brand-2),var(--brand-3))]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="font-display text-lg font-semibold">Chandra Sekhar Yamparala</p>
            <p className="text-xs text-muted-foreground">Software Engineer Portfolio</p>
          </div>
          <nav className="hidden items-center gap-5 md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-muted-foreground transition hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="hero-grid absolute inset-0" />
            <div className="hero-aurora absolute inset-x-[-20%] top-[-20%] h-[500px]" />
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute rounded-full bg-white/30"
                style={{
                  left: particle.left,
                  width: particle.size,
                  height: particle.size,
                  top: "80%",
                }}
                animate={{ y: [-30, -420], opacity: [0, 0.7, 0] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle.delay,
                  duration: particle.duration,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:px-8 md:py-20">
            <div className="space-y-7">
              <Badge variant="outline" className="rounded-full border-brand/30 bg-card/50 px-4 py-1 text-xs uppercase tracking-[0.2em]">
                Final-Year Computer Science Engineer
              </Badge>
              <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Building Scalable Software Solutions with Java, Spring Boot, Cloud &amp; AI
              </h1>
              <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                Final-Year Computer Science Student passionate about Backend Development, Cloud
                Computing, Problem Solving, Artificial Intelligence and Building Impactful Software
                Products.
              </p>
              <p className="font-display text-xl text-brand">{typedText}<span className="blink">|</span></p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="/resume/Chandra_Sekhar_Yamparala_Resume.txt" download>
                    Download Resume
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href="#contact">Contact Me</a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
                  <p className="text-2xl font-bold">{leetcode.solved}+</p>
                  <p className="text-xs text-muted-foreground">LeetCode Solved</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
                  <p className="text-2xl font-bold">{leetcode.acceptanceRate}</p>
                  <p className="text-xs text-muted-foreground">Acceptance</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
                  <p className="text-2xl font-bold">India</p>
                  <p className="text-xs text-muted-foreground">Location</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/50 p-4">
                  <p className="text-2xl font-bold">#{visitorCount}</p>
                  <p className="text-xs text-muted-foreground">Visitor Counter</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_45%)]" />
                <div className="relative space-y-6">
                  <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border border-white/40 shadow-xl">
                    <Image
                      src="/images/profile.jpg"
                      alt="Chandra Sekhar Yamparala"
                      width={144}
                      height={144}
                      className="h-36 w-36 object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-2 text-center">
                    <h2 className="font-display text-2xl font-semibold">Chandra Sekhar Yamparala</h2>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer | Java Developer | Full Stack Developer | Problem Solver
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> B.Tech Computer Science</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> India</p>
                    <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> yemparala1234@gmail.com</p>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {SOCIAL_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.name}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-border/60 bg-background/60 p-2.5 transition hover:-translate-y-0.5"
                          aria-label={link.name}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center gap-3">
            <BrainCircuit className="h-5 w-5 text-brand" />
            <h2 className="font-display text-3xl font-semibold">About Me</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
            <Card className="p-6 md:p-8">
              <p className="text-base leading-8 text-muted-foreground">
                I am a final-year Computer Science student at Kalasalingam Academy of Research and
                Education (CGPA: 8.65, expected graduation 2026) with a strong foundation in Java,
                systems thinking, and software architecture. My journey is driven by building
                reliable backend systems, solving algorithmic problems, and translating ideas into
                products people can trust.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                With 200+ LeetCode problems solved, internship experience in full-stack and cloud/AI
                domains, and an IEEE research publication, I bring execution depth and engineering
                discipline. I enjoy team collaboration, rapid learning, and creating software that
                is scalable, maintainable, and impactful.
              </p>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2">
              {STAT_CARDS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl border border-border/70 bg-card/60 p-4"
                >
                  <p className="font-display text-2xl font-bold text-brand">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center gap-3">
            <Code2 className="h-5 w-5 text-brand" />
            <h2 className="font-display text-3xl font-semibold">Technical Skills</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {SKILL_GROUPS.map((group) => (
                <Card key={group.name}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.skills.map((item) => (
                      <div key={item.skill} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.skill}</span>
                          <span className="text-muted-foreground">{item.level}%</span>
                        </div>
                        <Progress value={item.level} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Skill Chart</CardTitle>
                <CardDescription>Capability distribution across key domains</CardDescription>
              </CardHeader>
              <CardContent className="h-[360px]">
                {chartReady ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 16 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="category"
                        tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                        angle={-35}
                        interval={0}
                        textAnchor="end"
                        height={72}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <Tooltip cursor={{ fill: "var(--accent)" }} />
                      <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="url(#skillGradient)" />
                      <defs>
                        <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="var(--brand-1)" />
                          <stop offset="100%" stopColor="var(--brand-2)" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading chart...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="experience" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 text-brand" />
            <h2 className="font-display text-3xl font-semibold">Internship Experience</h2>
          </div>
          <div className="relative pl-6 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-border">
            {INTERNSHIPS.map((internship, index) => (
              <div key={internship.company} className="relative mb-8">
                <span className="absolute -left-[1.1rem] top-2 h-3 w-3 rounded-full bg-brand" />
                <Card>
                  <CardHeader>
                    <CardTitle>{internship.company}</CardTitle>
                    <CardDescription>{internship.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {internship.highlights.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                {index !== INTERNSHIPS.length - 1 && <div className="h-3" />}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-brand" />
              <h2 className="font-display text-3xl font-semibold">Projects</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card key={project.name} className="group transition duration-300 hover:-translate-y-1 hover:border-brand/40">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <CardDescription className="text-sm leading-7">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="mb-2 text-sm font-medium">Features</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((stack) => (
                      <Badge key={stack}>{stack}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center gap-3">
            <FolderGit2 className="h-5 w-5 text-brand" />
            <h2 className="font-display text-3xl font-semibold">GitHub & LeetCode Integration</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr,1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Recent GitHub Repositories</CardTitle>
                <CardDescription>Live integration from GitHub API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {githubRepos.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Add your exact GitHub username in the API query to display live repositories.
                  </p>
                )}
                {githubRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-border/70 bg-background/60 p-4 transition hover:border-brand/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{repo.name}</p>
                      <p className="text-xs text-muted-foreground">{repo.language ?? "Code"}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {repo.description ?? "No description provided."}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      ⭐ {repo.stargazers_count} • Forks {repo.forks_count}
                    </p>
                  </a>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>LeetCode Stats</CardTitle>
                  <CardDescription>Live + fallback resilient integration</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                    <p className="text-2xl font-bold text-brand">{leetcode.solved}+</p>
                    <p className="text-xs text-muted-foreground">Solved</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                    <p className="text-2xl font-bold text-brand">{leetcode.ranking}</p>
                    <p className="text-xs text-muted-foreground">Rank</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                    <p className="text-2xl font-bold text-brand">{leetcode.acceptanceRate}</p>
                    <p className="text-xs text-muted-foreground">Acceptance</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contribution Heatmap</CardTitle>
                  <CardDescription>Interactive activity visual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-12 gap-1">
                    {contributionCells.map((cell, index) => (
                      <div
                        key={index}
                        className="h-3 rounded-[4px]"
                        style={{
                          backgroundColor:
                            cell > 75
                              ? "color-mix(in srgb, var(--brand-2) 90%, white)"
                              : cell > 45
                                ? "color-mix(in srgb, var(--brand-2) 55%, white)"
                                : "color-mix(in srgb, var(--brand-2) 20%, transparent)",
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="publications" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center gap-3">
            <Cloud className="h-5 w-5 text-brand" />
            <h2 className="font-display text-3xl font-semibold">Research & Publications</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {PUBLICATIONS.map((paper) => (
              <Card key={paper} className="relative overflow-hidden">
                <div className="absolute right-4 top-4 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[10px] tracking-[0.15em] text-muted-foreground">
                  IEEE STYLE
                </div>
                <CardHeader>
                  <CardTitle className="pr-20 text-xl">{paper}</CardTitle>
                  <CardDescription>Publication Track</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {CERTIFICATIONS.map((item) => (
                  <div key={item} className="rounded-xl border border-border/70 bg-background/60 p-4 text-sm">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {ACHIEVEMENTS.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 p-4 text-sm">
                    <span aria-hidden="true">🏆</span>
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
          <div className="mb-10 flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-brand" />
            <h2 className="font-display text-3xl font-semibold">Contact</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr,1.15fr]">
            <Card>
              <CardHeader>
                <CardTitle>Let&apos;s Build Something Impactful</CardTitle>
                <CardDescription>
                  Open to software engineering opportunities, internships, and collaborations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p><strong>Email:</strong> yemparala1234@gmail.com</p>
                <p><strong>Location:</strong> India</p>
                <p><strong>Education:</strong> B.Tech Computer Science, Kalasalingam Academy of Research and Education (CGPA 8.65, 2026)</p>
                <div className="flex gap-2 pt-2">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Button key={link.name} asChild variant="outline" size="sm">
                        <a href={link.href} target="_blank" rel="noreferrer">
                          <Icon className="mr-1 h-3.5 w-3.5" /> {link.name}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>Send a message directly from your email client.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={onSubmitContact}>
                  <Input name="name" placeholder="Name" required />
                  <Input name="email" type="email" placeholder="Email" required />
                  <Input name="subject" placeholder="Subject" required />
                  <Textarea name="message" placeholder="Message" required />
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background/80">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Chandra Sekhar Yamparala. Crafted with Next.js 15, TypeScript, Tailwind, Framer Motion and shadcn-style UI.</p>
          <p>Engineered for premium recruiter-first impact.</p>
        </div>
      </footer>

      {showTop && (
        <Button
          className="fixed bottom-6 right-6 z-40 rounded-full"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
