import { useMutation } from 'react-query';
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
    {
}
