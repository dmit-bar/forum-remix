import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Crumb } from "~/components/molecules";
import { Post } from "~/components/organisms";
import { getSectionInfo } from "~/models/sections.server";
import { getTopicInfo } from "~/models/topics.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.sectionId, "params.topicId is required");
  invariant(params.topicId, "params.topicId is required");

  const section = await getSectionInfo(params.sectionId);
  const topic = await getTopicInfo(params.topicId);

  return json({
    topic,
    section,
  });
};

export const handle = {
  crumbs: (data: {
    section: { title: string; sectionId: string };
    topic: { title: string; topicId: string };
  }) => {
    const root: Crumb = { route: "sections", title: "Sections" };

    const selectedSection: Crumb = {
      route: `sections/${data.section.sectionId}`,
      title: data.section.title,
    };

    const selectedTopic: Crumb = {
      route: `sections/${data.section.sectionId}/${data.topic.topicId}`,
      title: data.topic.title,
    };

    return [root, selectedSection, selectedTopic];
  },
};

export const meta: V2_MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return [
      { title: "Missing Topic" },
      {
        name: "description",
        content: `There is no topic with the ID of ${params.topicId}. 😢`,
      },
    ];
  }

  const { topic } = data;
  invariant(topic, "wht the heck no topic with this id");

  return [
    { title: topic.title },
    {
      name: "description",
      content: topic.description,
    },
  ];
};

const TopicPage = () => {
  const { topic } = useLoaderData<typeof loader>();
  invariant(topic, "wht the heck no topic with this id");

  return (
    <div className="flex h-full w-full flex-col">
      <div className="pb-2">
        <div className="bg-gradient-to-tl from-rose-400 to-amber-400 bg-200% bg-clip-text text-xl font-bold text-transparent">
          {topic.title}
        </div>
      </div>
      <div className="overflow-auto">
        {topic.Posts.map((post) => (
          <Post
            key={post.id}
            post={{
              ...post,
              createdAt: new Date(topic.createdAt),
              updatedAt: new Date(topic.updatedAt),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
