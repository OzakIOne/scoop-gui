import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const BucketList = ({ isInstalled }: { isInstalled: boolean }): React.ReactElement => {
  const queryClient = useQueryClient();
  const queryKey = isInstalled ? 'installedBuckets' : 'availableBuckets';
  const baseURL = 'http://localhost:8080/bucket';
  const { data, isLoading, isError } = useQuery<string[]>([queryKey], async () => {
    const url = isInstalled ? `${baseURL}/list/installed` : `${baseURL}/list/notinstalled`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch bucket list');

    return response.json();
  });

  const mutation = useMutation(
    async (bucket: string) => {
      const url = isInstalled
        ? `${baseURL}/remove?appName=${bucket}`
        : `${baseURL}/add?appName=${bucket}`;

      return fetch(url);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    },
  );

  const modifyBucket = (bucket: string) => {
    mutation.mutate(bucket);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data</Text>;

  return (
    <Box flex={'1'} border="1px">
      <Text fontSize={'larger'} align="center" py="4">
        {isInstalled ? 'Installed buckets' : 'Available buckets'}
      </Text>
      <UnorderedList>
        {data.map((bucket) => (
          <Box key={bucket}>
            <ListItem
              listStyleType={'none'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              paddingRight={2}
              paddingLeft={2}
            >
              {bucket}
              {isInstalled ? (
                <DeleteIcon
                  cursor={mutation.isLoading ? 'not-allowed' : 'pointer'}
                  opacity={mutation.isLoading ? 0.5 : 1}
                  pointerEvents={mutation.isLoading ? 'none' : 'auto'}
                  onClick={() => {
                    modifyBucket(bucket);
                  }}
                />
              ) : (
                <AddIcon
                  cursor={mutation.isLoading ? 'not-allowed' : 'pointer'}
                  opacity={mutation.isLoading ? 0.5 : 1}
                  pointerEvents={mutation.isLoading ? 'none' : 'auto'}
                  onClick={() => {
                    modifyBucket(bucket);
                  }}
                />
              )}
            </ListItem>
          </Box>
        ))}
      </UnorderedList>
    </Box>
  );
};
