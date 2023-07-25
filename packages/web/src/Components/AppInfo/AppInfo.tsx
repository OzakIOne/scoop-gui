import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

interface App {
  path: string;
  name: string;
}

interface AppInfo {
  bin: string[] | string;
  description: string;
  version: string;
  homepage: string;
}

export const AppInfo = ({ selectedApp }: { selectedApp: App | undefined }): React.ReactElement => {
  const baseURL = 'http://localhost:8080/scoop/info';
  const { data, isLoading, isError } = useQuery<AppInfo>(['appinfo', selectedApp], async () => {
    const response = await fetch(`${baseURL}?appName=${selectedApp?.name}`);
    if (!response.ok) throw new Error('Failed to fetch bucket list');

    return response.json();
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data</Text>;

  return (
    <Box flex={'1'} border={'1px'}>
      <UnorderedList>
        <ListItem>Name: {data.bin}</ListItem>
        <ListItem>Description: {data.description}</ListItem>
        <ListItem>Version: {data.version}</ListItem>
        <ListItem>
          <Link href={data.homepage} isExternal>
            {data.homepage} <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
