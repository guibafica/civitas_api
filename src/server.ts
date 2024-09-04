import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { CreateCourse } from "./routes/create-course";
import { ListCourses } from "./routes/list-courses";
import { DeleteCourse } from "./routes/delete-course";

const app = Fastify();

app.register(cors, {
  // Only for testing purposes, I'll let this available for all origins
  origin: "*",
});

app.get("/", () => "API is working!");

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(CreateCourse);
app.register(ListCourses);
app.register(DeleteCourse);

app.listen({ port: 3333 }).then(() => console.log("🚀 Server running 🚀"));
