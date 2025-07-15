import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import { getAllLabs } from "@/lib/labs";
import type { Metadata } from "next";
import type { ProjectQueryResult, LabQueryResult } from "@/sanity-studio/types";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const title = "Home | " + siteConfig.title;
  const description = siteConfig.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: siteConfig.url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Home() {
  const projects = await getAllProjects();
  const labs = await getAllLabs();

  return (
    <>
      {/* Main content */}
      <main className="min-h-screen bg-white pt-[18vh]">
        <div className=" mx-auto px-4">
          <div className="flex gap-4 h-[82vh]">
            {/* Projects Section - 4/5 width */}
            <div className="w-3/4 flex flex-col">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 uppercase">Projects</h1>
              
              {!projects || projects.length === 0 ? (
                <div className="text-gray-600">
                  <p>No projects found.</p>
                  <p className="mt-2 text-sm">Please add projects in the Sanity Studio.</p>
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto flex-1">
                  {projects.map((project: ProjectQueryResult) =>
                    project.images && project.images.length > 0 ? (
                      <div key={project._id} className="">
                        <div className="flex flex-row justify-between">
                        <div className="text-lg font-extrabold text-black mb-1 w-full">
                          {project.projectNumber}
          
                        </div>
                        <div className="text-lg font-extrabold text-black mb-1 w-1/2 ml-5">
                          {project.title}
                        </div>
                        </div>
                        
                        <div className="flex flex-row gap-1 overflow-x-scroll">
                          {project.images.map((image, index) => (
                            <img
                              key={index}
                              src={image.image.asset.url}
                              alt={image.description || project.projectNumber}
                              className="w-auto max-h-[150px] object-contain bg-white"
                            />
                          ))}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>

            {/* Labs Section - 1/5 width */}
            <div className="w-1/4 flex flex-col">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 uppercase">OCTO Lab</h2>
              
              {!labs || labs.length === 0 ? (
                <div className="text-gray-600">
                  <p>No labs found.</p>
                  <p className="mt-2 text-sm">Please add labs in the Sanity Studio.</p>
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto flex-1">
                  {labs.map((lab: LabQueryResult) => (
                    <div key={lab._id} className="">
                      {lab.image && (
                        <img
                          src={lab.image.asset.url}
                          alt={lab.title}
                          className="w-full h-auto object-cover mb-2"
                        />
                      )}
                      <p className="text-lg font-bold text-black uppercase leading-tight">{lab.title}</p>
                      <p className="text-lg font-bold text-black uppercase leading-tight">
                        {new Date(lab.publishedAt).toLocaleDateString()}
                      </p>
                      <p className="text-md font-bold text-black leading-tight">
                        {lab.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
