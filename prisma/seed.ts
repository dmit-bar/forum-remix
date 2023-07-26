import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const loginIvanov = "ivanov1337";
  const loginAcidBurn = "acid_burn";

  // cleanup the existing database
  await prisma.user.delete({ where: { login: loginIvanov } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  await prisma.user.delete({ where: { login: loginAcidBurn } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPasswordIvanov = await bcrypt.hash(loginIvanov, 10);
  const hashedPasswordAcidBurn = await bcrypt.hash(loginAcidBurn, 10);

  await prisma.user.create({
    data: {
      login: loginIvanov,
      hashedPassword: hashedPasswordIvanov,
    },
  });
  await prisma.user.create({
    data: {
      login: loginAcidBurn,
      hashedPassword: hashedPasswordAcidBurn,
    },
  });

  await prisma.section
    .create({
      data: {
        title: "TV & Movies",
        sectionId: "tv-movies",
        description: "Talk about movies and TV please",
      },
    })
    .catch(() => {
      // skip if exists
    });
  await prisma.section
    .create({
      data: {
        title: "Music",
        sectionId: "music",
        description: "Talk about music please",
      },
    })
    .catch(() => {
      // skip if exists
    });
  await prisma.section
    .create({
      data: {
        title: "Books",
        sectionId: "books",
        description: "Talk about books please",
      },
    })
    .catch(() => {
      // skip if exists
    });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
