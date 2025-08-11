"use client";

import { useState, useEffect } from "react";
import type { ProjectQueryResult } from "@/sanity-studio/types";
import Projects from "./Projects";
import Lightbox from "./ui/Lightbox";
import { getAllProjects } from "@/lib/projects";

interface ProjectsWithLightboxProps {
  initialProjects?: ProjectQueryResult[];
}

export default function ProjectsWithLightbox({ initialProjects }: ProjectsWithLightboxProps) {
  const [projects, setProjects] = useState<ProjectQueryResult[]>(initialProjects || []);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<Array<{
    src: string;
    alt: string;
    description?: string;
  }>>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [lightboxProjectInfo, setLightboxProjectInfo] = useState<{
    title?: string;
    subtitle?: string;
    projectNumber?: string;
    description?: string;
    place?: string;
    tags?: string[];
  } | undefined>(undefined);

  useEffect(() => {
    if (!initialProjects) {
      const fetchProjects = async () => {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      };
      fetchProjects();
    }
  }, [initialProjects]);

  const handleImageClick = (project: ProjectQueryResult, projectImages: NonNullable<ProjectQueryResult['images']>, initialIndex: number) => {
    const images = projectImages.map((img) => ({
      src: img.image.asset.url,
      alt: img.description || 'Project image',
      description: img.description,
    }));
    
    setLightboxImages(images);
    setLightboxInitialIndex(initialIndex);
    setLightboxProjectInfo({
      title: project.title,
      subtitle: project.subtitle, 
      projectNumber: project.projectNumber,
      description: project.description,
      place: project.place,
      tags: project.tags,
    });
    setLightboxOpen(true);
  };

  return (
    <>
      <Projects projects={projects} onImageClick={handleImageClick} />
      
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxInitialIndex}
        projectInfo={lightboxProjectInfo}
      />
    </>
  );
}
