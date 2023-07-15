import { useMatches } from "@remix-run/react";
import { GeneralLink } from "~/components/atoms";

interface Crumb {
  route: string;
  title: string;
}

interface CrumbsProps {
  className?: string;
}

const Crumbs = ({ className }: CrumbsProps) => {
  const matches = useMatches();

  const matchesWithCrumbs = matches.filter((match) => match.handle?.crumbs);
  const lastMatch = matchesWithCrumbs[matchesWithCrumbs.length - 1];
  const crumbs: Crumb[] | undefined = lastMatch?.handle?.crumbs(
    lastMatch?.data
  );

  return crumbs ? (
    <div className={className}>
      {crumbs.map((crumb: Crumb, idx, array) => {
        return (
          <span key={crumb.route}>
            {idx > 0 && <span className="text-sm mx-1 text-gray-950">/</span>}
            {idx + 1 === array.length ? (
              <span className="text-sm font-bold text-gray-950">
                {crumb.title}
              </span>
            ) : (
              <GeneralLink className="text-sm" to={crumb.route}>
                {crumb.title}
              </GeneralLink>
            )}
          </span>
        );
      })}
    </div>
  ) : null;
};

export { Crumbs };
export type { Crumb };
