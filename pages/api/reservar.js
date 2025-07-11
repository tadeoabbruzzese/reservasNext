import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    
  if (req.method === "POST") {
    const { nombre, email, personas, fecha, hora } = req.body;

    const filePath = path.join(process.cwd(), "reservas.json");

    let reservas = [];

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      reservas = JSON.parse(data);
    }

    reservas.push({
      nombre,
      email,
      personas,
      fecha,
      hora,
      creada: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2));

    res.status(200).json({ mensaje: "Reserva creada correctamente" });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
