import { z } from "zod";

const CLAVE = "brote:ids";
const idsSchema = z.array(z.string());

export const leerIds = () => {
    try {
        const resultado = idsSchema.safeParse(JSON.parse(localStorage.getItem(CLAVE) ?? "[]"));
        return resultado.success ? resultado.data : [];
    } catch {
        return [];
    }
};

export const guardarId = (id) => {
    localStorage.setItem(CLAVE, JSON.stringify([...leerIds(), id]));
};
