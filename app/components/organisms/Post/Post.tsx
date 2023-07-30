import type { Post as IPost } from "@prisma/client";
import classNames from "classnames";
import { GeneralLink } from "~/components/atoms";

interface PostProps {
  post: IPost;
}

const Post = ({ post }: PostProps) => {
  return (
    <div
      className={classNames(
        "grid w-full grid-cols-[minmax(0,_0.15fr)_minmax(0,_1fr)] first:rounded-t-sm last:rounded-b-sm",
        { "bg-stone-700": post.isOriginalPost }
      )}
    >
      <div className="mt-2 flex flex-col place-items-center p-2">
        <div
          id="user_avatar"
          className="h-16 w-16 bg-teal-400" /* TODO img */
        />
        <GeneralLink to={`/profile?user=${post.login}`} className="text-sm">
          {post.login}
        </GeneralLink>
      </div>
      <div className="mb-4 flex flex-col p-2">
        <div className="mb-2 text-xs text-stone-400">
          {post.updatedAt.toLocaleString()}
        </div>
        <div className="text-sm">{post.message}</div>
      </div>
    </div>
  );
};

export { Post };
