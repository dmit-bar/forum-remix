import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button, Checkbox, GeneralLink, Textfield } from "~/components/atoms";

import { verifyLogin } from "~/models/user.server";
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
  const remember = formData.get("remember");

  if (!validateLogin(login)) {
    return json(
      { errors: { login: "Login is invalid", password: null } },
      { status: 400 }
    );
  }

  // TODO better password validation
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

  const user = await verifyLogin(login, password);

  if (!user) {
    return json(
      { errors: { login: "Invalid login or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/sections";
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
              type="username"
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
            Log in
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" name="remember" label="Remember me" />
            </div>
            <div className="text-center text-sm text-gray-950">
              Don't have an account?{" "}
              <GeneralLink
                className="font-medium"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </GeneralLink>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
