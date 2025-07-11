import { db } from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { nombre, email, personas, fecha, hora } = req.body;

    try {
      const updated = await db.reserva.update({
        where: { id: parseInt(id) },
        data: { nombre, email, personas: parseInt(personas), fecha, hora },
      });
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error actualizando reserva" });
    }
  } else if (req.method === "DELETE") {
    try {
      await db.reserva.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ mensaje: "Reserva eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: "Error eliminando reserva" });
    }
  } else {
    res.status(405).json({ mensaje: "Método no permitido" });
  }
}
