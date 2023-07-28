import { Link } from "@remix-run/react";
import classNames from "classnames";
import { sectionIconMapper } from "~/icons/iconMapper";
import { GeneralLink } from "../../atoms";

interface SectionLinkProps {
  className?: string;
  title: string;
  description: string;
  link: string;
}

const SectionLink = ({
  className,
  title,
  description,
  link,
}: SectionLinkProps) => {
  return (
    <section
      className={classNames(
        "flex items-center border-stone-500 p-2",
        className
      )}
    >
      <Link to={link} className="mr-4">
        {sectionIconMapper(link)}
      </Link>
      <div className="flex flex-col">
        <div>
          <GeneralLink className="" to={link}>
            {title}
          </GeneralLink>
        </div>
        <div className="text-sm">{description}</div>
      </div>
    </section>
  );
};

export { SectionLink };
