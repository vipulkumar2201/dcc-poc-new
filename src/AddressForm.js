import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useDebouncedCallback } from 'use-debounce';
import {startService, continueService, APP_ID_SXP, SXP_USER_ID, SXP_CHANNEL_NAME} from './Api';

const query = ['Yes','No'];

const titles = ['Miss','Mr','Ms.','Mrs.'];

const nationalties = ['USA','UAE','India','France', 'Germany'];

export default function AddressForm() {

  const [id, setId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [residency, setPlace] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [jobTitle, setJobTitle] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [emiratesId, setEmiratesId] = React.useState('');
  const [nationality, setNationality] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const debounced = useDebouncedCallback(async () => {
    console.log('last name debounced', userName, title, firstName, lastName);
    if(!userName || !firstName || !lastName) {
      const dataObject =     {
        appId: APP_ID_SXP,
        state: {
          userName,
          title,
          firstName,
          lastName
        },
        userId: SXP_USER_ID,
        channel: SXP_CHANNEL_NAME
      }
      await continueService(id, dataObject);
    }
  }, 1000);

  // const nationaldebounced = useDebouncedCallback(async () => {
  //   console.log('last name debounced', userName, title, firstName, lastName);
  //     const dataObject =     {
  //       appId: APP_ID_SXP,
  //       state: {
  //         userName, nationality,
  //         title,
  //         firstName,
  //         lastName
  //       },
  //       userId: SXP_USER_ID,
  //       channel: SXP_CHANNEL_NAME
  //     }
  //     await continueService(id, dataObject);
  // }, 1000);

  const reddebounced = useDebouncedCallback(async () => {
    console.log('last name debounced', userName, title, firstName, lastName);
      const dataObject =     {
        appId: APP_ID_SXP,
        state: {
          userName, nationality,
          title, residency,
          firstName,
          lastName
        },
        userId: SXP_USER_ID,
        channel: SXP_CHANNEL_NAME
      }
      await continueService(id, dataObject);
  }, 1000);

  const usernameDebounce = useDebouncedCallback(async () => {
    const dataObject =     {
      appId: APP_ID_SXP,
      state: {
        userName,
      },
      userId: SXP_USER_ID,
      channel: SXP_CHANNEL_NAME
    }
    await continueService(id, dataObject);
  }, 1000);

  const emailDebounced = useDebouncedCallback(async () => {
    console.log('email debounced', nationality, residency, emiratesId, email);
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/i;
    const em = email.match(regex);
      const dataObject =     {
        appId: APP_ID_SXP,
        state: {
          userName, nationality,
          title, residency,
          firstName, emiratesId,
          lastName, email
        },
        userId: SXP_USER_ID,
        channel: SXP_CHANNEL_NAME
      }
      await continueService(id, dataObject);
  }, 1000);
  const fitstnameDebounce = useDebouncedCallback(async () => {
    const dataObject =     {
      appId: APP_ID_SXP,
      state: {
        userName,
        title, firstName
      },
      userId: SXP_USER_ID,
      channel: SXP_CHANNEL_NAME
    }
    await continueService(id, dataObject);
  }, 1000);

  const mobileDebounce = useDebouncedCallback(async () => {
    const dataObject =     {
      appId: APP_ID_SXP,
      state: {
        userName, nationality,
        title, residency,
        firstName, emiratesId,
        lastName, email, mobile
      },
      userId: SXP_USER_ID,
      channel: SXP_CHANNEL_NAME
    }
    await continueService(id, dataObject);
  }, 1000);

  const jbtDebounce = useDebouncedCallback(async () => {
    const dataObject =     {
      appId: APP_ID_SXP,
      state: {
        userName, nationality,
        title, residency, jobTitle,
        firstName, emiratesId,
        lastName, email, mobile
      },
      userId: SXP_USER_ID,
      channel: SXP_CHANNEL_NAME
    }
    await continueService(id, dataObject);
  }, 1000);

  const ps1Debounce = useDebouncedCallback(async () => {
    const dataObject =     {
      appId: APP_ID_SXP,
      state: {
        userName, nationality, password,
        title, residency, jobTitle, 
        firstName, emiratesId,
        lastName, email, mobile
      },
      userId: SXP_USER_ID,
      channel: SXP_CHANNEL_NAME
    }
    await continueService(id, dataObject);
  }, 1000);

  const passDebounced = useDebouncedCallback(async () => {
    console.log('pass debounced', mobile, jobTitle, password, passwordConfirm);
    const regex = /^[6-9](\d{9}|\d{11})$/gm;
    const em = mobile.match(regex);
    const dataObject =     {
      appId: APP_ID_SXP,
      state: {
        userName, nationality, jobTitle,
        title, residency, passwordConfirm,
        firstName, emiratesId, email,
        lastName, password, mobile
      },
      userId: SXP_USER_ID,
      channel: SXP_CHANNEL_NAME
    }
    localStorage.setItem('prevData', JSON.stringify(dataObject.state))
      await continueService(id, dataObject);
  }, 1000);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleNationality = (event) => {
    setNationality(event.target.value);
    // nationaldebounced(event.target.value);
  };

  const handlePlace = (event) => {
    setPlace(event.target.value);
    reddebounced(event.target.value);
  };

  useEffect(() => {
    window.onbeforeunload = function() {
      localStorage.removeItem('prevData')
    };
    async function fetchData() {
      const response = await startService();
      setId(response.data.url);
      if(localStorage.getItem('prevData')) {
        const storedData = JSON.parse(localStorage.getItem('prevData'))
        setTitle(storedData.title)
        setEmail(storedData.email)
        setMobile(storedData.mobile)
        setPlace(storedData.residency)
        setUserName(storedData.userName)
        setLastName(storedData.lastName)
        setPassword(storedData.password)
        setJobTitle(storedData.jobTitle)
        setFirstName(storedData.firstName)
        setEmiratesId(storedData.emiratesId)
        setNationality(storedData.nationality)
        setPasswordConfirm(storedData.passwordConfirm)
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
              usernameDebounce(e.target.value);
            }}
            label="User Name"
            fullWidth
            autoComplete="user-name"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            id="standard-select"
            select
            label="Title"
            fullWidth={true}
            value={title}
            onChange={handleTitle}
          >
            {titles.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
              fitstnameDebounce(e.target.value)
             }
            }
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={lastName}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={(e) => {
              setLastName(e.target.value);
              debounced(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="standard-select-nationality"
            select
            label="Nationality"
            value={nationality} 
            fullWidth={true} 
            onChange={handleNationality}
          >
            {nationalties.map((nation) => (
              <MenuItem key={nation} value={nation}>
                {nation}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="standard-select-residence"
            select
            label="Residency"
            fullWidth={true}
            value={residency}
            onChange={handlePlace}
          >
            {query.map((bool) => (
              <MenuItem key={bool} value={bool}>
                {bool}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={emiratesId}
            onChange={e => setEmiratesId(e.target.value)}
            label="Emirates ID"
            fullWidth
            autoComplete="emirates-id"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={email}
            label="Email"
            fullWidth
            autoComplete="email-id"
            onChange={(e) => {
              setEmail(e.target.value);
              emailDebounced(e.target.value)
            }
           }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={mobile}
            onChange={e => {
              setMobile(e.target.value);
              mobileDebounce(e.target.value);
             }
            }
            label="Mobile"
            fullWidth
            autoComplete="mobile-no"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={jobTitle}
            onChange={e => {
              setJobTitle(e.target.value);
              jbtDebounce(e.target.value);
            }}
            label="Job Title/Position"
            fullWidth
            autoComplete="job-title"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              ps1Debounce(e.target.value)
            }}
            label="Password"
            fullWidth
            autoComplete="password-1"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
              passDebounced(e.target.value);
            }}
            label="Verify Password"
            fullWidth
            autoComplete="password-2"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
