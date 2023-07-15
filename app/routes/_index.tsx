import { GeneralLink } from "~/components/atoms";

const Index = () => (
  <main className="flex h-full bg-gray-700">
    <section className="m-auto w-3/5 h-2/5 bg-gray-50 border border-gray-300 flex flex-col justify-center items-center rounded-[1px]">
      <h1 className="font-bold text-3xl pb-5">Welcome to Forums</h1>
      <GeneralLink to="sections">{"> Enter <"}</GeneralLink>
    </section>
  </main>
);

export default Index;
