import React from 'react'
import {
    Avatar,
    CardMedia,
    Button,
    IconButton,
    Card,
    styled,
    Box
  } from '@mui/material';


import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

const Input = styled('input')({
    display: 'none'
  });
  
  const AvatarWrapper = styled(Card)(
    ({ theme }) => `
  
      position: relative;
      overflow: visible;
      display: inline-block;
      margin-top: -${theme.spacing(9)};
      margin-left: ${theme.spacing(2)};
  
      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
  );

  const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(1)};
      right: -${theme.spacing(1)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
  );

  const CardCover = styled(Card)(
    ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
  );
  
  const CardCoverAction = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
  `
  );

  const str = localStorage.getItem('maindata');
  const user = JSON.parse(str);

function ProfileData() {
  return (
    <div className='mt-3'>
       <CardCover>
        <CardMedia image={user.coverImg} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.logo} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
    </div>
  )
}

export default ProfileData