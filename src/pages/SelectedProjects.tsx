import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import { issueHiveThumbnail, projectDetails } from "@/data/projectDetails";

const sections = [
	{
		slug: "digital-marketing" as const,
		label: "Digital Marketing",
		description: "SEO, paid media, and brand identity work.",
	},
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

const INITIAL_SHOW = 3;

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
	featured = false,
}: {
	project: (typeof projectDetails)[number];
	index: number;
	featured?: boolean;
}) => {
	const hasImage = Boolean(project.image);

	return (
		<motion.article
			className="group relative overflow-hidden border border-[#e8e0d6] transition-colors duration-300 hover:border-[#c5bbb2]"
			initial={{ opacity: 0, y: 14 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.38, delay: index * 0.06 }}
			viewport={{ once: true }}
		>
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
							height={featured ? 480 : 360}
							className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}
						/>
					) : (
						<div className={`flex w-full items-end p-6 bg-[linear-gradient(135deg,#f0e8de_0%,#e0d0be_100%)] ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
							<div className="text-xl font-bold leading-tight tracking-tight text-[#3a3a3a]">{project.title}</div>
						</div>
					)}
					<span className="absolute right-3 top-3 font-mono text-[0.55rem] tabular-nums text-white/50 select-none">
						{String(index + 1).padStart(2, "0")}
					</span>
				</div>

				{/* Content */}
				<div className="px-4 py-4 flex flex-col gap-2">
					<p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#7A3A30]">{project.category}</p>
					<h3 className={`font-bold tracking-tight text-[#3a3a3a] leading-snug transition-colors duration-200 group-hover:text-[#7A3A30] ${featured ? "text-[1.15rem]" : "text-[0.95rem]"}`}>
						{project.title}
					</h3>
					{featured && (
						<p className="text-[0.82rem] leading-[1.65] text-[#6f655a] line-clamp-2">{project.summary}</p>
					)}
					<div className="flex items-center justify-between mt-1">
						<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
							{project.tags.slice(0, featured ? 3 : 2).map((tag, i) => (
								<span key={tag} className="inline-flex items-center gap-1.5">
									<span className="text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-[#a89f96]">{tag}</span>
									{i < Math.min(project.tags.length, featured ? 3 : 2) - 1 && (
										<span className="text-[#d0c9c0]" aria-hidden="true">·</span>
									)}
								</span>
							))}
						</div>
						<ArrowUpRight size={13} className="shrink-0 text-[#c4bab2] transition-colors duration-300 group-hover:text-[#7A3A30]" />
					</div>
				</div>
			</Link>
		</motion.article>
	);
};

const ProjectsPage = () => {
	const featuredImage = projectDetails.find((p) => p.image)?.image ?? issueHiveThumbnail;
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});
	const totalProjects = projectDetails.length;

	return (
		<div className="min-h-screen bg-[#f5f1eb] text-[#3a3a3a]">
			<Seo
				title="Projects | SEO, Digital Marketing & Civic-Tech Case Studies"
				description="Browse featured SEO, digital marketing, and civic-tech case studies by Dhirendra Singh Dhami, with insights into campaign strategy and execution."
				canonicalPath="/projects"
				image={featuredImage}
				imageAlt="Featured project preview for Dhirendra Singh Dhami"
				keywords={["Dhirendra Singh Dhami projects", "SEO case studies", "digital marketing portfolio", "civic tech projects", "Nepal"]}
				schema={projectsSchema}
			/>
			<ScrollProgressBar />
			<Navbar />

			<main className="mx-auto max-w-[84rem] px-6 pt-28 pb-20 font-rajdhani sm:px-8 lg:px-12">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: "easeOut" }}
				>
					{/* Hero */}
					<div className="mb-16">
						<div className="flex items-center gap-3 mb-5">
							<span className="h-px w-5 bg-[#7A3A30]" aria-hidden="true" />
							<p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A3A30]">Selected Work</p>
						</div>
						<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
							<h1 className="font-rajdhani text-[clamp(2.8rem,5.5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.02em] text-[#3a3a3a] max-w-2xl">
								Things I've<br />Made
							</h1>
							<div className="flex flex-col gap-3 md:items-end">
								<p className="max-w-[32ch] text-[0.93rem] leading-[1.75] text-[#6f655a] md:text-right">
									Community programs, platform concepts, and a campus tool that won an award — each with a case study.
								</p>
								<span className="inline-flex items-center gap-1.5 self-start md:self-auto">
									<span className="font-mono text-[0.62rem] tabular-nums text-[#7A3A30] font-semibold">{String(totalProjects).padStart(2, "0")}</span>
									<span className="text-[0.62rem] uppercase tracking-[0.16em] text-[#a89f96]">projects total</span>
								</span>
							</div>
						</div>
					</div>

					<div className="h-px w-full bg-gradient-to-r from-transparent via-[#e9e1d6] to-transparent mb-16" />

					{/* Sections */}
					<div className="flex flex-col gap-20">
						{sections.map((section, sectionIdx) => {
							const all = projectDetails.filter((p) => p.serviceSlug === section.slug);
							const isExpanded = expanded[section.slug];
							const visible = isExpanded ? all : all.slice(0, INITIAL_SHOW);
							const hasMore = all.length > INITIAL_SHOW;
							const featured = visible[0];
							const rest = visible.slice(1);

							return (
								<motion.section
									key={section.slug}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.42, delay: sectionIdx * 0.05 }}
									viewport={{ once: true }}
								>
									{/* Section header */}
									<div className="flex items-center gap-4 mb-8">
										<span className="shrink-0 font-mono text-[0.62rem] tabular-nums text-[#7A3A30] font-semibold">
											{String(sectionIdx + 1).padStart(2, "0")}
										</span>
										<div className="flex flex-1 items-baseline justify-between gap-4 border-b border-[#e0d8cf] pb-3">
											<div className="flex items-baseline gap-3 flex-wrap">
												<h2 className="font-rajdhani text-[1.25rem] font-bold tracking-tight text-[#3a3a3a]">{section.label}</h2>
												<span className="text-[0.78rem] text-[#9a9089] hidden sm:inline">{section.description}</span>
											</div>
											<span className="shrink-0 font-mono text-[0.62rem] text-[#a89f96]">
												{all.length} {all.length === 1 ? "project" : "projects"}
											</span>
										</div>
									</div>

									{all.length === 0 ? (
										<p className="text-[0.82rem] text-[#a89f96] italic">Case studies coming soon.</p>
									) : (
										<>
											{/* Featured first card — full width */}
											{featured && (
												<div className="mb-5">
													<ProjectCard project={featured} index={0} featured />
												</div>
											)}

											{/* Rest — 3 col grid */}
											{rest.length > 0 && (
												<AnimatePresence>
													<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
														{rest.map((project, i) => (
															<ProjectCard key={project.slug} project={project} index={i + 1} />
														))}
													</div>
												</AnimatePresence>
											)}

											{/* Show more / less */}
											{hasMore && (
												<div className="mt-8 flex justify-center">
													<button
														onClick={() => setExpanded((prev) => ({ ...prev, [section.slug]: !isExpanded }))}
														className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6f655a] transition-colors hover:text-[#7A3A30]"
													>
														<span>{isExpanded ? "Show less" : `View all ${all.length}`}</span>
														<ArrowRight
															size={11}
															className={`transition-transform duration-300 ${isExpanded ? "rotate-90 group-hover:translate-y-0.5" : "group-hover:translate-x-0.5"}`}
														/>
													</button>
												</div>
											)}
										</>
									)}
								</motion.section>
							);
						})}
					</div>
				</motion.div>
			</main>

			<Footer />
		</div>
	);
};

export default ProjectsPage;
