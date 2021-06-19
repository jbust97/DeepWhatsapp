/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Dialog,
  Paper,
} from '@material-ui/core';

export default function FileInput({ onChange }) {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);

  return (
    <Grid item container spacing={0}>
      <Grid xs={12}>
        <Button variant="contained" color="primary" fullWidth onClick={() => { setOpen(true); }}>Nuevo Chat</Button>
      </Grid>
      <Grid item xs={3}>
        <Dialog open={open} onClose={() => { setOpen(false); }}>
          <Paper style={{
            padding: '20px', maxWidth: '300px', minHeight: '200px', border: 'solid 2px red',
          }}
          >
            <Grid container item style={{ boxSizing: 'border-box', marginTop: '50%', marginBottom: '50%' }}>
              <Grid item xs={12}>
                <div style={{ margin: 'auto' }}>
                  <Button variant="contained" color="primary">
                    <label htmlFor="file-input">
                      Subir un chat de whatsapp
                    </label>
                    <input style={{ display: 'none' }} id="file-input" type="file" onChange={(e) => { onChange(e.target.files[0]); }} />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Dialog>
      </Grid>
    </Grid>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};
