import { React } from 'react';
import PropTypes from 'prop-types';

export default function FileInput({ onChange }) {
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
