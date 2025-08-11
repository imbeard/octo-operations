'use client';

import type { ProjectQueryResult } from "@/sanity-studio/types";

interface ProjectsProps {
  projects: ProjectQueryResult[];
  blur?: boolean;
  onImageClick?: (project: ProjectQueryResult, projectImages: NonNullable<ProjectQueryResult['images']>, initialIndex: number) => void;
}

export default function Projects({ projects, onImageClick }: ProjectsProps) {
  return (
    <div className="w-full flex flex-col">
      {!projects || projects.length === 0 ? (
        <div className="text-gray-600">
          <p>No projects found.</p>
          <p className="mt-2 text-sm">
            Please add projects
          </p>
        </div>
      ) : (
        <div className={`space-y-2 overflow-y-auto flex-1`}>
          {projects.map((project: ProjectQueryResult) =>
            project.images && project.images.length > 0 ? (
              <div key={project._id} className="">
                <div className="flex flex-row justify-between">
                  <div className="text-sm md:text-lg font-extrabold text-black mb-1 md:w-full">
                    {project.projectNumber}
                  </div>
                  <div className="text-sm md:text-lg font-extrabold text-black mb-1 w-max md:w-1/2 ml-5">
                    {project.title}
                  </div>
                </div>

                <div className="flex flex-row gap-1 overflow-x-scroll">
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image.asset.url}
                      alt={image.description || project.projectNumber}
                      className="w-auto max-h-[150px] object-contain bg-white cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => onImageClick?.(project, project.images!, index)}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
