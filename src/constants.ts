import dotenv from "dotenv";
import z, { ZodError } from "zod";
dotenv.config();

const envConstantsSchema = z.object({
  TOKEN: z.string(),
  MYSQL_PASSWORD: z.string(),
});

let envConstants: z.TypeOf<typeof envConstantsSchema>;
try {
  envConstants = envConstantsSchema.parse(process.env);
} catch (err) {
  if (err instanceof ZodError) {
    const formattedIssues = err.issues.map(issue => `- ${issue.message}: ${issue.path.join(".")}`);
    console.error(`Issues with env variables:\n${formattedIssues.join("\n")}`);
    process.exit(1);
  }
  throw err;
}

export const Constants = {
  configDir: "./config",
  env: envConstants,
};
