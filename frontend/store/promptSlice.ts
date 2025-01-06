import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { promptApi, Prompt, CreatePromptData } from '../services/api';

interface PromptState {
  prompts: Prompt[];
  currentPrompt: Prompt | null;
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  prompts: [],
  currentPrompt: null,
  loading: false,
  error: null,
};

export const createPrompt = createAsyncThunk(
  'prompt/create',
  async (data: CreatePromptData) => {
    const response = await promptApi.create(data);
    return response;
  }
);

export const getPrompts = createAsyncThunk('prompt/getAll', async () => {
  const response = await promptApi.getAll();
  return response;
});

export const getPromptById = createAsyncThunk(
  'prompt/getById',
  async (id: string) => {
    const response = await promptApi.getById(id);
    return response;
  }
);

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPrompt: (state) => {
      state.currentPrompt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Prompt
      .addCase(createPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPrompt = action.payload;
        state.prompts.push(action.payload);
      })
      .addCase(createPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      // Get All Prompts
      .addCase(getPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload;
      })
      .addCase(getPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      // Get Prompt by ID
      .addCase(getPromptById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPromptById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPrompt = action.payload;
      })
      .addCase(getPromptById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export const { clearError, clearCurrentPrompt } = promptSlice.actions;
export default promptSlice.reducer; 