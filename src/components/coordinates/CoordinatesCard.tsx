import {
  Button, Card, CardActions, CardContent, CardHeader, Grid, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CoordinatesCard.scss';
import CoordinateInput from './CoordinateInput';
import { setValue, clear as clearFields } from './coordinatesSlice';
import { CoordinatesBox } from './coordinate';
import { RootState } from '../../app/store';

interface Props {
  error?: string;
  onClear: () => void;
  onChange: (left: number, bottom: number, right: number, top: number) => Promise<void>;
}

function CoordinatesCard({ error, onChange, onClear }: Props) {
  const fields = useSelector<RootState, CoordinatesBox>((s) => s.coordinates.fields);
  const fieldsErrors = useSelector<RootState, Record<keyof CoordinatesBox, string[]>>(
    (s) => s.coordinates.fieldErrors,
  );
  const dispatch = useDispatch();

  const convert = async () => {
    await onChange(
      fields.westLongitude.value ?? 0,
      fields.southLatitude.value ?? 0,
      fields.eastLongitude.value ?? 0,
      fields.northLatitude.value ?? 0,
    );
  };

  const clear = () => {
    dispatch(clearFields());
    onClear();
  };

  const handleChange = (fieldName: keyof CoordinatesBox, value: string) => {
    dispatch(setValue({ name: fieldName, value }));
  };

  const hasErrors = Object.values(fieldsErrors).filter((e) => e.length > 0).length > 0;

  return (
    <Card variant="outlined" className={styles.card}>
      <CardHeader title={(
        <Typography variant="h4" color="primary" textAlign="center">
          Insert OSM coordinates and press&nbsp;&quot;Convert&quot;
        </Typography>
    )}
      />
      <CardContent>
        <Grid container columnSpacing={2} rowSpacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <CoordinateInput
              label="South Latitude"
              value={fields.southLatitude.value}
              errors={fieldsErrors.southLatitude}
              onChange={(v) => handleChange('southLatitude', v)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CoordinateInput
              label="North Latitude"
              value={fields.northLatitude.value}
              errors={fieldsErrors.northLatitude}
              onChange={(v) => handleChange('northLatitude', v)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CoordinateInput
              label="West Longitude"
              value={fields.westLongitude.value}
              errors={fieldsErrors.westLongitude}
              onChange={(v) => handleChange('westLongitude', v)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CoordinateInput
              label="East Longitude"
              value={fields.eastLongitude.value}
              errors={fieldsErrors.eastLongitude}
              onChange={(v) => handleChange('eastLongitude', v)}
            />
          </Grid>
        </Grid>
        {error && <Typography color="red">{error}</Typography>}
      </CardContent>
      <CardActions>
        <Grid container direction="row" spacing={2} className={styles.actions}>
          <Grid item>
            <Button size="medium" variant="contained" onClick={convert} disabled={hasErrors}>
              Convert
            </Button>
          </Grid>
          <Grid item>
            <Button size="medium" variant="contained" onClick={clear}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default CoordinatesCard;
