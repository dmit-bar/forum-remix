import { json, type LoaderArgs } from "@remix-run/node";

import invariant from "tiny-invariant";
import type { Crumb } from "~/components/molecules";
import { getSectionInfo } from "~/models/sections.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.sectionId, "params.sectionId is required");

  const section = await getSectionInfo(params.sectionId);

  return json({ section });
};

export const handle = {
  crumbs: (data: { section: { title: string; link: string } }) => {
    const root: Crumb = { route: "sections", title: "Sections" };
    const selectedSection: Crumb = {
      route: `sections/${data.section.link}`,
      title: data.section.title,
    };
    const newTopic: Crumb = { route: "new-topic", title: "New topic" };

    return [root, selectedSection, newTopic];
  },
};

const NewTopic = () => {
  // const data = useLoaderData<typeof loader>();

  // TODO форма для заполнения
  return (
    <div className="w-full h-full flex bg-gray-50 flex-col border border-gray-300">
      <span>new topic yo</span>
    </div>
  );
};

export default NewTopic;
