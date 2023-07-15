import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

const getAllSections = async () => {
  return json({
    sections: await prisma.section.findMany(),
  });
};

const getSectionInfo = async (sectionId: string) => {
  return await prisma.section.findFirst({ where: { sectionId } });
};

const getAllTopicsForSection = async (sectionId: string) => {
  return await prisma.topic.findMany({ where: { sectionId } });
};

export { getAllSections, getAllTopicsForSection, getSectionInfo };
