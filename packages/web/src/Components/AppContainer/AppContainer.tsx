import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { AppInfo } from '../AppInfo/AppInfo';
import { AppList } from '../AppList/AppList';
import { AppStatus } from '../AppStatus/AppStatus';
interface App {
  path: string;
  name: string;
}
export const AppContainer = (): React.ReactElement => {
  const [selectedApp, setSelectedApp] = useState<App>();
  return (
    <Flex w={'100%'} border="1px" flexDirection={'column'} p={'2'} gap="2">
      <AppList selectedApp={selectedApp} setSelectedApp={setSelectedApp}></AppList>
      <Flex h={'80'} gap="2">
        <AppInfo selectedApp={selectedApp}></AppInfo>
        <AppStatus></AppStatus>
      </Flex>
    </Flex>
  );
};
