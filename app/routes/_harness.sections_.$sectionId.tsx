import { Pencil2Icon } from "@radix-ui/react-icons";
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
  const section = await getSectionInfo(params.sectionId);
  const topics = await getAllTopicsForSection(params.sectionId);

  return json({
    topics: topics.sort((a, b) => {
      const aDate = new Date(a.Posts[0].updatedAt);
      const bDate = new Date(b.Posts[0].updatedAt);

      return bDate.getTime() - aDate.getTime();
    }),
    section,
    userLoggedIn: Boolean(userId),
  });
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
      <div className="flex h-full w-full flex-col border border-gray-300 bg-gray-50">
        <div className="m-auto flex h-1/2 w-1/2 flex-col justify-center">
          <div className="text-center text-gray-950">
            No topics in this section.
          </div>
          <div className="mx-auto mt-4">
            {userLoggedIn ? (
              <Link to="new-topic">
                <Button leftAddon={<Pencil2Icon />}>New topic</Button>
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
    <div className="flex h-full w-full flex-col border border-gray-300 bg-gray-50">
      <div className="flex w-full px-2 py-1">
        {userLoggedIn ? (
          <Link to="new-topic">
            <Button view="primary-small" leftAddon={<Pencil2Icon />}>
              New topic
            </Button>
          </Link>
        ) : (
          <CreationNotAvailable />
        )}
      </div>
      {topics.map((topic) => (
        <TopicLink
          key={topic.id}
          topic={{
            ...topic,
            createdAt: new Date(topic.createdAt),
            updatedAt: new Date(topic.updatedAt),
          }}
          lastPost={{
            ...topic.Posts[0],
            createdAt: new Date(topic.Posts[0].createdAt),
            updatedAt: new Date(topic.Posts[0].updatedAt),
          }}
        />
      ))}
    </div>
  );
};

export default SelectedSection;
