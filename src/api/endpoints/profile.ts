import { useQuery, useMutation } from 'react-query'
import { client } from '~/api/client'

export const getProfile = (profileId: number) =>
    useQuery(["profile", profileId], async () => {
        const response = await client.get(`api/v1/profile/${profileId}/`);
        return response.data;
    }, {
        enabled: profileId
    })

export type UpdateProfileParams = {
    data : {
        name : string,
        ci : string,
        phone : string,
        email : string,
        guardian_name : string
    }

}
export const updateProfile = () =>
    useMutation({
        mutationFn: async ({ data }: UpdateProfileParams) => {
            const response = await client.put(
                `api/v1/admit_card/current/`,
                data
            );
            return response.data;
        }
    })
