import { type ActionArgs } from "@remix-run/node";
import { logout } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const redirectTo = formData.get("redirectTo")?.toString();

  return logout(request, redirectTo);
};
