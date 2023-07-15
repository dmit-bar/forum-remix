import { Link } from "@remix-run/react";
import classNames from "classnames";
import { sectionIconMapper } from "~/icons/iconMapper";
import { GeneralLink } from "../../atoms";

interface SectionProps {
  className?: string;
  title: string;
  description: string;
  link: string;
}

const Section = ({ className, title, description, link }: SectionProps) => {
  return (
    <section
      className={classNames("p-2 flex items-center border-gray-300", className)}
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
        <div className="text-sm text-gray-900">{description}</div>
      </div>
    </section>
  );
};

export { Section };
