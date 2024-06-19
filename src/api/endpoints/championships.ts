import { useQuery } from 'react-query'
import { client } from '~/api/client'


export const listChampionships = () => useQuery("championships", async () => {
  const response = await client.get("api/v1/championships/");
  return response.data;
})

