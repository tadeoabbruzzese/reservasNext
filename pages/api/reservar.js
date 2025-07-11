import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, email, personas, fecha, hora } = req.body;

    try {
      await prisma.reserva.create({
        data: { nombre, email, personas: parseInt(personas), fecha, hora },
      });
      res.status(200).json({ mensaje: "Reserva guardada correctamente!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error guardando reserva" });
    }
  } else {
    res.status(405).json({ mensaje: "Método no permitido" });
  }
}
