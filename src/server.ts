import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { CreateCourse } from "./routes/create-course";

const app = Fastify();

app.get("/", () => "API is working!");

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(CreateCourse);

app.listen({ port: 3333 }).then(() => console.log("🚀 Server running 🚀"));
