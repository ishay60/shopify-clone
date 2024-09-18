import * as React from "react";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return <MuiPagination count={count} page={page} onChange={onChange} />;
};

export default Pagination;
