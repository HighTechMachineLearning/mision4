import { z } from "zod";
import { hoyISO } from "../utils/fechas";

export const TIPOS = ["hortaliza", "aromática", "flor", "frutal"];
export const UBICACIONES = ["terraza", "balcón", "huerto", "interior"];

const fechaNoFutura = () =>
    z
        .iso.date({ error: "Indica una fecha válida" })
        .refine((fecha) => fecha <= hoyISO(), { error: "La fecha no puede ser futura" });

export const plantaSchema = z
    .object({
        nombre: z
            .string()
            .trim()
            .min(2, { error: "El nombre debe tener entre 2 y 40 caracteres" })
            .max(40, { error: "El nombre debe tener entre 2 y 40 caracteres" }),
        tipo: z.enum(TIPOS, { error: "Elige un tipo" }),
        ubicacion: z.enum(UBICACIONES, { error: "Elige una ubicación" }),
        fechaSiembra: fechaNoFutura(),
        ultimoRiego: fechaNoFutura(),
        riegoCadaDias: z
            .number({ error: "Indica un número de días" })
            .int({ error: "Debe ser un número entero" })
            .min(1, { error: "Mínimo 1 día" })
            .max(30, { error: "Máximo 30 días" }),
        notas: z.string().trim().max(200, { error: "Máximo 200 caracteres" }).optional(),
    })
    .refine((planta) => planta.ultimoRiego >= planta.fechaSiembra, {
        error: "El último riego no puede ser anterior a la siembra",
        path: ["ultimoRiego"],
    })
    .refine((planta) => !(planta.tipo === "frutal" && planta.ubicacion === "interior"), {
        error: "Un frutal no puede estar en interior",
        path: ["ubicacion"],
    });

export const objetoApiSchema = z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.number(),
    data: z.unknown(),
});
