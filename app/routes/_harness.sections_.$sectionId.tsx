import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button, GeneralLink } from "~/components/atoms";
import { type Crumb } from "~/components/molecules";
import { TopicLink } from "~/components/organisms";
import {
  getAllTopicsForSection,
  getSectionInfo,
} from "~/models/sections.server";
import { getUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  invariant(params.sectionId, "params.sectionId is required");

  const userId = await getUserId(request);

  const [topics, section] = await Promise.all([
    getAllTopicsForSection(params.sectionId),
    getSectionInfo(params.sectionId),
  ]);

  return json({ topics, section, userLoggedIn: Boolean(userId) });
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

const CreationNotAvailable = () => {
  const { pathname } = useLocation();

  return (
    <div className="text-sm italic">
      You have to{" "}
      <GeneralLink to={`/login?redirectTo=${pathname}`}>log in</GeneralLink> or{" "}
      <GeneralLink to={`/join?redirectTo=${pathname}`}>
        create an account
      </GeneralLink>{" "}
      in order to start new topics.
    </div>
  );
};

const SelectedSection = () => {
  const { topics, userLoggedIn } = useLoaderData<typeof loader>();

  if (!topics.length) {
    return (
      <div className="w-full h-full flex bg-gray-50 flex-col border border-gray-300">
        <div className="w-1/2 h-1/2 m-auto flex flex-col justify-center">
          <div className="text-gray-950 text-center">
            No topics in this section.
          </div>
          <div className="mx-auto mt-4">
            {userLoggedIn ? (
              <Link to="new-topic">
                <Button>Create a new topic</Button>
              </Link>
            ) : (
              <CreationNotAvailable />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex bg-gray-50 flex-col border border-gray-300">
      <div className="w-full py-1 px-2">
        {userLoggedIn ? (
          <Link to="new-topic">
            <Button view="primary-small">Create a new topic</Button>
          </Link>
        ) : (
          <CreationNotAvailable />
        )}
      </div>
      {topics.map((topic, idx, array) => (
        <TopicLink key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

export default SelectedSection;
