import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "@/data/projectDetails";

const BASE_URL = "https://dhirendrasinghdhami.com.np";

const socialLinks = [
	{ href: "https://github.com/dhirendraxd", label: "GitHub", icon: FaGithub, color: "text-[#181717]" },
	{ href: "https://instagram.com/dhirendraxd", label: "Instagram", icon: FaInstagram, color: "text-[#E4405F]" },
	{ href: "https://linkedin.com/in/dhirendraxd", label: "LinkedIn", icon: FaLinkedinIn, color: "text-[#0A66C2]" },
];

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
	const detailRows = [
		{ label: "Service", value: project.category },
		{ label: "Timeline", value: project.date },
		{ label: "Location", value: location },
	];

	return (
		<div className="min-h-screen bg-[#f5f1eb] text-[#3a3a3a] font-rajdhani">
			<main className="mx-auto max-w-[84rem] px-6 pb-10 pt-5 sm:px-8 lg:px-12">
				<header className="flex flex-wrap items-center justify-between gap-3">
					<button type="button" onClick={() => navigate(-1)} className="group inline-flex items-center gap-2 border-b border-transparent py-2 text-[0.78rem] font-medium text-[#3f3932] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]">
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
						<h1 className="max-w-[52rem] break-words text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[#3a3a3a]">
							{project.title}
							<span className="mt-3 block text-[0.34em] font-normal tracking-[-0.02em] text-[#7A3A30] sm:ml-3 sm:mt-0 sm:inline">/Real Project</span>
						</h1>
						<p className="mt-8 max-w-[37rem] text-[1rem] leading-[1.6] text-[#6f655a] sm:text-[1.1rem]">{project.summary}</p>
						<div className="mt-8 flex flex-wrap gap-3">
							{project.sourceHref && (
								<a href={project.sourceHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#3a3a3a] px-5 py-3 text-[0.8rem] font-medium text-[#f5f1eb] transition-colors hover:bg-[#7A3A30]">
									Live Preview <ArrowUpRight size={14} />
								</a>
							)}
							<a href="/#contact" className="inline-flex items-center gap-2 border border-[#d4cbc0] bg-transparent px-5 py-3 text-[0.8rem] font-medium text-[#3a3a3a] transition-colors hover:border-[#7A3A30] hover:text-[#7A3A30]">
								Contact Me <ExternalLink size={13} />
							</a>
						</div>
					</div>

					<aside className="flex flex-wrap gap-x-10 gap-y-8 md:flex-nowrap md:flex-col md:items-end md:justify-end md:gap-8 lg:gap-10 lg:pb-1">
						{detailRows.map((row) => (
							<div key={row.label} className="text-left md:text-right">
								<p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#a89f96]">{row.label}</p>
								<p className="mt-3 max-w-[12rem] text-[1rem] font-medium leading-tight text-[#3a3a3a]">{row.value}</p>
							</div>
						))}
					</aside>
				</section>

				<footer className="mt-20 border-t border-[#8b8377]/80 pt-4 pb-2">
					<div className="flex items-center justify-center gap-6">
						{socialLinks.map(({ href, label, icon: Icon, color }) => (
							<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`transition-opacity hover:opacity-60 ${color}`}>
								<Icon size={20} />
							</a>
						))}
					</div>
				</footer>
			</main>
		</div>
	);
};

export default ProjectDetail;
