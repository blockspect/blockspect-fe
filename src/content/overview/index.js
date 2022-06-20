import { useEffect } from 'react';

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
  useEffect(() => {
    localStorage.removeItem("maindata")
    localStorage.removeItem("newData")
    localStorage.removeItem("address")
  }, [])
  // const Background = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7BFhDHQVt10DIAd89iQgOBE05NiiZ6273Q&usqp=CAU"
  return (
    <OverviewWrapper>
      <Container maxWidth="lg" >
        <Card sx={{ p: 10, mb: 10,mt:15, borderRadius: 12 }} >
          <Hero />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
