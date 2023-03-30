import { Flex, ListItem, UnorderedList } from '@chakra-ui/react';

import { AppFilter } from '../AppFilter/AppFilter';

export const AppList = (): React.ReactElement => (
  <Flex flex={'1'} border={'1px'} direction="column" minH={'0'}>
    <AppFilter></AppFilter>
    <UnorderedList overflowY={'auto'}>
      <ListItem py="10">Lorem ipsum dolor sit amet</ListItem>
      <ListItem py="10">Consectetur adipiscing elit</ListItem>
      <ListItem py="10">Integer molestie lorem at massa</ListItem>
      <ListItem py="10">Facilisis in pretium nisl aliquet</ListItem>
      <ListItem py="10">Lorem ipsum dolor sit amet</ListItem>
      <ListItem py="10">Consectetur adipiscing elit</ListItem>
      <ListItem py="10">Integer molestie lorem at massa</ListItem>
      <ListItem py="10">Facilisis in pretium nisl aliquet</ListItem>
    </UnorderedList>
  </Flex>
);
