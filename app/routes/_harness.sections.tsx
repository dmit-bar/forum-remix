import { useLoaderData } from "@remix-run/react";
import type { Crumb } from "~/components/molecules/Crumbs/Crumbs";
import { Section } from "~/components/organisms";
import { getAllSections } from "~/models/sections.server";

export const loader = async () => {
  return await getAllSections();
};

export const handle = {
  crumbs: () => {
    const root: Crumb = { route: "sections", title: "Sections" };

    return [root];
  },
};

const Sections = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full flex bg-gray-50 flex-col">
      {data.sections.map((section, idx, array) => (
        <Section
          className={array.length === idx + 1 ? "border-b-0" : "border-b"}
          key={section.link}
          title={section.title}
          link={section.link}
          description={section.description}
        />
      ))}
    </div>
  );
};

export default Sections;
