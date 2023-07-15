import { Outlet } from "@remix-run/react";
import { GeneralLink } from "~/components/atoms";
import { Crumbs } from "~/components/molecules";

const Harness = () => {
  return (
    <div className="w-full h-full flex flex-col p-4 bg-gray-100">
      <div className="">
        <GeneralLink className="text-xl" underline={false} to="/">
          Forums
        </GeneralLink>
      </div>
      <Crumbs className="py-1" />
      <main className="flex-1 border border-gray-300 overflow-y-auto">
        <Outlet />
      </main>
      <div className="flex justify-center">
        <span className="text-sm italics text-gray-950">footer</span>
      </div>
    </div>
  );
};

export default Harness;
