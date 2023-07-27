import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

interface CacheDetail {
  total: number;
  size: string;
}

export const AppStatus = (): React.ReactElement => {
  const baseURL = 'http://localhost:8080/scoop/cache/show';
  const { data, isLoading, isError } = useQuery<CacheDetail>(['cacheshow'], async () => {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Failed to fetch bucket list');

    return response.json();
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data</Text>;

  return (
    <Box flex={'1'} border={'1px'}>
      <Text>Total : {data.total}</Text>
      <Text>Size : {data.size}</Text>
    </Box>
  );
};
