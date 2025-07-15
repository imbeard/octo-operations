import { getSiteConfig } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";
import type { ProjectQueryResult } from "@/sanity-studio/types";

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

  return (
    <>
      {/* Main content */}
      <main className="min-h-screen bg-white pt-[18vh]">
        <div className=" mx-auto px-4">
          <div className="flex gap-8">
            {/* Projects Section - 4/5 width */}
            <div className="w-4/6">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 uppercase">Projects</h1>
              
              {!projects || projects.length === 0 ? (
                <div className="text-gray-600">
                  <p>No projects found.</p>
                  <p className="mt-2 text-sm">Please add projects in the Sanity Studio.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project: ProjectQueryResult) =>
                    project.images && project.images.length > 0 ? (
                      <div key={project._id} className="">
                        <div className="text-xl font-extrabold text-black mb-2">{project.projectNumber}</div>
                        <div className="flex flex-row flex-wrap gap-2">
                          {project.images.map((image, index) => (
                            <img
                              key={index}
                              src={image.image.asset.url}
                              alt={image.description || project.projectNumber}
                              className="border border-black w-auto max-h-[150px] object-contain bg-white"
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
            <div className="w-2/6">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 uppercase">OCTO Lab</h2>
              <div className="text-gray-600">
                <p>Labs content coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
