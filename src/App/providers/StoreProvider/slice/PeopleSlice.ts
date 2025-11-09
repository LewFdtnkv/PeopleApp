import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPeopleProps, PeopleState } from "../types/PeopleDataTypes";
import { createUser, editUser, fetchUsers } from "../api/FetchData";

const initialState: PeopleState = {
  pages: {},
  loading: false,
  error: null,
  limit: 4,
  page: 1,
  totalUsers: 0,
};

export const peopleSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    updateUser(state, action: PayloadAction<IPeopleProps>) {
      Object.keys(state.pages).forEach((pageKey) => {
        const key = Number(pageKey);
        if (Number.isNaN(key)) return;
        state.pages[key] = state.pages[key].map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.pages[state.page] = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки пользователей";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        Object.keys(state.pages).forEach((pageKey) => {
          const key = Number(pageKey);
          if (Number.isNaN(key)) return;
          state.pages[key] = state.pages[key].map((u) =>
            u.id === updatedUser.id ? updatedUser : u
          );
        });
      })
      .addCase(editUser.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка редактирования пользователей";
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка создания пользователей";
      })
      .addCase(createUser.fulfilled, (state) => {
        state.totalUsers += 1;
      }) 
  },
});

export const { setPage, updateUser, clearError } = peopleSlice.actions;
export default peopleSlice.reducer;
