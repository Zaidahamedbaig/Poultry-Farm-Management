import { BarChart } from "@mui/x-charts/BarChart";
import { Card, useTheme } from "@mui/material";
import { ISales } from "../../models/sales";
import { getAllSales } from "../../store/thunk/sales/getSales";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectSalesDetails } from "../../store/slices/sales/salesSlice";
import { groupBy } from "../../utils/groupBy";

export function valueFormatter(value: any) {
  return `${value} Qty`;
}

const chartSetting = {
  yAxis: [
    {
      label: "Quail Sold (Qty)",
      width: 60,
    },
  ],
  height: 300,
  margin: { left: 0 },
};

type SalesGraphProps = {
  batchName: string;
  dateOfPurchase: string;
};

export default function SalesCard({
  batchName,
  dateOfPurchase,
}: SalesGraphProps) {
  const theme = useTheme();
  const [salesData, setSalesData] = useState<ISales[]>([]);
  const dispatch = useAppDispatch();
  const salesDetails = useAppSelector(selectSalesDetails);
  const [dates, setDates] = useState<Array<string>>([]);

  useEffect(() => {
    if (dateOfPurchase) {
      const todaysDate = new Date();
      const startDate = new Date(dateOfPurchase);
      startDate.setUTCHours(0, 0, 0, 0);
      todaysDate.setUTCHours(0, 0, 0, 0);

      const dates = [];
      while (startDate < todaysDate) {
        dates.push(startDate.toISOString());
        startDate.setDate(startDate.getDate() + 1);
      }
      setDates(dates);
    }
  }, [dateOfPurchase]);

  useEffect(() => {
    if (batchName) {
      dispatch(getAllSales(batchName));
    }
  }, [batchName]);

  useEffect(() => {
    if (salesDetails.length > 0) {
      const newSales = [...salesDetails];
      
      const groupByDate = groupBy(newSales, (sale) => sale.date);
      if (dates.length > 0) {
        for (let i = 0; i < dates.length; i++) {
          const date = dates[i];
          if (!(date in groupByDate)) {
            groupByDate[date] = [
              {
                batchName: "",
                quantity: 0,
                price: 0,
                date: dates[i],
                customerName: "",
                phone: null,
                modeOfPayment: "",
              },
            ];
          }
        }
      }

      const totalSaleFromBatches = Object.entries(groupByDate).map(
        ([key, value]) => {
          let totalSale = 0;
          value.forEach((item) => {
            totalSale = item.quantity ?? 0 + totalSale;
          });
          return { ...value[0], quantity: totalSale };
        }
      );
     
       totalSaleFromBatches.sort((a, b) => {
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      });
      
      setSalesData(totalSaleFromBatches);
    } else {
      setSalesData([
        {
          batchName: "",
          quantity: 0,
          price: 0,
          date: "",
          customerName: "",
          phone: null,
          modeOfPayment: "",
        },
      ]);
    }
  }, [salesDetails]);

  return (
    <Card
      sx={{
        width: "auto",
        mt: 4,
        p: 2,
        border: `2px solid ${theme.palette.primary.light}`,
        "&:hover": {
          border: "none",
          boxShadow: `0px 0px 12px 3px ${theme.palette.primary.light}`,
        },
      }}
    >
      <BarChart
        dataset={salesData}
        xAxis={[
          {
            dataKey: "date",
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
            valueFormatter: (dateString: string) => {
              if (!dateString) return "";

              const date = new Date(dateString);
              if (isNaN(date.getTime())) return "";

              const day = date.getUTCDate();
              const month = date
                .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
                .toUpperCase();

              return `${day}${month}`;
            },
          },
        ]}
        {...chartSetting}
        series={[
          {
            dataKey: "quantity",
            label: "Quantity Sold",
            valueFormatter,
            color: theme.palette.primary.main,
          },
        ]}
      />
    </Card>
  );
}
