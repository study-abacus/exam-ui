import { useQuery } from 'react-query'
import { client } from '~/api/client'


export const listExaminations = (championshipId: number) => useQuery(["examinations", championshipId], async () => {
  const response = await client.get("api/v1/examination/", { params: { championship_id: championshipId } });
  return response.data;
})

export const getExamination = (examinationId: number) => useQuery(["examinations", examinationId], async () => {
  const response = await client.get(`api/v1/examination/${examinationId}`);
  return response.data;
})