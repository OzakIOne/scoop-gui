import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

export const BucketList = (): React.ReactElement => (
  <Box flex={'1'} border="1px">
    <Text fontSize={'larger'} align="center" py="4">
      Installed buckets
    </Text>
    <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
    </UnorderedList>
  </Box>
);
