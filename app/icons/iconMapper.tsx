import SvgBooks from "./Books";
import SvgMusic from "./Music";
import SvgTvFilm from "./TvMovies";

const sectionIconMapper = (iconType: string) => {
  const size = "48px";

  switch (iconType) {
    case "tv-movies":
      return <SvgTvFilm width={size} height={size} />;
    case "music":
      return <SvgMusic width={size} height={size} />;
    case "books":
      return <SvgBooks width={size} height={size} />;
    default:
      return null;
  }
};

export { sectionIconMapper };
