import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { buildMarkovChain, generateChat } from './markov';

const colon = ' :';
export default function ChatGenerator({ trainData }) {
  // eslint-disable-next-line no-unused-vars
  const [outputData, setOutputData] = useState([]);
  const [listaDeMensajes, setListaDeMensajes] = useState([]);
  const [markovChain, setMarkovChain] = useState({ markov: {}, markovUser: {} });
  const [message, setMessage] = useState('');
  useEffect(() => {
    setListaDeMensajes(trainData.split('\n').filter((line) => {
      const re = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}, .*:.* .[Mm] - /;
      return re.test(line);
    }).map((line) => line.split('-')[1]));
  }, [trainData]);
  useEffect(() => {
    const builtMarkov = buildMarkovChain(listaDeMensajes);
    setMarkovChain({ markov: builtMarkov.markovAux, markovUser: builtMarkov.markovUserAux });
  }, [listaDeMensajes]);
  useEffect(() => {
    const conversation = generateChat(markovChain.markov, markovChain.markovUser, 10);
    setOutputData(conversation);
  }, [markovChain]);
  const sendMessage = () => {
    const randNum = Math.floor(Math.random() * 5) + 1;
    const conversation = generateChat(markovChain.markov, markovChain.markovUser, randNum);
    setOutputData([...outputData, colon + message, ...conversation]);
    return 0;
  };
  return (
    <Grid
      container
      spacing={3}
      xs={12}
      style={{ border: 'solid black 1px', backgroundColor: 'white' }}
    >
      <Grid item xs={12}>
        <Typography variant="h4">
          Noice
        </Typography>
      </Grid>
      {
        outputData.map((line) => (
          <Grid item xs={12}>
            <Box width="50%" style={line.split(':')[0] === ' ' ? { marginLeft: 'auto' } : {}}>
              <Paper>
                <strong>
                  {line.split(':')[0]}
                </strong>
                <br />
                {line.split(':').slice(1).join('')}
              </Paper>
            </Box>
          </Grid>
        ))
      }
      <Grid item xs={10}>
        <input type="text" style={{ width: '100%' }} onChange={(e) => { setMessage(e.target.value); }} />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => sendMessage()} variant="contained" color="primary">
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}

ChatGenerator.propTypes = {
  trainData: PropTypes.string.isRequired,
};
