import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function FileInput({ onChange }) {
  return (
    <label htmlFor="file-input">
      Upload whatsapp chat
      <br />
      <input id="file-input" type="file" onChange={(e) => { onChange(e.target.files[0]); }} />
    </label>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

function App() {
  const onChange = (file) => {
    const fileReader = new FileReader();
    // eslint-disable-next-line no-unused-vars
    fileReader.onloadend = (e) => {
      console.log(fileReader.result);
    };
    fileReader.readAsText(file);
  };
  return (
    <div>
      <FileInput onChange={onChange} />
    </div>
  );
}

export default App;
