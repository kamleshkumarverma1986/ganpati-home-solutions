"use client";

import DataGrid from "@/components/DataGrid";
import { useFetch } from "@/hooks/useFetch";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import AlertBox from "@/components/AlertBox";

export default function Enquiries() {
  const [listData, setListData] = useState({
    rows: [],
    columns: [],
    rowCount: 0,
  });
  const [callApi, isLoading, data, error] = useFetch("/api/enquiry");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertProps, setAlertProps] = useState(null);

  useEffect(() => {
    (async () => {
      await callApi({
        method: "GET",
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setListData({
        pageSize: 50,
        rowCount: data.enquiryUsers.studentCount,
        getRowId: (row) => row._id,
        columns: [
          {
            field: "fullName",
            headerName: "Full Name",
            width: 200,
          },
          {
            field: "mobileNumber",
            headerName: "Mobile Number",
            width: 150,
          },
          {
            field: "email",
            headerName: "Email",
            width: 200,
          },
          {
            field: "address",
            headerName: "Address",
            width: 150,
          },
          {
            field: "schoolName",
            headerName: "School Name",
            width: 150,
          },
          {
            field: "currentClass",
            headerName: "Current Class",
            width: 150,
          },

          {
            field: "currentBoard",
            headerName: "Board",
            width: 150,
          },
          {
            field: "goal",
            headerName: "Goal",
            width: 300,
          },
          {
            field: "created",
            headerName: "Date",
            width: 150,
            valueFormatter: (element) =>
              new Date(element.value).toLocaleDateString(),
          },
        ],
        rows: data.enquiryUsers,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setAlertProps({
        ...error,
        isSuccess: false,
      });
      setIsAlertOpen(true);
    }
  }, [error]);

  return (
    <Grid container spacing={1} sx={{ textTransform: "capitalize" }}>
      <Grid item xs={12}>
        <DataGrid
          height="calc(85vh)"
          loading={isLoading}
          listData={listData}
          checkboxSelection
        />
      </Grid>
      <AlertBox
        isOpen={isAlertOpen}
        handleClose={() => setIsAlertOpen(false)}
        {...alertProps}
      />
    </Grid>
  );
}
