import { Link, Outlet, useLocation } from "@remix-run/react";
import { Button, GeneralLink } from "~/components/atoms";
import { Crumbs } from "~/components/molecules";
import { useOptionalUser } from "~/utils";

const Harness = () => {
  const user = useOptionalUser();
  const { pathname } = useLocation();

  return (
    <div className="w-full h-full bg-gray-700">
      <div className="w-3/4 m-auto h-full flex flex-col px-4 bg-gray-100">
        <div className="pt-2 flex w-full items-center justify-between">
          <GeneralLink className="text-xl" underline={false} to="/">
            Forums
          </GeneralLink>
          <div>
            {user ? (
              <form
                className="flex items-center gap-2"
                action="/logout"
                method="post"
              >
                <input type="hidden" name="redirectTo" value={pathname} />
                <GeneralLink to={"/profile"} className="text-sm no-underline">
                  {user.login}
                </GeneralLink>
                <Button view="link" className="underline text-sm" type="submit">
                  (log out)
                </Button>
              </form>
            ) : (
              <div>
                <div className="flex gap-2 justify-center mt-2 items-center">
                  <Link to={`/join?redirectTo=${pathname}`}>
                    <Button view="primary-small">Sign up</Button>
                  </Link>
                  <Link to={`/login?redirectTo=${pathname}`}>
                    <Button view="secondary-small">Log in</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <Crumbs className="py-1" />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <div className="flex justify-center">
          <span className="text-sm italics text-gray-950">footer</span>
        </div>
      </div>
    </div>
  );
};

export default Harness;
