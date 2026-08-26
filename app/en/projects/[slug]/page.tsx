import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "../../../project-detail";
import { findProject, projectsEn } from "../../../project-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectsEn.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject("en", slug);
  if (!project) return {};
  const title = `${project.title} | Domi Installatie project`;
  return {
    title,
    description: project.intro,
    alternates: { canonical: `/en/projects/${slug}`, languages: { nl: `/projecten/${slug}`, en: `/en/projects/${slug}` } },
    openGraph: { title, description: project.intro, type: "article", locale: "en_GB", images: [{ url: project.image, alt: project.alt }] },
    twitter: { card: "summary_large_image", title, description: project.intro, images: [project.image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject("en", slug);
  if (!project) notFound();
  return <ProjectDetail project={project} locale="en" />;
}
