import { z } from "zod";
import { objetoApiSchema, plantaSchema } from "../schemas/planta";
import { leerIds } from "../storage/idsPlantas";

const BASE = "https://api.restful-api.dev/objects";

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
    const sobre = objetoApiSchema.safeParse(objeto);
    if (!sobre.success) return null;
    const { id, name, data } = sobre.data;
    const planta = plantaSchema.safeParse({ ...data, nombre: name });
    return planta.success ? { id, ...planta.data } : null;
};

export const crearPlanta = async ({ nombre, ...datos }) => {
    const creado = await pedir(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombre, data: datos }),
    });
    return objetoApiSchema.parse(creado).id;
};

export const obtenerPlantas = async () => {
    const ids = leerIds();
    if (ids.length === 0) return { plantas: [], ilegibles: 0 };

    const consulta = ids.map((id) => `id=${encodeURIComponent(id)}`).join("&");
    const objetos = z.array(z.unknown()).parse(await pedir(`${BASE}?${consulta}`));

    const plantas = objetos.map(leerPlanta).filter(Boolean);
    return { plantas, ilegibles: objetos.length - plantas.length };
};
