import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';

interface Props {
  label: string;
  value: number | null;
  errors: string[];
  onChange: (v: string) => void;
}

function CoordinateInput({
  label, value, errors, onChange,
}: Props): ReactElement {
  return (
    <TextField
      error={!!errors.length}
      helperText={!!errors.length && errors[0]}
      label={label}
      variant="outlined"
      fullWidth
      rows={1}
      type="number"
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default CoordinateInput;
