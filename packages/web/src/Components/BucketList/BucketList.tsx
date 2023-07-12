import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export const BucketList = ({ isInstalled }: { isInstalled: boolean }): React.ReactElement => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<string[]>(
    [isInstalled ? 'installedBuckets' : 'availableBuckets'],
    async () => {
      const url = isInstalled
        ? 'http://localhost:8080/bucket/list/installed'
        : 'http://localhost:8080/bucket/list/notinstalled';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch bucket list');

      return response.json();
    }
  );

  const mutation = useMutation(
    (bucket: string) => {
      const url = isInstalled
        ? `http://localhost:8080/bucket/remove?appName=${bucket}`
        : `http://localhost:8080/bucket/add?appName=${bucket}`;

      return fetch(url);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(isInstalled ? 'installedBuckets' : 'availableBuckets');
      },
    }
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
        {data?.map((bucket) => (
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
                  onClick={() => modifyBucket(bucket)}
                />
              ) : (
                <AddIcon
                  cursor={mutation.isLoading ? 'not-allowed' : 'pointer'}
                  opacity={mutation.isLoading ? 0.5 : 1}
                  pointerEvents={mutation.isLoading ? 'none' : 'auto'}
                  onClick={() => modifyBucket(bucket)}
                />
              )}
            </ListItem>
          </Box>
        ))}
      </UnorderedList>
    </Box>
  );
};
