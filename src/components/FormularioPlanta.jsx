import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { plantaSchema, TIPOS, UBICACIONES } from "../schemas/planta";
import { useCrearPlanta } from "../hooks/usePlantas";
import CampoFormulario from "./CampoFormulario";

const valoresIniciales = {
    nombre: "",
    tipo: "",
    ubicacion: "",
    fechaSiembra: "",
    ultimoRiego: "",
    riegoCadaDias: "",
    notas: "",
};

export default function FormularioPlanta() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(plantaSchema),
        defaultValues: valoresIniciales,
    });
    const crear = useCrearPlanta();

    const alEnviar = (valores) => {
        crear.mutate(valores, { onSuccess: () => reset() });
    };

    return (
        <section>
            <h2>Registrar una planta</h2>
            <form noValidate onSubmit={handleSubmit(alEnviar)}>
                <CampoFormulario
                    etiqueta="Nombre"
                    registro={register("nombre")}
                    error={errors.nombre}
                    type="text"
                />
                <CampoFormulario
                    etiqueta="Tipo"
                    registro={register("tipo")}
                    error={errors.tipo}
                    como="select"
                    opciones={TIPOS}
                />
                <CampoFormulario
                    etiqueta="Ubicación"
                    registro={register("ubicacion")}
                    error={errors.ubicacion}
                    como="select"
                    opciones={UBICACIONES}
                />
                <CampoFormulario
                    etiqueta="Fecha de siembra"
                    registro={register("fechaSiembra")}
                    error={errors.fechaSiembra}
                    type="date"
                />
                <CampoFormulario
                    etiqueta="Último riego"
                    registro={register("ultimoRiego")}
                    error={errors.ultimoRiego}
                    type="date"
                />
                <CampoFormulario
                    etiqueta="Riego cada (días)"
                    registro={register("riegoCadaDias", { valueAsNumber: true })}
                    error={errors.riegoCadaDias}
                    type="number"
                />
                <CampoFormulario
                    etiqueta="Notas (opcional)"
                    registro={register("notas")}
                    error={errors.notas}
                    como="textarea"
                    rows={3}
                />

                <button type="submit" disabled={crear.isPending}>
                    {crear.isPending ? "Registrando…" : "Registrar planta"}
                </button>

                {crear.isError && <p role="alert">{crear.error.message}</p>}
                <p role="status">{crear.isSuccess && "Planta registrada"}</p>
            </form>
        </section>
    );
}
