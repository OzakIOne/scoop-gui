import { Box } from '@chakra-ui/react';

import { AppContainer } from '../AppContainer/AppContainer';
import { BucketWrapper } from '../BucketWrapper/BucketsWrapper';

export const App = (): React.ReactElement => (
  <Box>
    <BucketWrapper></BucketWrapper>
    <AppContainer></AppContainer>
  </Box>
);
