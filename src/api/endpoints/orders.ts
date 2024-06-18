import { useQuery, useMutation } from 'react-query'
import { client } from '~/api/client'


export const getOrderPrice = (championshipId: number, examinationIds: number[]) =>
  useQuery(["orderPrice", championshipId, examinationIds], async () => {
    const response = await client.post("api/v1/order/calculate", { championship_id: championshipId, examination_ids: examinationIds });
    return response.data;
  })


export type CreateOrderParams = {
  championshipId: number,
  examinationIds: number[]
}
export const createOrder = () =>
  useMutation({
    mutationFn: async ({ championshipId, examinationIds }: CreateOrderParams) => {
      const response = await client.post("api/v1/order", { championship_id: championshipId, examination_ids: examinationIds });
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
        `api/v1/order/${orderId}/capture`,
        { payment_id: paymentId, signature }
      );
      return response.data;
    }
  })

