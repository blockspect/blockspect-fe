import { useEffect, useState } from 'react';
import {
  Card,
  Box,
  Grid,
  Typography,
  styled,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import Text from 'src/components/Text';
import GetTokenBalance from 'src/content/api/GetTokenBalance';
import axios from 'axios';

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  // const theme = useTheme();

  const { balances, getBalance, ethBalance, getEthBalance } = GetTokenBalance();
  const address = localStorage.getItem('address');

  const [usdPrice, setUsdPrice] = useState();

  const ethToUsd = async () => {
    const a = await axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      .then((res) => {
        console.log(res.data.ethereum);
        setUsdPrice(res.data.ethereum.usd);
      })
      .catch((err) => {
        console.log(err);
      });
    return a;
  };

  useEffect(() => {
    getBalance(address);
    getEthBalance(address);
  }, []);

  useEffect(() => {
    ethToUsd();
  }, [ethBalance]);

  const str = localStorage.getItem('maindata');
  const profileData = JSON.parse(str);
  console.log('profileDataprofileData', profileData);

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Account Balance
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {Math.trunc(usdPrice * ethBalance)} $
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                {ethBalance} ETH
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                  <List
                    disablePadding
                    sx={{
                      width: '100%'
                    }}
                  >
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="BTC"
                          src="https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="ETH"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary="Ethereum"
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true
                        }}
                      />
                      <Box>
                        <Typography align="right" variant="h4" noWrap>
                          {ethBalance?.slice(0, 10)}
                        </Typography>
                        {/* <Text color="error">-12.38%</Text> */}
                      </Box>
                    </ListItem>
                    {balances?.map((token, i) => {
                      return (
                        <ListItem key={i} disableGutters>
                          <ListItemAvatarWrapper>
                            <img alt="BTC" src={token.logo} />
                          </ListItemAvatarWrapper>
                          <ListItemText
                            primary={token.symbol}
                            primaryTypographyProps={{
                              variant: 'h5',
                              noWrap: true
                            }}
                            secondary={token.name}
                            secondaryTypographyProps={{
                              variant: 'subtitle2',
                              noWrap: true
                            }}
                          />
                          <Box>
                            <Typography align="right" variant="h4" noWrap>
                              {token.tokenBalance.slice(0, 10)}
                            </Typography>
                            <Text color="success">
                              {token.tokenBalance.slice(0, 10)}{' '}
                            </Text>
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
