import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const endToken = '__end__';
const startToken = '__start__';
export default function ChatGenerator({ trainData }) {
  // eslint-disable-next-line no-unused-vars
  const [outputData, setOutputData] = useState([]);
  const [lista, setLista] = useState([]);
  const [markovChain, setMarkovChain] = useState({ markov: {}, markovUser: {} });
  const buildMarkovChain = (chat) => {
    let sender;
    const markovAux = {};
    const markovUserAux = {};
    let start;
    let message;
    let lastWord;
    let lastUser = null;
    let words;
    // let count = 0;
    chat.forEach((line) => {  
      // eslint-disable-next-line prefer-destructuring
      if (line.indexOf(':') !== -1) {
        // eslint-disable-next-line prefer-destructuring
        sender = line.split(':')[0];
        start = line.indexOf(':');
        message = line.slice(start + 1, line.length);
        // Adds user to the markov chain
        if (!(sender in markovUserAux)) {
          markovUserAux[sender] = [];
          markovAux[sender] = Object.create(null);
          markovAux[sender][endToken] = [];
        }
        if (lastUser !== null) {
          markovUserAux[lastUser].push(sender);
        }
        words = message.split(' ');
        lastWord = startToken;
        // Adds every word to the user markov chain
        words.forEach((word) => {
          if (!(lastWord in markovAux[sender])) {
            markovAux[sender][lastWord] = [];
          }
          markovAux[sender][lastWord].push(word);
          lastWord = word;
        });
        if (!(lastWord in markovAux[sender])) {
          markovAux[sender][lastWord] = [];
        }
        markovAux[sender][lastWord].push(endToken);
        lastUser = sender;
      }
    });
    setMarkovChain({ markov: markovAux, markovUser: markovUserAux });
  };
  const generateChat = (markov, markovUser, numberOfMessages) => {
    const users = Object.keys(markovUser);
    if (users.length > 0) {
      let user = users[Math.floor(Math.random() * users.length)];
      const conversation = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < numberOfMessages; i++) {
        // eslint-disable-next-line prefer-template
        let message = user + ':';
        let word = startToken;
        while (word !== endToken) {
          word = markov[user][word][Math.floor(Math.random() * markov[user][word].length)];
          if (word !== endToken) {
            // eslint-disable-next-line prefer-template
            message = message + ' ' + word;
          }
        }
        conversation.push(message);
        user = markovUser[user][Math.floor(Math.random() * markovUser[user].length)];
      }
      setOutputData(conversation);
    }
  };
  useEffect(() => {
    setLista(trainData.split('\n').filter((line) => {
      const re = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,2}, .*:.* .[Mm] - /;
      return re.test(line);
    }).map((line) => line.split('-')[1]));
  }, [trainData]);
  useEffect(() => {
    console.log(lista);
    buildMarkovChain(lista);
  }, [lista]);
  useEffect(() => {
    generateChat(markovChain.markov, markovChain.markovUser, 50);
  }, [markovChain]);
  return (
    <div>
      {
        outputData.map((line) => (
          <div>
            {line}
            <br />
            <br />
          </div>
        ))
      }
    </div>
  );
}

ChatGenerator.propTypes = {
  trainData: PropTypes.string.isRequired,
};
