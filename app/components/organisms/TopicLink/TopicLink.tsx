import type { Topic } from "@prisma/client";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { GeneralLink } from "~/components/atoms";
import { TopicIcon } from "~/icons";

interface TopicLinkProps {
  topic: Topic;
  className?: string;
}

const TopicLink = ({ topic, className }: TopicLinkProps) => {
  return (
    <section
      className={classNames(
        "grid grid-cols-[36px_minmax(0,_1.5fr)_minmax(0,_1fr)] gap-2 border-t py-1 px-2 text-sm border-gray-300",
        className
      )}
    >
      <Link to={topic.id} className="flex items-center justify-center">
        <TopicIcon width="32px" height="32px" />
      </Link>
      <div>
        <GeneralLink
          to={topic.id}
          className="inline whitespace-nowrap overflow-hidden overflow-ellipsis"
        >
          {topic.title}
        </GeneralLink>
        <div className="italic text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
          {topic.description}
        </div>
      </div>
      <div className="flex items-center">
        <div className="border-l border-gray-300 px-1 h-2/3" />
        <div className="text-xs">last post TODO</div>
      </div>
    </section>
  );
};

export { TopicLink };
