import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Reservas() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [mensaje, setMensaje] = useState("");
  const [reservas, setReservas] = useState([]);

  const onSubmit = async (data) => {
    const res = await fetch("/api/reservar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setMensaje(json.mensaje);
    reset();
    obtenerReservas();
  };

  const obtenerReservas = async () => {
    const res = await fetch("/api/reservas");
    const data = await res.json();
    setReservas(data.reverse()); 
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-start py-10 px-4">
      <div className="backdrop-blur-sm bg-white/80 p-6 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">Simulador de Reservas</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Nombre"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}

          <input
            placeholder="Email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            placeholder="Número de personas"
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            {...register("personas", { required: "Campo obligatorio", min: 1 })}
          />
          {errors.personas && <p className="text-red-500">{errors.personas.message}</p>}

          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            {...register("fecha", { required: "La fecha es obligatoria" })}
          />
          {errors.fecha && <p className="text-red-500">{errors.fecha.message}</p>}
          
          <p className="text-gray-700 text-sm">
            Horarios: Almuerzo de 11:00 a 15:00 y Cena de 19:00 a 23:00. 
          </p>
          <input
            type="time"
            

            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            {...register("hora", {
              required: "La hora es obligatoria",
              validate: (value) => {
                const [h, m] = value.split(":").map(Number);
                const horaDecimal = h + m / 60;

                const esAlmuerzo = horaDecimal >= 11 && horaDecimal <= 13;
                const esCena = horaDecimal >= 14 && horaDecimal <= 21;

                return (esAlmuerzo || esCena) ||
                  "Solo se puede reservar entre 11:00 y 13:00, o entre 14:00 y 21:00.";
              }
            })}
          />
          {errors.hora && <p className="text-red-500">{errors.hora.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Reservar
          </button>
        </form>

        {mensaje && <p className="text-green-600 mt-4 text-center">{mensaje}</p>}

        <h2 className="text-2xl font-bold mt-8 mb-4">Reservas Confirmadas</h2>

        <div className="space-y-4">
          <AnimatePresence>
            {reservas.map((r, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white shadow-md p-4 rounded"
              >
                <p className="font-bold">{r.nombre}</p>
                <p>{r.email}</p>
                <p>{r.personas} personas</p>
                <p>{r.fecha} {r.hora}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
