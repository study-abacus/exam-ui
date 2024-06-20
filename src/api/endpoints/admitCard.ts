import { useMutation, useQuery } from 'react-query';
import { client } from '~/api/client'


export type GetAdmitCardTokenParams = {
    roll_number: string,
    password: string
}
export const getAdmitCardToken = () => 
    useMutation({
        mutationFn: async ({ roll_number, password }: GetAdmitCardTokenParams) => {
            const response = await client.post("/api/v1/admit_card/authenticate/", { id: roll_number, password });
            return response.data;
        }
    })

export const getProfile = () =>
    useQuery("profile", async () => {
        const response = await client.get("/api/v1/admit_card/current/");
        return response.data;
    })


export type UpdateProfileParams = {
    name: string
    ci: string
    guardian_name: string
    email: string
    phone: string
}
export const updateProfile = () =>
    useMutation({
        mutationFn: async ({ name, ci, guardian_name, email, phone }: UpdateProfileParams) => {
            const response = await client.put("/api/v1/admit_card/current/", { name, ci, guardian_name, email, phone });
            return response.data;
        }
    })

