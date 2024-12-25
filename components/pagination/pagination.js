"use client";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationPage({ count }) {
  const router = useRouter();
  const params = useSearchParams();
  // const active = params.get("page");
  const active = Object.fromEntries(params.entries())?.page;

  const handleChange = (event, value) => {
    console.log(value);
    router.push(`/client-list?page=${value}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(count / 10)}
        onChange={handleChange}
        color="primary"
        page={Number(active) || 1}
      />
      <Typography>Total Count: {count}</Typography>
    </Stack>
  );
}
