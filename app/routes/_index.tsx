import { Link } from "@remix-run/react";
import { Button, GeneralLink } from "~/components/atoms";
import { useOptionalUser } from "~/utils";

const Index = () => {
  const user = useOptionalUser();

  return (
    <main className="flex h-full bg-gray-700">
      <section className="m-auto flex h-2/5 w-full max-w-lg flex-col items-center justify-center rounded border border-gray-300 bg-gray-50">
        <h1 className="text-3xl font-bold">Welcome to Forums</h1>
        <GeneralLink className="my-8" to="sections">
          {"> Enter <"}
        </GeneralLink>
        <div className="flex flex-col justify-center">
          {user ? (
            <>
              <div className="text-sm text-gray-950">
                You're currently logged in as{" "}
                <GeneralLink to="profile">{user.login}</GeneralLink>
              </div>
              <div className="flex justify-center">
                <form action="/logout" method="post">
                  <Button view="link-small" className="underline" type="submit">
                    (log out)
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm">You're currently not logged in</div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <Link to="/join">
                  <Button view="primary-default">Sign up</Button>
                </Link>
                <Link to="/login">
                  <Button view="secondary-default">Log in</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Index;
