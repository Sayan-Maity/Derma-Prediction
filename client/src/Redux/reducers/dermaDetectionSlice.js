import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const predictDermaDetection = createAsyncThunk(
  "dermaDetection/predict",
  async (dataUri, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://bilalsardar-skin-diseases-classification.hf.space/run/predict",
        { data: [dataUri] }
      );
      if (response.status === 200) {
        console.log("API response =>", response);
        return response.data.data[0];
      } else {
        return rejectWithValue("Failed to get prediction");
      }
    } catch (error) {
      return rejectWithValue("API call failed");
    }
  }
);

const bardDermaDiseaseInfo = createAsyncThunk(
  "dermaDetection/predict",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/dermaFinalPrompt`,
        { data: data, symptomPrompt: "" }
      );
      if (response.status === 200) {
        console.log("API response =>", response);
        return response;
      } else {
        return rejectWithValue("Failed to get prediction");
      }
    } catch (error) {
      return rejectWithValue("API call failed");
    }
  }
);

const dermaDetectionSlice = createSlice({
  name: "dermaDetection",
  initialState: {
    loading: false,
    error: null,
    dermaDetection: null, // Change from {} to null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(predictDermaDetection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(predictDermaDetection.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dermaDetection = action.payload.data; // Assuming you want to store the response data
      })
      .addCase(predictDermaDetection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const selectDermaDetection = (state) =>
  state.dermaDetection.dermaDetection;

export { predictDermaDetection, bardDermaDiseaseInfo };
export default dermaDetectionSlice.reducer;
