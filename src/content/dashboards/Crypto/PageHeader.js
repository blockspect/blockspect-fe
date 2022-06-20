import { Typography, Avatar, Grid, useTheme } from '@mui/material';

const str = localStorage.getItem('maindata');
const user = JSON.parse(str);

function PageHeader() {

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user?.name}
          src={user?.logo}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="subtitle2">
          {user?.contractAddress}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
