import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";

export const getConfirmedBooks = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];
  return db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};
