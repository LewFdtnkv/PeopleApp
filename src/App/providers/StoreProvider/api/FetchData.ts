import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPeopleProps } from "../types/PeopleDataTypes";

const BASE_URL = import.meta.env.PROD
  ? "https://690cee65a6d92d83e84ffc5a.mockapi.io"
  : "/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsersPage",
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/user?page=${page}&limit=${limit}`);
      if (!res.ok) return rejectWithValue(await res.text());
      const data = (await res.json()) as IPeopleProps[];

      const totalRes = await fetch(`${BASE_URL}/user`);
      if (!totalRes.ok) return rejectWithValue(await totalRes.text());
      const totalUsers = (await totalRes.json()).length;

      return { users: data, totalUsers };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Unknown error");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: Partial<IPeopleProps>, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) return rejectWithValue(await res.text());
      return (await res.json()) as IPeopleProps;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Unknown error");
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }: { id: string; data: IPeopleProps }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), 
      });

      if (!res.ok) return rejectWithValue(await res.text());
      return (await res.json()) as IPeopleProps;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Unknown error");
    }
  }
);

