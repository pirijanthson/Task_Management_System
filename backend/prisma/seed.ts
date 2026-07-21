import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@test.com",
    },
  });

  if (existingUser) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@test.com",
      password: hashedPassword,
    },
  });

  console.log("Admin user created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });