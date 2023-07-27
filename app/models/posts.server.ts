import { prisma } from "~/db.server";

interface PostCreationData {
  message: string;
  login: string;
  topicId: string;
  isOriginalPost: boolean;
}

export async function createPost({
  message,
  login,
  topicId,
  isOriginalPost = false,
}: PostCreationData) {
  await prisma.post.create({
    data: {
      message,
      isOriginalPost,
      login,
      topicId: topicId,
    },
  });
}
