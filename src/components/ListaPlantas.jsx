import { usePlantas } from "../hooks/usePlantas";
import TarjetaPlanta from "./TarjetaPlanta";

export default function ListaPlantas() {
    const { data, isPending, isError, error, refetch } = usePlantas();

    return (
        <section>
            <h2>Mis plantas</h2>

            {isPending && <p role="status">Cargando tus plantas…</p>}

            {isError && (
                <div role="alert">
                    <p>{error.message}</p>
                    <button type="button" onClick={() => refetch()}>
                        Reintentar
                    </button>
                </div>
            )}

            {data && (
                <>
                    {data.ilegibles > 0 && (
                        <p role="status">
                            {data.ilegibles === 1
                                ? "1 registro ilegible se ha descartado."
                                : `${data.ilegibles} registros ilegibles se han descartado.`}
                        </p>
                    )}
                    {data.plantas.length === 0 ? (
                        <p>Aún no has registrado ninguna planta.</p>
                    ) : (
                        <ul>
                            {data.plantas.map((planta) => (
                                <li key={planta.id}>
                                    <TarjetaPlanta planta={planta} />
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </section>
    );
}
