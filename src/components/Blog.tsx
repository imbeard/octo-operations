import { getAllLabs } from "@/lib/labs";
import type { LabQueryResult } from "@/sanity-studio/types";

export default async function Blog() {
  const labs = await getAllLabs();

  return (
    <div className="md:max-w-[40vw] mx-auto flex flex-col pb-3 bg-primary text-white roboto px-2">
      <div className="space-y-2 overflow-y-auto flex-">
        {labs.map((lab: LabQueryResult) => (
          <div key={lab._id} className="">
            {lab.image && (
              <img
                src={lab.image.asset.url}
                alt={lab.title}
                className="w-full h-auto object-cover mb-2"
              />
            )}
            <p className="text-sm md:text-md font-bold  uppercase leading-tight">
              {lab.title}
            </p>
            <p className="text-sm md:text-md font-bold  uppercase leading-tight">
              {new Date(lab.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-xs md:text-md font-bold leading-tight">
              {lab.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
