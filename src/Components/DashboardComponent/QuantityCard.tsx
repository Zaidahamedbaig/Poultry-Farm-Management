import { Box, Typography } from "@mui/material";
import DashboardCard from "./Card";
import BarChartIcon from "@mui/icons-material/BarChart";

interface QuantityCardProps {
  title: string;
  count: number;
}

const QuantityCard: React.FC<QuantityCardProps> = ({ title, count }) => {
  return (
    <DashboardCard>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          height: "100%",
          width: "100%",
        }}
      >
        <Box sx={{ marginRight: "20px", marginTop: "30px" }}>
          <BarChartIcon sx={{ fontSize: 60, color: "primary.main" }} />
        </Box>
        <Box sx={{ display: "block", alignItems: "center" }}>
          <Typography
            color="primary.dark"
            sx={{
              marginBottom: "10px",
              fontStyle: "italic",
              fontFamily: "Times New Roman, serif",
              fontSize: "20px",
             
            }}
          >
            {title}
          </Typography>
          <Typography variant="h3" fontWeight="bold" color="primary.main">
            {count}
          </Typography>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default QuantityCard;
