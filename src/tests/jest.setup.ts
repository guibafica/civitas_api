import dotenv from "dotenv";
import { execSync } from "child_process";

dotenv.config({ path: ".env.test" });

execSync(
  'DATABASE_URL="file:./test.db" npx prisma migrate deploy --preview-feature'
);
