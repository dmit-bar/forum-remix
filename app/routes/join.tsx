import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button, GeneralLink, Textfield } from "~/components/atoms";

import { createUser, getUserByLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateLogin } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const login = formData.get("login");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateLogin(login)) {
    return json(
      { errors: { login: "Login is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { login: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { login: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByLogin(login);
  if (existingUser) {
    return json(
      {
        errors: {
          login: "A user already exists with this login",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(login, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.login) {
      loginRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <Textfield
              ref={loginRef}
              id="login"
              label="Login"
              required
              autoFocus={true}
              name="login"
              type="login"
              autoComplete="login"
              aria-invalid={actionData?.errors?.login ? true : undefined}
              aria-describedby="login-error"
              error={actionData?.errors?.login}
            />
          </div>
          <div>
            <Textfield
              id="password"
              ref={passwordRef}
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
              error={actionData?.errors?.password}
            />
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button block type="submit">
            Create account
          </Button>

          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-950">
              Already have an account?{" "}
              <GeneralLink
                className="font-medium"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </GeneralLink>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
