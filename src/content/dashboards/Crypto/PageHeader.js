import { Typography, Avatar, Grid, useTheme } from '@mui/material';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const str = localStorage.getItem('maindata');
const user = JSON.parse(str);

const address = localStorage.getItem('address');

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
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="button-tooltip-2">
                <p style={{ fontWeight: 'bolder' }}>Full Hash :</p> {address}
              </Tooltip>
            }
          >
            {({ ref, ...triggerHandler }) => (
              <div {...triggerHandler}>
                <p className="my-2" ref={ref}>
                  Welcome,{' '}
                  {address.slice(0, 5) +
                    '....' +
                    address.slice(-5, -1) +
                    address.slice(-1)}
                </p>
              </div>
            )}
          </OverlayTrigger>
        </Typography>
        <Typography variant="subtitle2">{address}</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
