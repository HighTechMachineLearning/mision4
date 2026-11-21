import { z } from "zod";
import { hoyISO } from "../utils/fechas";

export const TIPOS = ["hortaliza", "aromática", "flor", "frutal"];
export const UBICACIONES = ["terraza", "balcón", "huerto", "interior"];
export const NOMBRE_MAX = 40;
export const RIEGO_MIN = 1;
export const RIEGO_MAX = 30;

const fechaNoFutura = () =>
    z
        .iso.date({ error: "Indica una fecha válida" })
        .refine((fecha) => fecha <= hoyISO(), { error: "La fecha no puede ser futura" });

export const plantaSchema = z
    .object({
        nombre: z
            .string()
            .trim()
            .min(2, { error: `El nombre debe tener entre 2 y ${NOMBRE_MAX} caracteres` })
            .max(NOMBRE_MAX, { error: `El nombre debe tener entre 2 y ${NOMBRE_MAX} caracteres` }),
        tipo: z.enum(TIPOS, { error: "Elige un tipo" }),
        ubicacion: z.enum(UBICACIONES, { error: "Elige una ubicación" }),
        fechaSiembra: fechaNoFutura(),
        ultimoRiego: fechaNoFutura(),
        riegoCadaDias: z
            .number({ error: "Indica un número de días" })
            .int({ error: "Debe ser un número entero" })
            .min(RIEGO_MIN, { error: `Mínimo ${RIEGO_MIN} día` })
            .max(RIEGO_MAX, { error: `Máximo ${RIEGO_MAX} días` }),
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
