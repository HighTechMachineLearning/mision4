const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

export default function CampoFormulario({
    etiqueta,
    registro,
    error,
    como = "input",
    opciones = [],
    ...resto
}) {
    const id = registro.name;
    const idError = `${id}-error`;

    const propsControl = {
        id,
        "aria-invalid": error ? "true" : "false",
        "aria-describedby": error ? idError : undefined,
        ...registro,
        ...resto,
    };

    return (
        <div className="campo">
            <label htmlFor={id}>{etiqueta}</label>
            {como === "select" ? (
                <select {...propsControl}>
                    <option value="">Elige una opción</option>
                    {opciones.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {capitalizar(opcion)}
                        </option>
                    ))}
                </select>
            ) : como === "textarea" ? (
                <textarea {...propsControl} />
            ) : (
                <input {...propsControl} />
            )}
            {error && (
                <p id={idError} role="alert">
                    {error.message}
                </p>
            )}
        </div>
    );
}
