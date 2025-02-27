"use client"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


// Define State Type
interface UserState {
    user: object | null;
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetcData: any = createAsyncThunk("users/fetcData", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/pages/api/user/decodedUser");
        return response?.data?.user;
    } catch (error) {
        return rejectWithValue("Failed to fetch users");
    }
});


const slice: any = createSlice({
    name: "slice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetcData.pending, (state) => {
            state.loading = true;
            state.error = null

        })
        builder.addCase(fetcData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(fetcData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})
export const { } = slice.actions
export default slice.reducer