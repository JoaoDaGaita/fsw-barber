import { getServerSession } from "next-auth";
import { db } from "../lib/prisma";
import { authOptions } from "../lib/auth";

export const getFinishedBooks = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];
  return await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lte: new Date(),
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
