import { Flex, Input, Text } from '@chakra-ui/react';

export const AppFilter = (): React.ReactElement => (
  <Flex justifyContent={'space-around'} alignItems="center" p="2" border={'1px'}>
    <Text>Installed</Text>
    <Text>Bucket/extas</Text>
    <Text>recent updates</Text>
    <Input placeholder="Basic usage" w={'auto'} />
  </Flex>
);
