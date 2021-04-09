import { React, useState } from 'react';
import './App.css';
import FileInput from './FileInput';
import ChatGenerator from './ChatGenerator';

function App() {
  const [trainData, setTrainData] = useState('');
  const handleFileInput = (file) => {
    const fileReader = new FileReader();
    // eslint-disable-next-line no-unused-vars
    fileReader.onloadend = (e) => {
      setTrainData(fileReader.result);
    };
    fileReader.readAsText(file);
  };
  return (
    <div>
      <FileInput onChange={handleFileInput} />
      <ChatGenerator trainData={trainData} />
    </div>
  );
}

export default App;
