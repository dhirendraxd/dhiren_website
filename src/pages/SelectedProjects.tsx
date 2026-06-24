import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Seo from "@/components/Seo";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { issueHiveThumbnail, projectDetails } from "@/data/projectDetails";

const featuredProjectSlugs = [
	"fellowship-community-labs",
	"ngo-volunteer-management",
	"issue-hive-awarded-3rd-prize-at-kist-fair-2082",
] as const;

const featuredProjects = featuredProjectSlugs
	.map((slug) => projectDetails.find((project) => project.slug === slug))
	.filter((project): project is NonNullable<typeof project> => Boolean(project));

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

const ProjectsPage = () => {
	const featuredImage = featuredProjects.find((project) => project.image)?.image ?? issueHiveThumbnail;

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,250,244,0.9),_transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#efe6d8_100%)] text-[#231d18]">
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
				<motion.section
					className="space-y-14 pt-6 sm:pt-10"
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
					<div className="border-b border-[#ddd3c7] pb-10">
						<p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#7A3A30]">Selected Work</p>
						<div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
							<h1 className="text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-[#231d18] max-w-xl">
								Projects that<br />actually shipped.
							</h1>
							<p className="max-w-sm text-[0.93rem] leading-[1.75] text-[#6f655a] md:text-right">
								A focused set across community work, volunteer systems, and campus tech — each with a full case study.
							</p>
						</div>
					</div>

					{/* Cards */}
					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 pb-10">
						{featuredProjects.map((project, index) => {
							const projectHref = `/projects/${project.slug}`;
							const hasImage = Boolean(project.image);
							const badge =
								project.serviceSlug === "advocacy-community"
									? "Community"
									: project.serviceSlug === "tech-projects"
									? "Tech"
									: "Project";
							const indexLabel = String(index + 1).padStart(2, "0");

							return (
								<motion.article
									key={project.slug}
									className="group border border-[#ddd3c7] bg-[#fbf8f2] transition-all duration-300 hover:-translate-y-1 hover:border-[#7A3A30]/40"
									initial={{ opacity: 0, y: 18 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.08 }}
									viewport={{ once: true }}
								>
									<Link to={projectHref} className="block">
										{/* Image */}
										<div className="relative overflow-hidden bg-[#efe6d8]">
											{hasImage ? (
												<img
													src={project.image}
													alt={`${project.title} preview`}
													loading="lazy"
													decoding="async"
													width={960}
													height={540}
													className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
												/>
											) : (
												<div className="flex aspect-[16/10] w-full flex-col justify-between p-5 bg-[linear-gradient(135deg,#f6ede4_0%,#ead8c6_100%)]">
													<span className="text-[0.64rem] uppercase tracking-[0.28em] text-[#8a7f72]">{badge}</span>
													<div className="text-2xl font-semibold leading-tight text-[#231d18]">{project.title}</div>
												</div>
											)}

											{/* Index badge top-right */}
											<span className="absolute right-3 top-3 font-mono text-[0.65rem] tabular-nums text-white/70 mix-blend-overlay select-none">
												{indexLabel}
											</span>
										</div>

										{/* Content */}
										<div className="p-5 space-y-3">
											<div className="flex items-start justify-between gap-2">
												<div>
													<p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#7A3A30]">{badge}</p>
													<h3 className="mt-1 text-[1.35rem] font-bold leading-tight tracking-tight text-[#231d18] transition-colors duration-200 group-hover:text-[#7A3A30]">
														{project.title}
													</h3>
												</div>
												<ArrowUpRight
													size={16}
													className="mt-1 shrink-0 text-[#a89f96] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7A3A30]"
												/>
											</div>

											<p className="text-[0.85rem] leading-[1.68] text-[#6f655a] line-clamp-2">{project.summary}</p>

											{/* Footer: tags + date */}
											<div className="flex items-center justify-between gap-3 pt-1 border-t border-[#e9e1d6]">
												<div className="flex flex-wrap gap-1.5">
													{project.tags.slice(0, 3).map((tag) => (
														<span key={tag} className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#8a7f72]">
															{tag}
														</span>
													))}
												</div>
												<span className="shrink-0 text-[0.72rem] text-[#a89f96]">{project.date}</span>
											</div>
										</div>
									</Link>
								</motion.article>
							);
						})}
					</div>
				</motion.section>
			</main>
		</div>
	);
};

export default ProjectsPage;
