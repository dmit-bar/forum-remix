import { prisma } from "~/db.server";
import { createPost } from "./posts.server";

interface TopicCreationData {
  title: string;
  description: string;
  post: string;
  sectionId: string;
  login: string;
}

export async function createTopic({
  title,
  description,
  post,
  sectionId,
  login,
}: TopicCreationData) {
  const newTopic = await prisma.topic.create({
    data: {
      title,
      description,
      sectionId,
    },
  });

  await createPost({
    message: post,
    login,
    topicId: newTopic.id,
    isOriginalPost: true,
  });

  return newTopic;
}
