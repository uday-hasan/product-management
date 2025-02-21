import { ProductCategory } from "@/lib/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
  products: Product[] | [];
  error: string;
  sort: "None" | "Low to High" | "High to Low";
  category: (typeof ProductCategory)[number][];
  search: string;
  favourite: number[];
}

const initialState: InitialState = {
  isLoading: true,
  products: [],
  error: "",
  sort: "None",
  category: [],
  search: "",
  favourite: [],
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (values: Product) => {
    const isExist = localStorage.getItem("products");
    if (!isExist) {
      localStorage.setItem("products", JSON.stringify([values]));
    } else {
      const existingProducts = JSON.parse(isExist);
      const newProducts = [values, ...existingProducts];
      localStorage.setItem("products", JSON.stringify(newProducts));
    }
    return values;
  }
);
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const isExist = localStorage.getItem("products");
    if (!isExist) {
      return [];
    } else {
      const existingProducts = JSON.parse(isExist);
      return existingProducts;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    const isExist = localStorage.getItem("products");
    if (!isExist) {
      return [];
    } else {
      const existingProducts = JSON.parse(isExist);
      const updatedProducts = existingProducts.filter(
        (item: Product) => item.id !== id
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update-product",
  async (values: Product) => {
    const {
      id,
      productImage,
      productName,
      productPrice,
      productCategory,
      productStatus,
      productDescription,
    } = values;
    const isExist = localStorage.getItem("products");
    if (!isExist) {
      return [];
    }
    const existingProducts = JSON.parse(isExist);
    const productIndex = existingProducts.findIndex(
      (p: Product) => p.id === id
    );
    if (productIndex === -1) {
      return [];
    }

    existingProducts[productIndex] = {
      ...existingProducts[productIndex],
      productName,
      productPrice,
      productImage,
      productCategory,
      productStatus,
      productDescription,
    };
    localStorage.setItem("products", JSON.stringify(existingProducts));
    return existingProducts;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSort: (
      state,
      action: PayloadAction<"None" | "High to Low" | "Low to High">
    ) => {
      if (action.payload === state.sort) {
        return;
      }
      state.sort = action.payload;
      switch (action.payload) {
        case "Low to High":
          state.products = state.products.sort(
            (a, b) => Number(a.productPrice) - Number(b.productPrice)
          );
          break;
        case "High to Low": {
          state.products = state.products.sort(
            (b, a) => Number(a.productPrice) - Number(b.productPrice)
          );
          break;
        }
        case "None": {
          state.products = localStorage.getItem("products")
            ? JSON.parse(localStorage.getItem("products")!)
            : [];
        }

        default:
          break;
      }
    },

    setCategory: (
      state,
      payload: PayloadAction<{
        value: (typeof ProductCategory)[number];
        isChecked: boolean;
      }>
    ) => {
      const { value, isChecked } = payload.payload;
      if (isChecked) {
        if (!state.category.includes(value)) {
          state.category = [...state.category, value];
        }
      } else {
        state.category = state.category.filter((item) => item !== value);
      }
      const productsInDB = localStorage.getItem("products");
      if (!productsInDB) {
        state.products = [];
        return;
      }
      if (state.category.length > 0) {
        state.products = JSON.parse(productsInDB).filter((product: Product) =>
          state.category.includes(
            product.productCategory as (typeof ProductCategory)[number]
          )
        );
      } else {
        state.products = JSON.parse(productsInDB);
      }
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      const productsInDB = localStorage.getItem("products");
      if (!productsInDB) {
        state.products = [];
        return;
      }
      if (state.search.length === 0) {
        state.products = JSON.parse(productsInDB);
        return;
      }
      state.products = JSON.parse(productsInDB).filter((product: Product) =>
        product.productName.toLowerCase().includes(state.search.toLowerCase())
      );
    },

    setFavourite: (state, action: PayloadAction<number>) => {
      const isExist = localStorage.getItem("favourite");
      if (!isExist) {
        localStorage.setItem("favourite", JSON.stringify([action.payload]));
        state.favourite = [...state.favourite, action.payload];
      } else {
        const data = JSON.parse(isExist);
        state.favourite = data;
        if (state.favourite.includes(action.payload)) {
          const updated = state.favourite.filter(
            (item: number) => item != action.payload
          );
          state.favourite = updated;
          localStorage.setItem("favourite", JSON.stringify(updated));
        } else {
          state.favourite = [...state.favourite, action.payload];
          localStorage.setItem(
            "favourite",
            JSON.stringify([...state.favourite])
          );
        }
      }
    },
    getFavourite: (state) => {
      const isExist = localStorage.getItem("favourite");
      if (!isExist) {
        state.favourite = [];
      } else {
        state.favourite = JSON.parse(isExist);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.products = [action.payload, ...state.products];
      }
    );
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error.message || "Something went wrong";
      state.isLoading = false;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateProduct.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.products = [];
      state.error = action.error.message || "Something went wrong";
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;

export const { setSort, setCategory, setSearch, setFavourite, getFavourite } =
  productSlice.actions;
