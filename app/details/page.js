import Button from "@mui/material/Button";
import { redirect } from "next/navigation";
import Link from "next/link";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";

export default async function ClientDetails({ searchParams }) {
  const { id, account_id } = searchParams;
  if (!id) {
    redirect("/client-list");
  }
  const detailfetcher = await fetch(`http://localhost:8000/details?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const detailsData = await detailfetcher.json();

  let transactionData;

  if (account_id) {
    const transactionfetcher = await fetch(
      `http://localhost:8000/transactiondetails?account_id=${account_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    transactionData = await transactionfetcher.json();
  }

  return (
    <div>
      <p>{detailsData?.name}</p>
      <p>{detailsData.email}</p>
      {detailsData?.accounts.map((acc) => {
        return (
          <Link href={`/details?id=${id}&account_id=${acc}`}>
            <Button size="small">{acc}</Button>
          </Link>
        );
      })}

      <div>
        {transactionData && (
          <>
            Account ID: {transactionData[0]?.transactionDetails[0].account_id}
            <Grid container spacing={2}>
              {transactionData[0]?.transactionDetails[0].transactions?.map(
                (tra) => {
                  return (
                    <Grid
                      size={{ xl: 3, lg: 3, md: 4, sm: 12, xs: 12 }}
                      key={tra.price}
                    >
                      <Card sx={{ minWidth: 275 }}>
                        <p>{tra?.amount}</p>
                        <p>{tra?.symbol}</p>
                        <p>{tra?.price}</p>
                        <p>{tra?.total}</p>
                      </Card>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}
