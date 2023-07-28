import { Outlet } from "@remix-run/react";
import { GeneralLink } from "~/components/atoms";
import { Crumbs } from "~/components/molecules";
import { useOptionalUser } from "~/utils";

const Harness = () => {
  const user = useOptionalUser();

  return (
    <div className="h-full w-full bg-stone-800 text-stone-200">
      <div className="m-auto flex h-full w-3/4 flex-col px-4 lg:w-4/6">
        <div className="flex w-full items-center justify-between pt-2">
          <GeneralLink className="text-xl" underline={false} to="/">
            Forums
          </GeneralLink>
          <div>
            {user && (
              <GeneralLink to={"/profile"} className="text-sm no-underline">
                {user.login}
              </GeneralLink>
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
