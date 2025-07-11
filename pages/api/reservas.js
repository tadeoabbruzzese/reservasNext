import fs from 'fs'
import path from 'path'

export default function handler(req,res) {
    
    if (req.method === "GET") {
        const filePath = path.join(process.cwd(), "reservas.json");

        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8")
            const reservas = JSON.parse(data)
            res.status(200).json(reservas)
        }
        else{
            res.status(200).json([])
        }
        
    }
    else{
        res.status(405).json({ error: "Método no permitido"}

        )
    }
}