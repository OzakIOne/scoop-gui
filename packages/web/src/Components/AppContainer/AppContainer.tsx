import { Flex } from '@chakra-ui/react';

import { AppInfo } from '../AppInfo/AppInfo';
import { AppList } from '../AppList/AppList';
import { AppStatus } from '../AppStatus/AppStatus';

export const AppContainer = (): React.ReactElement => (
  <Flex w={'100%'} border="1px" flexDirection={'column'} p={'2'} gap="2">
    <AppList></AppList>
    <Flex h={'80'} gap="2">
      <AppInfo></AppInfo>
      <AppStatus></AppStatus>
    </Flex>
  </Flex>
);
