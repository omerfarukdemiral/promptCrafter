import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { promptApi } from '../services/api';

interface PromptState {
  instructions: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  instructions: null,
  loading: false,
  error: null
};

export const generatePrompt = createAsyncThunk(
  'prompt/generate',
  async (data: any) => {
    const response = await promptApi.create(data);
    return response.data;
  }
);

export const getPromptByProjectId = createAsyncThunk(
  'prompt/getByProjectId',
  async (projectId: string) => {
    const response = await promptApi.getByProjectId(projectId);
    return response.data;
  }
);

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    clearPrompt: (state) => {
      state.instructions = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Generate prompt
      .addCase(generatePrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.instructions = action.payload.instructions;
      })
      .addCase(generatePrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      // Get prompt
      .addCase(getPromptByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPromptByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.instructions = action.payload.instructions;
      })
      .addCase(getPromptByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  }
});

export const { clearPrompt } = promptSlice.actions;
export default promptSlice.reducer; 