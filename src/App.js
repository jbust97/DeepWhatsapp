import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  AppBar,
  Typography,
  Toolbar,
  Paper,
} from '@material-ui/core';
import FileInput from './FileInput';
import ChatGenerator from './ChatGenerator';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  primary: {
    backgroundColor: '#128C7E',
  },
  primary2: {
    backgroundColor: 'white',
  },
}));

function App() {
  const classes = useStyles();
  const [trainData, setTrainData] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [conversations, setConversations] = useState([]);
  const handleFileInput = (file) => {
    const fileReader = new FileReader();
    // eslint-disable-next-line no-unused-vars
    fileReader.onloadend = (e) => {
      setTrainData(fileReader.result);
    };
    fileReader.readAsText(file);
  };
  makeStyles({});
  return (
    <div>
      <AppBar position="static" className={classes.primary}>
        <Toolbar>
          <Typography variant="h6">
            Whatskov
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.primary2} style={{ margin: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6">
              Noice
            </Typography>
            <FileInput onChange={handleFileInput} />
          </Grid>
          <Grid item xs={9}>
            <ChatGenerator trainData={trainData} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
