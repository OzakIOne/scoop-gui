import { Flex } from '@chakra-ui/react';

import { BucketList } from '../BucketList/BucketList';

export const BucketWrapper = (): React.ReactElement => (
  <Flex direction={'column'} gap="2" w={'96'}>
    <BucketList isInstalled={true}></BucketList>
    <BucketList isInstalled={false}></BucketList>
  </Flex>
);
