import { useLoaderData } from "@remix-run/react";
import type { Crumb } from "~/components/molecules/Crumbs/Crumbs";
import { SectionLink } from "~/components/organisms";
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
    <div className="flex h-full w-full flex-col">
      {data.sections.map((section) => (
        <SectionLink
          key={section.sectionId}
          title={section.title}
          link={section.sectionId}
          description={section.description}
        />
      ))}
    </div>
  );
};

export default Sections;
