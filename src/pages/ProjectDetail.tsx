import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Code2, Database, ExternalLink, Globe2, Megaphone, Users } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "@/data/projectDetails";
import SvglIcon from "@/components/SvglIcon";

const BASE_URL = "https://dhirendrasinghdhami.com.np";

const socialLinks = [
	{ href: "https://github.com/dhirendraxd", label: "GitHub", color: "text-[#181717]" },
	{ href: "https://instagram.com/dhirendraxd", label: "Instagram", color: "text-[#E4405F]" },
	{ href: "https://linkedin.com/in/dhirendraxd", label: "LinkedIn", color: "text-[#0A66C2]" },
];

const technologyIcons = [Code2, Globe2, Database];
const communityIcons = [Users, Megaphone, Globe2];
const svglTechnologyNames: Record<string, string> = {
	React: "React",
	TypeScript: "TypeScript",
	JavaScript: "JavaScript",
	Firebase: "Firebase",
	Supabase: "Supabase",
	"Node.js": "Node.js",
	Vite: "Vite",
	"Next.js": "Next.js",
	GitHub: "GitHub",
	Analytics: "Google Analytics",
};

const ProjectDetail = () => {
	const { slug } = useParams<{ slug: string }>();
	const project = slug ? getProjectBySlug(slug) : undefined;
	const navigate = useNavigate();

	useEffect(() => {
		if (!project) return;

		const projectUrl = `${BASE_URL}/projects/${project.slug}`;
		const pageTitle = `${project.title} | Project Case Study | Dhirendra Singh Dhami`;
		const previousTitle = document.title;
		const descriptionTag = document.head.querySelector('meta[name="description"]');
		const previousDescription = descriptionTag?.getAttribute("content") ?? "";
		const canonical = document.head.querySelector('link[rel="canonical"]');
		const previousCanonical = canonical?.getAttribute("href") ?? "";

		document.title = pageTitle;
		if (descriptionTag) descriptionTag.setAttribute("content", project.summary);
		if (canonical) canonical.setAttribute("href", projectUrl);

		return () => {
			document.title = previousTitle;
			if (descriptionTag) descriptionTag.setAttribute("content", previousDescription);
			if (canonical) canonical.setAttribute("href", previousCanonical || BASE_URL);
		};
	}, [project]);

	if (!project) {
		return <Navigate to="/projects" replace />;
	}

	const location = project.serviceSlug === "advocacy-community" ? "Nepal" : "Remote";
	const isTechProject = project.serviceSlug === "tech-projects";
	const isCommunityProject = project.serviceSlug === "advocacy-community";
	const livePreviewHref = project.sourceHref ?? `/projects/${project.slug}`;
	const titleWords = project.title.split(" ");
	const titleFirstLine = titleWords.slice(0, 4).join(" ");
	const titleSecondLine = titleWords.slice(4).join(" ");
	const detailRows = [
		{ label: "Service", value: project.category },
		{ label: "Timeline", value: project.date },
		{ label: "Location", value: location },
	];

	return (
		<div className="min-h-screen bg-[#f5f1eb] text-[#3a3a3a] font-rajdhani">
			<main className="mx-auto max-w-[84rem] px-6 pb-10 pt-5 sm:px-8 lg:px-12">
				<header className="relative top-4 flex flex-wrap items-center justify-between gap-3">
					<button type="button" onClick={() => navigate(-1)} className="group inline-flex items-center gap-2 border-b border-transparent py-2 text-[0.78rem] font-medium text-[#3f3932] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] focus-visible:ring-offset-2">
						<ArrowLeft size={14} />
						Back
					</button>
					<div className="inline-flex items-center gap-2 py-2 text-right text-[0.72rem] text-[#6f655a]">
						<span className="h-2 w-2 bg-[#7A3A30]" aria-hidden="true" />
						Available for New Project
					</div>
				</header>

				<section className="grid gap-12 pb-16 pt-20 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:pt-24">
					<div>
						<div className="mb-6 flex flex-wrap gap-2">
							<span className="bg-[#2d2a28] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#f5f1eb]">{project.category}</span>
							<span className="border border-[#d4cbc0] px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-[#6f655a]">Real Project</span>
						</div>
						<h1 className="max-w-[52rem] break-words text-[clamp(2.4rem,4.5vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.04em] text-[#3a3a3a]">
							<span className="block font-semibold">{titleFirstLine}</span>
							<span className="mt-3 block text-[0.78em] font-normal">
								{titleSecondLine}
								{titleSecondLine && " "}
								<span className="text-[0.34em] font-normal tracking-[-0.02em] text-[#7A3A30]">/Real Project</span>
							</span>
						</h1>
						<p className="mt-8 max-w-[37rem] text-[1rem] leading-[1.6] text-[#6f655a] sm:text-[1.1rem]">{project.summary}</p>
						<div className="mt-8 flex flex-wrap gap-3">
							{(isTechProject || (project.sourceHref && !isCommunityProject)) && (
								<a href={livePreviewHref} target={project.sourceHref ? "_blank" : undefined} rel={project.sourceHref ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 bg-[#3a3a3a] px-5 py-3 text-[0.8rem] font-medium text-[#f5f1eb] transition-colors hover:bg-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] focus-visible:ring-offset-2">
									Live Preview <ArrowUpRight size={14} />
								</a>
							)}
							<a href="/#contact" className="inline-flex items-center gap-2 border border-[#d4cbc0] bg-transparent px-5 py-3 text-[0.8rem] font-medium text-[#3a3a3a] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] focus-visible:ring-offset-2">
								Contact Me <ExternalLink size={13} />
							</a>
						</div>
					</div>

					<aside className="flex flex-wrap gap-x-10 gap-y-8 md:flex-nowrap md:flex-col md:items-end md:justify-end md:gap-8 lg:gap-10 lg:pb-1">
						{isTechProject && (
							<div className="flex flex-col gap-3 text-left md:items-end md:text-right">
								<p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[#7A3A30]">Technologies</p>
								<div className="flex items-center gap-3">
									{project.tags.slice(0, 3).map((tag, index) => {
										const TechnologyIcon = technologyIcons[index];
										const svglName = svglTechnologyNames[tag];
										return (
											<span key={tag} title={tag} aria-label={tag} className="flex h-10 w-10 items-center justify-center border border-[#d4cbc0] text-[#7A3A30]">
												{svglName ? (
													<SvglIcon name={svglName} alt="" className="h-[18px] w-[18px]" fallback={<TechnologyIcon size={18} strokeWidth={1.7} aria-hidden="true" />} />
												) : (
													<TechnologyIcon size={18} strokeWidth={1.7} aria-hidden="true" />
												)}
											</span>
										);
									})}
								</div>
							</div>
						)}
						{isCommunityProject && (
							<div className="flex flex-col gap-3 text-left md:items-end md:text-right">
								<p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[#7c7167]">Focus Areas</p>
								<div className="flex items-center gap-3">
									{project.tags.slice(0, 3).map((tag, index) => {
										const FocusIcon = communityIcons[index];
										const svglName = svglTechnologyNames[tag];
										return (
											<span key={tag} title={tag} aria-label={tag} className="flex h-10 w-10 items-center justify-center border border-[#d4cbc0] text-[#7A3A30]">
												{svglName ? (
													<SvglIcon name={svglName} alt="" className="h-[18px] w-[18px]" fallback={<FocusIcon size={18} strokeWidth={1.7} aria-hidden="true" />} />
												) : (
													<FocusIcon size={18} strokeWidth={1.7} aria-hidden="true" />
												)}
											</span>
										);
									})}
								</div>
							</div>
						)}
						{detailRows.map((row) => (
							<div key={row.label} className="text-left md:text-right">
								<p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[#7c7167]">{row.label}</p>
								<p className="mt-3 max-w-[12rem] text-[1.1rem] font-medium leading-tight text-[#3a3a3a]">{row.value}</p>
							</div>
						))}
					</aside>
				</section>

				<footer className="mt-12 pt-3 pb-1">
					<div className="h-px w-full bg-gradient-to-r from-transparent via-[#8b8377]/40 to-transparent" aria-hidden="true" />
					<div className="mt-2 flex items-center justify-center gap-5">
										{socialLinks.map(({ href, label, color }) => (
							<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`inline-flex h-6 w-6 items-center justify-center transition-opacity hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] focus-visible:ring-offset-2 ${color}`}>
												<SvglIcon name={label} alt="" className="h-[17px] w-[17px]" fallback={<span className="text-[9px] font-bold" aria-hidden="true">{label.slice(0, 1)}</span>} />
							</a>
						))}
					</div>
				</footer>
			</main>
		</div>
	);
};

export default ProjectDetail;
