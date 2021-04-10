import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { buildMarkovChain, generateChat } from './markov';

export default function ChatGenerator({ trainData }) {
  // eslint-disable-next-line no-unused-vars
  const [outputData, setOutputData] = useState([]);
  const [listaDeMensajes, setListaDeMensajes] = useState([]);
  const [markovChain, setMarkovChain] = useState({ markov: {}, markovUser: {} });
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
    const conversation = generateChat(markovChain.markov, markovChain.markovUser, 50);
    setOutputData(conversation);
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
