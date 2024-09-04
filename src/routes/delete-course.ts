import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { prisma } from "../lib/prisma";

export async function DeleteCourse(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/courses/:courseID",
    {
      schema: {
        params: z.object({
          courseID: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { courseID } = req.params;
      const courseIdAsNumber = Number(courseID);

      const isCourseExists = await prisma.course.findUnique({
        where: {
          id: courseIdAsNumber,
        },
      });

      if (!isCourseExists) {
        return res
          .status(404)
          .send({ message: "Course not found with this id" });
      }

      await prisma.course.delete({
        where: {
          id: courseIdAsNumber,
        },
      });

      return res.status(200).send({ message: "Course successfully deleted" });
    }
  );
}
