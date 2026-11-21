import { sumarDias, tocaRegar } from "../utils/fechas";

const aFormatoLocal = (fechaISO) => fechaISO.split("-").reverse().join("/");

export default function TarjetaPlanta({ planta }) {
    const { nombre, tipo, ubicacion, ultimoRiego, riegoCadaDias, notas } = planta;
    const proximoRiego = sumarDias(ultimoRiego, riegoCadaDias);

    return (
        <article>
            <h3>{nombre}</h3>
            <p>
                {tipo} · {ubicacion}
            </p>
            <p>
                Próximo riego: <time dateTime={proximoRiego}>{aFormatoLocal(proximoRiego)}</time>
                {tocaRegar(proximoRiego) && <strong> · Toca regar</strong>}
            </p>
            {notas && <p>{notas}</p>}
        </article>
    );
}
