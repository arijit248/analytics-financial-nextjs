import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import PaginationPage from "@/components/pagination/pagination";
import Link from "next/link";
export default async function CustomerList({ searchParams }) {
  const { page } = searchParams;
  const response = await fetch(
    `http://localhost:8000?page=${page || 1}&limit=10`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  const { customars, totalCount } = await result[0];
  return (
    <Container fluid="true">
      <Grid container spacing={2}>
        {customars.map((ele) => {
          return (
            <Grid size={{ xl: 3, lg: 3, md: 4, sm: 12, xs: 12 }}>
              <Link href={`/details?id=${ele?._id}`}>
                <Card sx={{ minWidth: 275 }} key={ele.name}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      {ele.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <PaginationPage count={totalCount[0].count} />
    </Container>
  );
}
