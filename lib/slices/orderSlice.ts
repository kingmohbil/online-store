import { createSlice } from '@reduxjs/toolkit';

interface OrderType {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number: string;
  locationDetails: {
    city: string;
    location: string;
  };
  order_details?: {
    products: [
      {
        product_id: string;
        name: string;
        price: number;
        quantity: number;
      }
    ];
    delivery_fees: number;
  };
  confirmed?: boolean;
  delivered: boolean;
  issued_at?: Date;
}

const initialState: OrderType[] = [];

interface LoadAction {
  payload: {
    orders: OrderType[];
  };
}

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadOrders: (state, { payload }: LoadAction) => {
      return payload.orders;
    },
    reset: () => initialState,
  },
});

export default orders.reducer;

export const { loadOrders, reset } = orders.actions;
