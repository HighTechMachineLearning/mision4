import { z } from "zod";
import { plantaSchema } from "../schemas/planta";

const BASE = "http://localhost:3000/plantas";

export class ErrorApi extends Error {
    constructor(mensaje, status) {
        super(mensaje);
        this.name = "ErrorApi";
        this.status = status;
    }
}

const pedir = async (url, opciones) => {
    let respuesta;
    try {
        respuesta = await fetch(url, opciones);
    } catch {
        throw new ErrorApi("No se pudo conectar con el servidor");
    }
    if (!respuesta.ok) {
        const cuerpo = await respuesta.json().catch(() => null);
        throw new ErrorApi(cuerpo?.error ?? `Error ${respuesta.status} del servidor`, respuesta.status);
    }
    return respuesta.json();
};

const leerPlanta = (objeto) => {
    const { id, ...datos } = objeto ?? {};
    if (typeof id !== "string") return null;
    const planta = plantaSchema.safeParse(datos);
    return planta.success ? { id, ...planta.data } : null;
};

export const crearPlanta = (valores) =>
    pedir(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valores),
    });

export const obtenerPlantas = async () => {
    const objetos = z.array(z.unknown()).parse(await pedir(BASE));
    const plantas = objetos.map(leerPlanta).filter(Boolean);
    return { plantas, ilegibles: objetos.length - plantas.length };
};
