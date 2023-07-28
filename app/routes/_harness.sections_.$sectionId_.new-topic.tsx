import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useRef } from "react";

import invariant from "tiny-invariant";
import { Button, Textarea, Textfield } from "~/components/atoms";
import type { Crumb } from "~/components/molecules";
import { getSectionInfo } from "~/models/sections.server";
import { createTopic } from "~/models/topics.server";
import { getUser } from "~/session.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.sectionId, "params.sectionId is required");

  const section = await getSectionInfo(params.sectionId);

  return json({ section });
};

export const handle = {
  crumbs: (data: { section: { title: string; sectionId: string } }) => {
    const root: Crumb = { route: "sections", title: "Sections" };
    const selectedSection: Crumb = {
      route: `sections/${data.section.sectionId}`,
      title: data.section.title,
    };
    const newTopic: Crumb = { route: "new-topic", title: "New topic" };

    return [root, selectedSection, newTopic];
  },
};

export const meta: V2_MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return [
      { title: "Missing Section" },
      {
        name: "description",
        content: `There is no section with the ID of ${params.sectionId}. 😢`,
      },
    ];
  }

  const { section } = data;
  return [
    { title: `${section?.title} > New topic` },
    {
      name: "description",
      content: section?.description,
    },
  ];
};

export const action = async ({ request, params, context }: ActionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description")?.toString() || "";
  const post = formData.get("post");

  const sectionId = params.sectionId;
  invariant(sectionId, "sectionId is missing");

  if (typeof title !== "string") {
    return json({
      errors: { title: "Title is required", post: null, description: null },
    });
  }
  if (typeof post !== "string") {
    return json({
      errors: { title: null, post: "Post is required", description: null },
    });
  }

  const user = await getUser(request).catch(console.error);

  if (!user?.login) {
    return json({
      errors: {
        title: null,
        post: null,
        description: null,
        general: "No user data found",
      },
    });
  }

  const newTopic = await createTopic({
    title,
    description,
    post,
    login: user.login,
    sectionId,
  }).catch(console.error);

  if (!newTopic) throw "failed to create new topic :(";

  return redirect(`/sections/${sectionId}/${newTopic.id}`);
};

const NewTopic = () => {
  const actionData = useActionData<typeof action>();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const postRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="min-h-full w-full border border-gray-300 bg-gray-50">
      <Form
        className="flex w-full flex-col items-center gap-4 px-20 py-8"
        method="post"
      >
        <Textfield
          ref={titleRef}
          id="title"
          label="Title"
          className="w-full"
          required
          autoFocus={true}
          name="title"
          type="title"
          autoComplete="title"
          aria-invalid={actionData?.errors?.title ? true : undefined}
          aria-describedby="title-error"
          error={actionData?.errors?.title}
        />
        <Textfield
          ref={descriptionRef}
          id="description"
          label="Description"
          className="w-full"
          required
          autoFocus={true}
          name="description"
          type="description"
          autoComplete="description"
          aria-invalid={actionData?.errors?.description ? true : undefined}
          aria-describedby="description-error"
          error={actionData?.errors?.description}
        />
        <Textarea
          ref={postRef}
          id="post"
          label="Post"
          className="w-full"
          required
          autoFocus={true}
          name="post"
          type="post"
          rows={10}
          aria-invalid={actionData?.errors?.post ? true : undefined}
          aria-describedby="post-error"
          error={actionData?.errors?.post}
        />
        <Button type="submit">Create new topic</Button>
      </Form>
    </div>
  );
};

export default NewTopic;
