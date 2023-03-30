import { Box, ListItem, UnorderedList } from '@chakra-ui/react';

export const AppInfo = (): React.ReactElement => (
  <Box flex={'1'} border={'1px'}>
    <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
    </UnorderedList>
  </Box>
);
