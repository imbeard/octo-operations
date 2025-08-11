import { getAllLabs } from "@/lib/labs";
import type { LabQueryResult } from "@/sanity-studio/types";

export default async function Blog() {
  const labs = await getAllLabs();

  return (
    <div className="md:max-w-[40vw] mx-auto flex flex-col">
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
            <p className="text-sm md:text-lg font-bold text-black uppercase leading-tight">
              {lab.title}
            </p>
            <p className="text-sm md:text-lg font-bold text-black uppercase leading-tight">
              {new Date(lab.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-xs md:text-base font-bold text-black leading-tight">
              {lab.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
