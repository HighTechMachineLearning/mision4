const dosDigitos = (numero) => String(numero).padStart(2, "0");

const aISO = (fecha) =>
    `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;

export const hoyISO = () => aISO(new Date());

export const sumarDias = (fechaISO, dias) => {
    const [anio, mes, dia] = fechaISO.split("-").map(Number);
    return aISO(new Date(anio, mes - 1, dia + dias));
};

export const tocaRegar = (fechaRiegoISO) => fechaRiegoISO <= hoyISO();
