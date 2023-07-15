import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const login = "ivanov1337";

  // cleanup the existing database
  await prisma.user.delete({ where: { login } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("ivanov1337", 10);

  await prisma.user.create({
    data: {
      login,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.section
    .create({
      data: {
        title: "TV & Movies",
        link: "tv_movies",
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
        link: "music",
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
        link: "books",
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
