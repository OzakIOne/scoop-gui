import { Flex } from '@chakra-ui/react';

import { AppContainer } from '../AppContainer/AppContainer';
import { BucketWrapper } from '../BucketWrapper/BucketsWrapper';

export const App = (): React.ReactElement => (
  <Flex h={'100vh'} direction={'row'} gap="0.5rem">
    <BucketWrapper></BucketWrapper>
    <AppContainer></AppContainer>
  </Flex>
);
