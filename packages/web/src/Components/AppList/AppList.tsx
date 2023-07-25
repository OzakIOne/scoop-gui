import { Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { AppFilter } from '../AppFilter/AppFilter';

interface App {
  path: string;
  name: string;
}

export const AppList = ({
  selectedApp,
  setSelectedApp,
}: {
  selectedApp: App | undefined;
  setSelectedApp: (app: App) => void;
}): React.ReactElement => {
  const baseURL = 'http://localhost:8080/app/list';

  const { data, isLoading, isError } = useQuery<App[]>(['applist'], async () => {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Failed to fetch bucket list');

    return response.json();
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error occurred while fetching data</Text>;

  return (
    <Flex flex={'1'} border={'1px'} direction="column" minH={'0'}>
      <AppFilter></AppFilter>
      <UnorderedList overflowY={'auto'}>
        {data.map((app) => {
          const isSelected = selectedApp === app;
          return (
            <ListItem
              style={{ color: isSelected ? 'red' : 'black' }}
              onClick={() => {
                setSelectedApp(app);
              }}
              key={app.path + app.name}
            >
              {app.name}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Flex>
  );
};
