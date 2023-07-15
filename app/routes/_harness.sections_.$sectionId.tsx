import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/atoms";
import { type Crumb } from "~/components/molecules";
import {
  getAllTopicsForSection,
  getSectionInfo,
} from "~/models/sections.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.sectionId, "params.sectionId is required");

  const [topics, section] = await Promise.all([
    getAllTopicsForSection(params.sectionId),
    getSectionInfo(params.sectionId),
  ]);

  return json({ topics, section });
};

export const handle = {
  crumbs: (data: { section: { title: string; link: string } }) => {
    const root: Crumb = { route: "sections", title: "Sections" };
    const selectedSection: Crumb = {
      route: `sections/${data.section.link}`,
      title: data.section.title,
    };

    return [root, selectedSection];
  },
};

const SelectedSection = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full flex bg-gray-50 flex-col">
      {data.topics.length ? (
        data.topics.map((topic) => <div key={topic.id}>{topic.title}</div>)
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 m-auto flex flex-col">
            <div className="m-auto flex flex-col justify-center">
              <span className="italic text-gray-950">
                No topics in this section.
              </span>
              <div className="mx-auto mt-4">
                <Button>Create a new topic</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedSection;
