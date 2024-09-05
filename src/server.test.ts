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
  origin: "*",
});

app.get("/", () => "API is working!");

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(CreateCourse);
app.register(ListCourses);
app.register(DeleteCourse);

app.listen({ port: 3000 }).then(() => console.log("Test server's running"));

export default app;
