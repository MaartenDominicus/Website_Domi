import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "../../project-detail";
import { findProject, projectsNl } from "../../project-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectsNl.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject("nl", slug);
  if (!project) return {};
  const title = `${project.title} | Project Domi Installatie`;
  return {
    title,
    description: project.intro,
    alternates: { canonical: `/projecten/${slug}`, languages: { nl: `/projecten/${slug}`, en: `/en/projects/${slug}` } },
    openGraph: { title, description: project.intro, type: "article", locale: "nl_NL", images: [{ url: project.image, alt: project.alt }] },
    twitter: { card: "summary_large_image", title, description: project.intro, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject("nl", slug);
  if (!project) notFound();
  return <ProjectDetail project={project} locale="nl" />;
}
