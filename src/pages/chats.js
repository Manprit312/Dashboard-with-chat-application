import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { SendOutlined } from '@mui/icons-material';
import io from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getallUsers from '../Api/getallusers';

const socket = io.connect('http://localhost:4000');
// import SendIcon from '@material-ui';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    // height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '100vh',
    overflowY: 'auto',
    width: '100%',
  },
  messagetext: {
    height: '39px',
    marginTop: '10px',
    backgroundColor: 'aliceblue',
    padding: '8px',
    borderRadius: '8px',
    textAlign: 'right',
    '&:after': {
      content: '',
      left: '-15px',
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: ' 15px solid #A8DDFD',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      top: ' 0',
    },
  },
  messagetextforu: {
    height: '39px',
    marginTop: '10px',
    backgroundColor: 'pink',
    padding: '8px',
    borderRadius: '8px',
    textAlign: 'left',
  },
});

const Chat = () => {
  const today = new Date();
  const now = `${today.getHours()}` + `:` + `${today.getMinutes()}`;
  console.log(now);
  const [message, setmessage] = useState([]);
  const [data, setdata] = useState('');
  const [yourmsgs, setYourmessages] = useState([]);
  const [array, setArray] = useState([]);
  const logindetails = useSelector((state) => state?.logindata?.loginData?.data?.data);
  const [ar, setar] = useState('');

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const data = await axios.get('http://localhost:4000/allusers');
    const filteredArry = data?.data?.data.filter((t) => t.email !== logindetails);
    setArray(filteredArry);
  };
  const classes = useStyles();

  const handleMessageShoot = () => {
    const msgdata = { time: now, message: ar, id: 2 };
    setmessage((oldArray) => [...oldArray, msgdata]);

    socket.emit('chat message', ar);
  };

  useEffect(() => {
    fetchmessages();
  }, []);
  const mySound = new Audio();
  mySound.src =
    'https://2u039f-a.akamaihd.net/downloads/ringtones/files/mp3/ramzan-ringtone-aya-ramzan-ringtone-download-free-viral-ringtone-128k-m-60167.mp3';
  mySound.load();
  const fetchmessages = () => {
    return socket.on('usermessege', (data) => {
      const msgdata = { time: now, message: data, id: 1 };
      setmessage((oldArray) => [...oldArray, msgdata]);
      // window.scrollTo(0, document.body.scrollHeight);
      mySound.play();
    });
  };
  console.log(message);
  return (
    <div>
      <Grid container>
        <Grid item>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12} md={4} className={classes.borderRight500}>
          <List>
            {array.map((t) => {
              return (
                <ListItem button key={t._id}>
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary={t?.email} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} md={8}>
          <List className={classes.messageArea}>
            {message.map((t, i) => (
              <>
                <ListItem key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {t.id === 2 && (
                    <Grid className={classes.messagetext}>
                      <Grid container item xs={12}>
                        <ListItemText align="right" primary={t.message} />
                      </Grid>
                      <Grid container item xs={12}>
                        <ListItemText align="right" secondary={t.time} />
                      </Grid>
                    </Grid>
                  )}
                </ListItem>
                <ListItem>
                  {t.id === 1 && (
                    <Grid className={classes.messagetextforu}>
                      <Grid item xs={12}>
                        <ListItemText align="left" primary={t.message} />
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText align="left" secondary={t.time} />
                      </Grid>
                    </Grid>
                  )}
                </ListItem>
              </>
            ))}
          </List>
          <Divider />
          <Grid
            style={{
              padding: '20px',
              position: 'fixed',
              top: ' 90%',
              flexWrap: 'nowrap',
              width: '100%',

              background: '#ececec',
            }}
          >
            <Grid item style={{ width: ' 60%' }}>
              <TextField
                onChange={(e) => setar(e.target.value)}
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={ar}
                onKeyPress={(e) => (e.key === 'Enter' ? handleMessageShoot() : null)}
              />
            </Grid>
            <Grid align="right">
              {/* <button
                color="primary"
                style={{
                  borderRadius: '50%',
                  border: '2px solid white',
                  background: 'darkgray',
                  width: '44px',
                  height: '44px',
                }}
                aria-label="add"
                type="submit"
                onClick={() => handleMessageShoot()}
              >
                <SendOutlined style={{ color: 'white' }} />
              </button> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
