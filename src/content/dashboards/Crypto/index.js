import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import AccountBalance from './AccountBalance';
// import Wallets from './Wallets';
// import AccountSecurity from './AccountSecurity';
// import WatchList from './WatchList';

import {useLocation} from 'react-router-dom';
import Nfts from './Nfts';
// import ProfileData from './ProfileData';

function DashboardCrypto() {

  const location = useLocation();
  console.log("locationlocation",location)
  return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {/* <Grid item xs={12} md={8}>
            <ProfileData />
          </Grid> */}
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item xs={12}>
            <Nfts/>
          </Grid>
          {/* <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCrypto;
