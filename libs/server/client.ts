import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

if (!global.client) {
  global.client = new PrismaClient();
}

export default global.client;
