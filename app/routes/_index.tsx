import { Link } from "@remix-run/react";
import { Button, GeneralLink } from "~/components/atoms";
import { useOptionalUser } from "~/utils";

const Index = () => {
  const user = useOptionalUser();

  return (
    <main className="flex h-full bg-gray-700">
      <section className="m-auto max-w-lg w-full h-2/5 bg-gray-50 border border-gray-300 flex flex-col justify-center items-center rounded">
        <h1 className="font-bold text-3xl">Welcome to Forums</h1>
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
              <div className="flex gap-2 justify-center mt-2 items-center">
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
