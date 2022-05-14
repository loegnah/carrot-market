import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.user.create({
  data: {
    name: "logenah2",
    email: "loegnah2@gmail.com",
  },
});
