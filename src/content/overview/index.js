import { Box, Container, Card, styled} from '@mui/material';

import Hero from './Hero';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Container maxWidth="lg">
        <Card sx={{ p: 10, mb: 10,mt:15, borderRadius: 12 }} style={{backgroundColor:' #333'}}>
          <Hero />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
