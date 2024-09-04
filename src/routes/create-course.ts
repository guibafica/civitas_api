import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { prisma } from "../lib/prisma";

export async function CreateCourse(app: FastifyInstance) {
  const courseNumberSchema = z.string().regex(/^\d{3}$/, {
    message:
      'Course Number must be formatted as a three-digit, zero-padded integer like "033"',
  });

  app.withTypeProvider<ZodTypeProvider>().post(
    "/courses",
    {
      schema: {
        body: z.object({
          subject: z
            .string()
            .min(3, { message: "Subject must be at least 3 characters" }),
          courseNumber: courseNumberSchema,
          description: z
            .string()
            .min(5, { message: "Description must be at least 5 characters" }),
        }),
      },
    },
    async (req, res) => {
      const { subject, courseNumber, description } = req.body;

      const isCourseExists = await prisma.course.findFirst({
        where: {
          OR: [{ courseNumber: courseNumber }, { subject: subject }],
        },
      });

      if (isCourseExists) {
        throw new Error(
          "Duplicated course, it is not allowed to register a new course with this number or subject"
        );
      }

      const course = await prisma.course.create({
        data: {
          subject,
          courseNumber,
          description,
        },
      });

      return res.status(201).send({ courseId: course.id });
    }
  );
}
