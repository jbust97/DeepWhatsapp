import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Dialog,
} from '@material-ui/core';

export default function FileInput({ onChange }) {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);

  return (
    <Grid item container spacing={0}>
      <Grid xs={12}>
        <Button variant="contained" fullWidth onClick={() => { setOpen(true); }}>Nuevo Chat</Button>
      </Grid>
      <Grid item xs={3}>
        <Dialog open={open} onClose={() => { setOpen(false); }}>
          <input id="file-input" type="file" onChange={(e) => { onChange(e.target.files[0]); }} />
        </Dialog>
      </Grid>

    </Grid>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};
