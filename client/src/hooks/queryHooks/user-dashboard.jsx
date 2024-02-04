/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getLifestyle } from "../../services/user-dashboard/getLifestyle";
import { getWaterIntake } from "../../services/user-dashboard/getWaterIntake";
import { getDiet } from "../../services/user-dashboard/getDiet";
import { getSkinCare } from "../../services/user-dashboard/getSkinCare";

export function useQueryGetLifeStyleData() {
    const { isLoading, error, data: LifeStyleData } = useQuery({
        queryKey: ["life-style"],
        queryFn: () => getLifestyle(),
    });
    return { LifeStyleData };
}

export function useQueryGetWaterIntakeData() {
    const { isLoading, error, data: WaterIntakeData } = useQuery({
        queryKey: ["water-intake"],
        queryFn: () => getWaterIntake(),
    });
    return { WaterIntakeData };
}

export function useQueryGetDietData() {
    const { isLoading, error, data: DietData } = useQuery({
        queryKey: ["diet"],
        queryFn: () => getDiet(),
    });
    return { DietData };
}

export function useQueryGetSkinCareData() {
    const { isLoading, error, data: SkinCareData } = useQuery({
        queryKey: ["skin-care"],
        queryFn: () => getSkinCare(),
    });
    return { SkinCareData };
}