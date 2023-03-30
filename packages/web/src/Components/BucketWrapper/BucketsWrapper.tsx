import { Box } from '@chakra-ui/react';

import { BucketList } from '../BucketList/BucketList';

export const BucketWrapper = (): React.ReactElement => (
  <Box>
    <BucketList></BucketList>
    <BucketList></BucketList>
  </Box>
);
