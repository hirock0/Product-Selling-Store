"use client"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


// Define State Type
interface UserState {
    user: object | null;
    carts:any;
    loading: boolean;
    error: string | null;

}

// Initial State
const initialState: UserState = {
    user: null,
    carts: [],
    loading: false,
    error: null,
};

export const fetchData: any = createAsyncThunk("users/fetcData", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/pages/api/user/decodedUser");
        const user = response?.data?.user
        const cartsResponse = await axios.get("/pages/api/products/carts")
        const carts = cartsResponse?.data?.carts
        return { user, carts };
    } catch (error) {
        return rejectWithValue("Failed to fetch users");
    }
});


const slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        addCart: (state: any, action) => {
            const { payload } = action
            state.carts.push(payload)
        },
        removedCard: () => {

        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.error = null

        })
        builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.carts = action.payload.carts
        })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})
export const { addCart, removedCard } = slice.actions
export default slice.reducer