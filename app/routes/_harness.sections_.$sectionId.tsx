import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
  crumbs: (data: { section: { title: string; sectionId: string } }) => {
    const root: Crumb = { route: "sections", title: "Sections" };
    const selectedSection: Crumb = {
      route: `sections/${data.section.sectionId}`,
      title: data.section.title,
    };

    return [root, selectedSection];
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
    { title: section?.title },
    {
      name: "description",
      content: section?.description,
    },
  ];
};

const SelectedSection = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-full flex bg-gray-50 flex-col border border-gray-300">
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
                <Link to="new-topic">
                  <Button>Create a new topic</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedSection;
