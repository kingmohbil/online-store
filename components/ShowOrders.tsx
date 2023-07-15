import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { RootState } from '@/lib/store';
import { reset } from '@/lib/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid';
import { requestAccessToken } from '@/lib/helpers/tokenHelpers';
import { Box, Typography, Button } from '@mui/material';
import { logoutTokens } from '@/lib/helpers/tokenHelpers';

function OrdersComponent() {
  const deliveryColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row?._id,
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.first_name} ${params.row.last_name}`,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row?.location_details?.location,
    },
    {
      field: 'delivered',
      headerName: 'Delivered',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'boolean',
    },
    {
      field: 'date',
      headerName: 'Date',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        new Date(params.row?.issued_at)
          .toLocaleString()
          .replace(/(.*)\D\d+/, '$1'),
    },
    {
      field: 'action',
      headerName: 'Save',
      headerAlign: 'center',
      align: 'center',
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation();
          handleSaveClickForDelivery(params);
        };
        return (
          <Button onClick={onClick} variant="text">
            Save
          </Button>
        );
      },
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row?._id,
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.first_name} ${params.row.last_name}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row?.location_details?.location,
    },
    {
      field: 'date',
      headerName: 'Date',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        new Date(params.row?.issued_at)
          .toLocaleString()
          .replace(/(.*)\D\d+/, '$1'),
    },
    {
      field: 'order',
      headerName: 'Order',
      flex: 1,
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',

      valueGetter: (params) =>
        params.row?.order_details.products
          .map((a: any) => {
            return `${a.quantity} x ${a.name} ${(a.quantity * a.price).toFixed(
              2
            )} JOD`;
          })
          .join(', '),
    },
    {
      field: 'delivery_fees',
      headerName: 'Delivery Fees',
      flex: 1,
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row?.order_details.delivery_fees + ' JOD',
    },
    {
      field: 'confirmed',
      headerName: 'Confirmed',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'boolean',
    },
    {
      field: 'delivered',
      headerName: 'Delivered',
      minWidth: 100,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'boolean',
    },
    {
      field: 'action',
      headerName: 'Save',
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation();
          handleSaveClickForAdmin(params);
        };
        return (
          <Button onClick={onClick} variant="text">
            Save
          </Button>
        );
      },
    },
  ];
  const orders = useSelector((state: RootState) => state.orders);
  const role = useSelector((state: RootState) => state.role.role);
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) logoutTokens(refreshToken);
    dispatch(reset());
    router.replace('/auth/login');
  };

  async function handleSaveClickForAdmin(
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) {
    const api = params.api;
    const confirmed = params.row.confirmed;
    const delivered = params.row.delivered;

    const newConfirmed = api.getCellValue(params.id, 'confirmed');
    const newDelivered = api.getCellValue(params.id, 'delivered');

    if (confirmed === newConfirmed && delivered === newDelivered) return;
    else if (confirmed !== newConfirmed) {
      try {
        await handleRequestWithAccessToken(
          { id: params.id, confirmed: newConfirmed },
          updateOrderStatus,
          logout
        );
      } catch (error) {
        console.log(error);
      }
    } else if (delivered !== newDelivered) {
      try {
        await handleRequestWithAccessToken(
          { id: params.id, delivered: newDelivered },
          updateOrderStatus,
          logout
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleSaveClickForDelivery(
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) {
    const api = params.api;
    const delivered = params.row.delivered;

    const newDelivered = api.getCellValue(params.id, 'delivered');

    if (delivered === newDelivered) return;

    try {
      await handleRequestWithAccessToken(
        { id: params.id, delivered: newDelivered },
        updateOrderStatus,
        logout
      );
    } catch (error) {
      console.log(error);
    }
  }

  return orders.length === 0 ? (
    <></>
  ) : (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          py: 2,
          px: 2,
        }}
      >
        <DataGrid
          columns={role === 'delivery' ? deliveryColumns : columns}
          rows={orders}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          getRowClassName={(params) => `mui-row`}
          sx={{
            backgroundColor: '#fff',

            '& .mui-row': {
              bgcolor: (theme) => theme.palette.grey[200],
            },
          }}
        />
      </Box>
    </>
  );
}
export default OrdersComponent;

async function updateOrderStatus(accessToken: string, body: {}) {
  try {
    const data = await axios.put('/api/orders', body, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function handleRequestWithAccessToken(
  body: any,
  successCb: any,
  errorCb: any
) {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  if (!refreshToken || !accessToken) errorCb();
  else
    try {
      return Promise.resolve(await successCb(accessToken, body));
    } catch (error: any) {
      if (error.response.status === 401)
        try {
          const accessToken = await requestAccessToken(refreshToken);
          return Promise.resolve(await successCb(accessToken, body));
        } catch (error) {
          errorCb();
        }
    }
}
