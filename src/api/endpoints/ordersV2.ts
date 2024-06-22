import { useQuery, useMutation } from 'react-query'
import { client } from '~/api/client'


export const getOrderPrice = (championshipId: number, examinationIds: number[]) =>
    useQuery(["orderPrice", championshipId, examinationIds], async () => {
        const response = await client.post("api/v2/order/calculate/", { championship_id: championshipId, examination_ids: examinationIds });
        return response.data;
    }, {
        enabled: championshipId && examinationIds.length > 0
    })


export type CreateOrderParams = {
    championshipId: number,
    examinationIds: number[],
    name: string,
    phone: string,
    country_code: string,
    email: string
}
export const createOrder = () =>
    useMutation({
        mutationFn: async (params: CreateOrderParams) => {
            const response = await client.post("api/v2/order/", {
                order:
                {
                    championship_id: params.championshipId,
                    examination_ids: params.examinationIds,
                },
                profile:
                {
                    name: params.name,
                    email: params.email,
                    phone: params.phone,
                    country_code: params.country_code
                }
            });
            return response.data;
        }
    })


export type CaptureOrderParams = {
    orderId: string,
    paymentId: string,
    signature: string
}
export const captureOrder = () =>
    useMutation({
        mutationFn: async ({ orderId, paymentId, signature }: CaptureOrderParams) => {
            const response = await client.post(
                `api/v2/order/${orderId}/capture/`,
                { payment_id: paymentId, signature }
            );
            return response.data;
        }
    })

