import { createAsyncThunk } from "@reduxjs/toolkit";
import type{ IPeopleProps } from "../types/PeopleDataTypes";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsersPage",
  async ({ page, limit }: { page: number; limit: number }, {rejectWithValue}) => {
    const res = await fetch(
      `/api/user?page=${page}&limit=${limit}`
    );
    if(!res.ok)return rejectWithValue(await res.text());
    const data = (await res.json()) as IPeopleProps[];
    const totalRes = await fetch("/api/user")
    if(!totalRes.ok)return rejectWithValue(await res.text());
    const totalUsers = (await totalRes.json()).length
    
    return { users: data , totalUsers };
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: Partial<IPeopleProps>, { rejectWithValue }) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      return rejectWithValue(await res.text());
    }

    return (await res.json()) as IPeopleProps;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data, }: { id: string; data: Partial<IPeopleProps> }, {rejectWithValue}) => {
    const res = await fetch(`/api/user/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      return rejectWithValue(await res.text());
    }

    return (await res.json()) as IPeopleProps;
  }
);
