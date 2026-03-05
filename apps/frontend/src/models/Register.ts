export type PlanType = "free" | "pro";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    plan: PlanType;
}