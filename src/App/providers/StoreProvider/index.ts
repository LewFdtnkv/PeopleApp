import { store, persistor } from "./config/ui/store";
export { editUser, createUser, fetchUsers } from "./api/FetchData";
import { peopleSlice } from "./slice/PeopleSlice";

export type { IPeopleProps } from "./types/PeopleDataTypes";
export type { PeopleState } from "./types/PeopleDataTypes";

export const { setPage, updateUser, clearError } = peopleSlice.actions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export {store, persistor}