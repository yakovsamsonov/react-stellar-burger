import { RootState } from '../store';

export const burger = (store: RootState) => store.burger;
export const user = (store: RootState) => store.user;
export const ingredients = (store: RootState) => store.ingredients;
export const order = (store: RootState) => store.order;
export const details = (store: RootState) => store.details;
export const orderHistory = (store: RootState) => store.ws;
