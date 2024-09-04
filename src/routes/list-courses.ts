import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { prisma } from "../lib/prisma";

export async function ListCourses(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/courses",
    {
      schema: {
        querystring: z.object({
          page: z
            .string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && val > 0, {
              message: "Page must be a positive integer",
            })
            .optional(),
          description: z.string().optional(),
        }),
      },
    },
    async (req, res) => {
      const { page = 1, description } = req.query;
      const itemsPerPageLimit = 10;

      const where = description
        ? {
            description: {
              contains: description,
            },
          }
        : {};

      const totalItems = await prisma.course.count({ where });
      const totalPages = Math.ceil(totalItems / itemsPerPageLimit);
      const hasNextPage = page < totalPages;

      const courses = await prisma.course.findMany({
        where,
        skip: (page - 1) * itemsPerPageLimit,
        take: itemsPerPageLimit,
      });

      return res.status(200).send({
        courses,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: itemsPerPageLimit,
          hasNextPage,
        },
      });
    }
  );
}
