import { useQuery, useMutation, useQueryClient } from 'react-query'
import { client } from '~/api/client'

export const getProfile = () =>
    useQuery("profile", async () => {
        const response = await client.get(`api/v1/admit_card/current/`);
        return response.data;
    })

export type UpdateProfileParams = {

    name : string,
    ci : string,
    phone : string,
    email : string,
    guardian_name : string

}
export const updateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ( data: UpdateProfileParams) => {
            const response = await client.put(
                `api/v1/admit_card/current/`,
                data
            );
            return response.data;
        },
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries("profile")

        },
    })

}
    
