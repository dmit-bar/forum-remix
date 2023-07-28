import { Link, Outlet, useLocation } from "@remix-run/react";
import { Button, GeneralLink } from "~/components/atoms";
import { Crumbs } from "~/components/molecules";
import { useOptionalUser } from "~/utils";

const Harness = () => {
  const user = useOptionalUser();
  const { pathname } = useLocation();

  return (
    <div className="h-full w-full bg-gray-700">
      <div className="m-auto flex h-full w-3/4 flex-col bg-gray-100 px-4">
        <div className="flex w-full items-center justify-between pt-2">
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
                <Button view="link" className="text-sm underline" type="submit">
                  (log out)
                </Button>
              </form>
            ) : (
              <div>
                <div className="mt-2 flex items-center justify-center gap-2">
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
          <span className="italics text-sm text-gray-950">footer</span>
        </div>
      </div>
    </div>
  );
};

export default Harness;
