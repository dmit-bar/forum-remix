import type { Post, Topic } from "@prisma/client";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { GeneralLink } from "~/components/atoms";
import { TopicIcon } from "~/icons";

interface TopicLinkProps {
  topic: Topic;
  lastPost: Post;
  className?: string;
}

const TopicLink = ({ topic, lastPost, className }: TopicLinkProps) => {
  return (
    <section
      className={classNames(
        "grid grid-cols-[36px_minmax(0,_1.5fr)_minmax(0,_1fr)] gap-2 px-2 py-1 text-sm",
        "border-b border-stone-600 last:border-0",
        className
      )}
    >
      <Link to={topic.id} className="flex items-center justify-center">
        <TopicIcon width="32px" height="32px" />
      </Link>
      <div className="overflow-hidden whitespace-nowrap">
        <GeneralLink to={topic.id} className="inline">
          {topic.title}
        </GeneralLink>
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs italic">
          {topic.description}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="overflow-hidden whitespace-nowrap text-xs">
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            <span className="font-bold">{lastPost.login}</span>
            {` — ${lastPost.updatedAt.toLocaleString()}`}
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <GeneralLink
              to={topic.id}
              className="inline overflow-hidden whitespace-nowrap"
            >
              {lastPost.message}
            </GeneralLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TopicLink };
