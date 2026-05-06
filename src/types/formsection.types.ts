import { ImmobileFullForm } from "./inserimentoHooks.types";

export interface FormSectionProps {
    formData: Partial<ImmobileFullForm>;
    updateField: <K extends keyof ImmobileFullForm>(
        name: K,
        value: ImmobileFullForm[K],
    ) => void;
}