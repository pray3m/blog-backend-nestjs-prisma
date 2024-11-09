import { PrismaClient } from "@prisma/client";

// initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { email: "sabin@adams.com" },
    update: {},
    create: {
      email: "sabin@adams.com",
      name: "Sabin Adams",
      password: "password-sabin",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "alex@ruheni.com" },
    update: {},
    create: {
      email: "alex@ruheni.com",
      name: "Alex Ruheni",
      password: "password-alex",
    },
  });

  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: "Prisma is awesome" },
    update: {},
    create: {
      title: "Prisma is awesome",
      body: "Prisma is a modern database toolkit that makes it easy to work with databases.",
      description: "Prisma is a modern database toolkit",
      isPublished: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "Prisma supports MongoDB" },
    update: {},
    create: {
      title: "Prisma supports MongoDB",
      body: "Prisma supports MongoDB and other databases.",
      description: "Prisma supports MongoDB",
      isPublished: false,
    },
  });

  console.log({ user1, user2, post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma client at the end
    await prisma.$disconnect();
  });
