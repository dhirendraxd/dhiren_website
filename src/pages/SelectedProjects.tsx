import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { issueHiveThumbnail, projectDetails } from "@/data/projectDetails";

const sections = [
	{
		slug: "advocacy-community" as const,
		label: "Advocacy & Community",
		description: "Fellowship programs, civic initiatives, and community labs.",
	},
	{
		slug: "tech-projects" as const,
		label: "Tech Projects",
		description: "Platforms, prototypes, and hackathon builds.",
	},
];


const projectsSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	name: "Projects | Dhirendra Singh Dhami",
	description: "A focused collection of Dhiren's featured projects.",
	url: "https://dhirendrasinghdhami.com.np/projects",
	isPartOf: {
		"@type": "WebSite",
		name: "Dhirendra Singh Dhami Portfolio",
		url: "https://dhirendrasinghdhami.com.np/",
	},
};

const ProjectCard = ({
	project,
	index,
	sectionLabel,
}: {
	project: (typeof projectDetails)[number];
	index: number;
	sectionLabel: string;
}) => {
	const hasImage = Boolean(project.image);

	return (
		<article className="group relative overflow-hidden border border-[#e8e0d6] transition-colors duration-300 hover:border-[#c5bbb2]">
			{/* Top accent line on hover */}
			<span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#7A3A30] transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />

			<Link to={`/projects/${project.slug}`} className="block">
				{/* Image */}
				<div className="relative overflow-hidden">
					{hasImage ? (
						<img
							src={project.image}
							alt={`${project.title} preview`}
							loading="lazy"
							decoding="async"
							width={960}
							height={640}
							className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
						/>
					) : (
						<div className="flex aspect-[4/3] w-full items-end p-5 bg-[linear-gradient(135deg,#f0e8de_0%,#e0d0be_100%)]">
							<div className="text-xl font-semibold leading-tight text-[#3a3a3a]">{project.title}</div>
						</div>
					)}

					{/* Index — top right */}
					<span className="absolute right-3 top-3 font-mono text-[0.58rem] tabular-nums text-white/45 select-none">
						{String(index + 1).padStart(2, "0")}
					</span>
				</div>

				{/* Content */}
				<div className="px-3.5 py-3 flex items-center justify-between gap-2">
					<div className="min-w-0">
						<h3 className="truncate text-[0.95rem] font-bold tracking-tight text-[#3a3a3a] transition-colors duration-200 group-hover:text-[#7A3A30]">
							{project.title}
						</h3>
						<div className="mt-0.5 flex items-center gap-1.5">
							{project.tags.slice(0, 2).map((tag, i) => (
								<span key={tag} className="inline-flex items-center gap-1.5">
									<span className="text-[0.53rem] font-semibold uppercase tracking-[0.1em] text-[#a89f96]">{tag}</span>
									{i === 0 && project.tags.length > 1 && <span className="text-[#d0c9c0]" aria-hidden="true">·</span>}
								</span>
							))}
						</div>
					</div>
					<ArrowUpRight size={13} className="shrink-0 text-[#c4bab2] transition-colors duration-300 group-hover:text-[#7A3A30]" />
				</div>
			</Link>
		</article>
	);
};

const ProjectsPage = () => {
	const featuredImage = projectDetails.find((p) => p.image)?.image ?? issueHiveThumbnail;

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,250,244,0.9),_transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#efe6d8_100%)] text-[#3a3a3a]">
			<Seo
				title="Projects | Dhirendra Singh Dhami"
				description="A focused collection of Dhiren's featured projects with direct links to the case studies."
				canonicalPath="/projects"
				image={featuredImage}
				imageAlt="Featured project preview for Dhirendra Singh Dhami"
				schema={projectsSchema}
			/>
			<ScrollProgressBar />

			<main className="mx-auto max-w-[84rem] px-6 py-6 font-rajdhani sm:px-8 lg:px-12 lg:py-8">
				<motion.div
					className="pt-6 sm:pt-10"
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: "easeOut" }}
				>
					{/* Nav */}
					<Link
						to="/"
						className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#4c4238] transition-colors hover:text-[#7A3A30]"
					>
						<ChevronLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
						<span className="border-b border-transparent transition-colors group-hover:border-[#7A3A30]">Home</span>
					</Link>

					{/* Hero */}
					<div className="mt-10 border-b border-[#ddd3c7] pb-10">
						<p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A3A30]">Selected Work</p>
						<div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
							<h1 className="text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-[#3a3a3a] max-w-xl">
								A few things<br />I've built.
							</h1>
							<p className="max-w-[30ch] text-[0.93rem] leading-[1.75] text-[#6f655a] md:text-right">
								Community programs, platform concepts, and a campus tool that won an award — each with a case study.
							</p>
						</div>
					</div>

					{/* Sections */}
					<div className="grid gap-10 py-12 pb-14 lg:grid-cols-2 lg:items-start">
						{sections.map((section, sectionIdx) => {
							const allInSection = projectDetails.filter((p) => p.serviceSlug === section.slug).slice(0, 2);

							return (
								<motion.section
									key={section.slug}
									initial={{ opacity: 0, y: 14 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: sectionIdx * 0.06 }}
									viewport={{ once: true }}
								>
									{/* Section header */}
									<div className="flex items-center gap-4 mb-6">
										<span className="shrink-0 font-mono text-[0.65rem] tabular-nums text-[#7A3A30]">
											{String(sectionIdx + 1).padStart(2, "0")}
										</span>
										<div className="flex flex-1 items-baseline justify-between gap-4 border-b border-[#e0d8cf] pb-3">
											<div className="flex items-baseline gap-3">
												<h2 className="text-[1.05rem] font-bold tracking-tight text-[#3a3a3a]">{section.label}</h2>
												<span className="hidden text-[0.78rem] text-[#9a9089] sm:inline">{section.description}</span>
											</div>
											<span className="shrink-0 font-mono text-[0.65rem] text-[#a89f96]">
												{allInSection.length} {allInSection.length === 1 ? "project" : "projects"}
											</span>
										</div>
									</div>

									{allInSection.length > 0 ? (
										<div className="grid gap-5">
											{allInSection.map((project, i) => (
												<ProjectCard key={project.slug} project={project} index={i} sectionLabel={section.label} />
											))}
										</div>
									) : (
										<p className="text-[0.82rem] text-[#a89f96] italic">Case studies coming soon.</p>
									)}
								</motion.section>
							);
						})}
					</div>
				</motion.div>
			</main>
		</div>
	);
};

export default ProjectsPage;
