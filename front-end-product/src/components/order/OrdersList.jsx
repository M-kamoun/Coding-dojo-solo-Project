import React from "react";
import {
  Box,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const OrdersList = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    setSearchTerm(value);

    if (!value.trim()) {
      setFilterData(orders);
      return;
    }

    const filtered = orders.filter((orders) =>
      orders.code.toLowerCase().includes(value)
    );
    setFilterData(filtered);
  };
  return (
    <div>
      <h1>Orderlist</h1>
    </div>
  );
};

export default OrdersList;
