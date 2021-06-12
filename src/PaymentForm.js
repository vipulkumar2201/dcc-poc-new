import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useDebouncedCallback } from 'use-debounce';
import {startService, continueService, APP_ID_SXP, SXP_USER_ID, SXP_CHANNEL_NAME} from './Api';

export default function PaymentForm() {

  const [id, setId] = React.useState('');
  const [city, setcity] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [country, setcountry] = React.useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await startService();
      setId(response.data.url);
    }
    fetchData();
  }, []);

  const debounced = useDebouncedCallback(async () => {
    console.log('country debounced', address, country);
    if(!address || !country) {
      const dataObject =     {
        appId: APP_ID_SXP,
        state: {
          address,
          country,
          ...JSON.parse(localStorage.getItem('prevData'))
        },
        userId: SXP_USER_ID,
        channel: SXP_CHANNEL_NAME
      }
      await continueService(id, dataObject);
    }
  }, 1000);

  const passOn = useDebouncedCallback(async () => {
    console.log('all debounced', address, city, country);
      const dataObject =     {
        appId: APP_ID_SXP,
        state: {
          address,
          city, country,
          ...JSON.parse(localStorage.getItem('prevData'))
        },
        userId: SXP_USER_ID,
        channel: SXP_CHANNEL_NAME
      }
      await continueService(id, dataObject);
  }, 1000);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
            label="Address line 1"
            fullWidth
            autoComplete="personal address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="personal address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={country}
            onChange={(e) => {
              setcountry(e.target.value);
              debounced(e.target.value);
            }}
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={city}
            onChange={(e) => {
              setcity(e.target.value);
              passOn(e.target.value);
            }}
            label="City"
            fullWidth
            autoComplete="city-name"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
