import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, Filter } from "lucide-react";
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

const ProjectsPage = () => {
	const featuredImage = featuredProjects.find((project) => project.image)?.image ?? issueHiveThumbnail;
	const totalProjects = featuredProjects.length;
	const sourceCount = featuredProjects.filter((project) => project.sourceHref).length;

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,250,244,0.9),_transparent_32%),linear-gradient(180deg,#f7f3ec_0%,#efe6d8_100%)] text-[#231d18]">
			<Seo
				title="Projects | Dhirendra Singh Dhami"
				description="A focused collection of Dhiren's featured projects with direct links to the case studies."
				canonicalPath="/projects"
				image={featuredImage}
				imageAlt="Featured project preview for Dhirendra Singh Dhami"
				schema={{
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
				}}
			/>
			<ScrollProgressBar />

			<main className="mx-auto max-w-[84rem] px-6 py-6 font-rajdhani sm:px-8 lg:px-12 lg:py-8">
				<motion.section
					className="space-y-12 pt-6 sm:pt-10"
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, ease: "easeOut" }}
				>
					<div className="flex items-center justify-between gap-4">
						<Link
							to="/"
							className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#4c4238] transition-colors hover:text-[#7A3A30]"
						>
							<ChevronLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
							<span className="border-b border-transparent transition-colors group-hover:border-[#7A3A30]">Home</span>
						</Link>

						<div className="hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#7b7066] sm:flex">
							<Filter size={14} />
							<span>{totalProjects} projects</span>
						</div>
					</div>

					<div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
						<div className="space-y-5 max-w-3xl">
							<p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#90857a]">Projects Hub</p>
							<h1 className="max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[#231d18]">
								Three featured projects, nothing extra.
							</h1>
							<p className="max-w-2xl text-[0.95rem] leading-[1.75] text-[#6f655a] sm:text-[1.02rem]">
								This page only shows the featured projects you asked for, each with a direct case study link.
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-3 lg:justify-self-end lg:w-full">
							<div className="border border-[#ddd3c7] bg-[#faf6ef] px-5 py-4">
								<div className="text-[0.65rem] uppercase tracking-[0.24em] text-[#8a7f72]">Total</div>
								<div className="mt-2 text-2xl font-semibold text-[#231d18]">{totalProjects}</div>
							</div>
							<div className="border border-[#ddd3c7] bg-[#faf6ef] px-5 py-4">
								<div className="text-[0.65rem] uppercase tracking-[0.24em] text-[#8a7f72]">Public refs</div>
								<div className="mt-2 text-2xl font-semibold text-[#231d18]">{sourceCount}</div>
							</div>
							<div className="border border-[#ddd3c7] bg-[#faf6ef] px-5 py-4">
								<div className="text-[0.65rem] uppercase tracking-[0.24em] text-[#8a7f72]">Case studies</div>
								<div className="mt-2 text-2xl font-semibold text-[#231d18]">{totalProjects}</div>
							</div>
						</div>
					</div>

					<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 pb-10">
						{featuredProjects.map((project, index) => {
							const projectHref = `/projects/${project.slug}`;
							const hasImage = Boolean(project.image);
							const badge = project.serviceSlug === "advocacy-community"
								? "Community Project"
								: project.serviceSlug === "tech-projects"
									? "Tech Project"
									: "Project";

							return (
								<motion.article
									key={project.slug}
									className="group border border-[#ddd3c7] bg-[#fbf8f2] p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-[#7A3A30]/40"
									initial={{ opacity: 0, y: 18 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									viewport={{ once: true }}
								>
									<Link to={projectHref} className="block space-y-4">
										<div className="relative overflow-hidden border border-[#e4dbcf] bg-[#efe6d8]">
											{hasImage ? (
												<img
													src={project.image}
													alt={`${project.title} preview`}
													loading="lazy"
													decoding="async"
													width={960}
													height={540}
													className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
												/>
											) : (
												<div className="flex aspect-[16/10] w-full flex-col justify-between p-5 bg-[linear-gradient(135deg,#f6ede4_0%,#ead8c6_100%)]">
													<span className="text-[0.64rem] uppercase tracking-[0.28em] text-[#8a7f72]">{badge}</span>
													<div>
														<div className="text-2xl font-semibold leading-tight text-[#231d18]">{project.title}</div>
														<div className="mt-2 text-sm text-[#6f655a]">{project.category}</div>
													</div>
												</div>
											)}
										</div>

										<div className="space-y-3">
											<div className="flex items-start justify-between gap-3">
												<div>
													<p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#8a7f72]">{badge}</p>
													<h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#231d18] group-hover:text-[#7A3A30] transition-colors">
														{project.title}
													</h3>
												</div>
												<ArrowUpRight size={18} className="mt-1 shrink-0 text-[#8a7f72] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7A3A30]" />
											</div>

											<p className="text-sm leading-[1.7] text-[#6f655a]">{project.summary}</p>

											<div className="flex items-center justify-between gap-4 pt-2 text-sm text-[#7b7066]">
												<span>{project.date}</span>
												<span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.18em] text-[#4c4238] transition-colors group-hover:text-[#7A3A30]">
													<span>Open Work</span>
													<ArrowRight size={14} />
												</span>
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
