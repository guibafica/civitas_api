import path from "path";
import { PrismaClient } from "@prisma/client";

const databasePath = path.join(__dirname, "..", "..", "prisma", "test.db");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${databasePath}`,
    },
  },
});

export default prisma;
