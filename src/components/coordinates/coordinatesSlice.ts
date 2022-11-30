import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coordinateRange, CoordinatesBox, isValid } from './coordinate';

export interface CoordinatesState {
  fields: CoordinatesBox;
  fieldErrors: Record<keyof CoordinatesBox, string[]>;
}

const initialState: CoordinatesState = {
  fields: {
    southLatitude: { direction: 'latitude', value: null },
    northLatitude: { direction: 'latitude', value: null },
    westLongitude: { direction: 'longitude', value: null },
    eastLongitude: { direction: 'longitude', value: null },
  },
  fieldErrors: {
    southLatitude: [], northLatitude: [], westLongitude: [], eastLongitude: [],
  },
};

export const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {
    clear: () => ({ ...initialState }),
    setValue: (
      state: CoordinatesState,
      action: PayloadAction<{ name: keyof CoordinatesBox, value: string }>,
    ) => {
      const { name, value } = action.payload;
      const numValue = parseFloat(value);

      if (Number.isNaN(numValue)) {
        return {
          fieldErrors: { ...state.fieldErrors, [name]: [] },
          fields: {
            ...state.fields,
            [name]: { ...state.fields[name], value: value === '' ? null : 0 },
          },
        };
      }

      const { direction } = state.fields[name];
      const error = !isValid(numValue, direction)
        ? `Value must be between ${coordinateRange[direction].join(' and ')}`
        : null;

      return {
        fields: {
          ...state.fields,
          [name]: { ...state.fields[name], value: numValue },
        },
        fieldErrors: { ...state.fieldErrors, [name]: error ? [error] : [] },
      };
    },
  },
});

const { actions, reducer } = coordinatesSlice;
export const { clear, setValue } = actions;

export default reducer;
