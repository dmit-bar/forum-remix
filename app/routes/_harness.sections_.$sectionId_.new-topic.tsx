import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import invariant from "tiny-invariant";
import type { Crumb } from "~/components/molecules";
import { getSectionInfo } from "~/models/sections.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.sectionId, "params.sectionId is required");

  const section = await getSectionInfo(params.sectionId);

  return json({ section });
};

export const handle = {
  crumbs: (data: { section: { title: string; sectionId: string } }) => {
    const root: Crumb = { route: "sections", title: "Sections" };
    const selectedSection: Crumb = {
      route: `sections/${data.section.sectionId}`,
      title: data.section.title,
    };
    const newTopic: Crumb = { route: "new-topic", title: "New topic" };

    return [root, selectedSection, newTopic];
  },
};

export const meta: V2_MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return [
      { title: "Missing Section" },
      {
        name: "description",
        content: `There is no section with the ID of ${params.sectionId}. 😢`,
      },
    ];
  }

  const { section } = data;
  return [
    { title: `${section?.title} > New topic` },
    {
      name: "description",
      content: section?.description,
    },
  ];
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
