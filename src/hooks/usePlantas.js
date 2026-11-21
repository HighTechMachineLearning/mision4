import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { crearPlanta, obtenerPlantas } from "../services/plantas";

const CLAVE_PLANTAS = ["plantas"];

export const usePlantas = () => useQuery({ queryKey: CLAVE_PLANTAS, queryFn: obtenerPlantas });

export const useCrearPlanta = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: crearPlanta,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: CLAVE_PLANTAS }),
    });
};
