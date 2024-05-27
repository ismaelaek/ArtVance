import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	products: [],
	prodisLoading: false,
	error: null,
};

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products/all");
            return response.data;
        } catch (error) {
            return error.message;
        }
    }
);
    

export const addProduct = createAsyncThunk(
	"products/addProduct",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/products",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
            );
            console.log(response.data);
            return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || "Error adding product");
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.prodisLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.prodisLoading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.prodisLoading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.prodisLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.prodisLoading = false;
                // state.products.append(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.prodisLoading = false;
                state.error = action.error.message;
            });
	},
});

export default productSlice.reducer;
