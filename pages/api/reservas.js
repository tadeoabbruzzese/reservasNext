import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const reservas = await prisma.reserva.findMany({
      orderBy: { id: "desc" },
    });
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo reservas" });
  }
}
