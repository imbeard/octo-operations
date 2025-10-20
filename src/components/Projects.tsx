"use client";

import { useState } from "react";
import type { ProjectQueryResult } from "@/sanity-studio/types";
import Lightbox from "./ui/Lightbox";

interface ProjectsProps {
  projects: ProjectQueryResult[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<
    Array<{
      src: string;
      alt: string;
      description?: string;
    }>
  >([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [lightboxProjectInfo, setLightboxProjectInfo] = useState<
    | {
        title?: string;
        subtitle?: string;
        projectNumber?: string;
        description?: string;
        place?: string;
        tags?: string[];
      }
    | undefined
  >(undefined);

  const handleImageClick = (
    project: ProjectQueryResult,
    projectImages: NonNullable<ProjectQueryResult["images"]>,
    initialIndex: number,
  ) => {
    const images = projectImages.map((img) => ({
      src: img.image.asset.url,
      alt: img.description || "Project image",
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
      <div className="w-full flex flex-col pb-3">
        <div className={`space-y-2 overflow-y-auto flex-1`}>
          {projects.map((project: ProjectQueryResult) =>
            project.images && project.images.length > 0 ? (
              <div key={project._id} className="">
                <div className="flex flex-row justify-between">
                  <div className="text-xl md:text-2xl font-extrabold uppercase text-white mb-1 w-max md:w-1/2">
                    {project.title}
                  </div>
                </div>

                <div className="flex flex-row gap-1 overflow-x-scroll">
                  {project.images.length > 0 && (
                    <img
                      key={project.images[0].image.asset.url}
                      src={project.images[0].image.asset.url}
                      alt={
                        project.images[0].description || project.projectNumber
                      }
                      className="w-auto max-h-[250px] object-contain bg-white cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        handleImageClick(project, project.images!, 0)
                      }
                    />
                  )}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>

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
