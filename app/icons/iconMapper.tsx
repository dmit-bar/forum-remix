import { BooksIcon, MusicIcon, TvMoviesIcon } from ".";

const sectionIconMapper = (iconType: string) => {
  const size = "48px";

  switch (iconType) {
    case "tv-movies":
      return <TvMoviesIcon width={size} height={size} />;
    case "music":
      return <MusicIcon width={size} height={size} />;
    case "books":
      return <BooksIcon width={size} height={size} />;
    default:
      return null;
  }
};

export { sectionIconMapper };
