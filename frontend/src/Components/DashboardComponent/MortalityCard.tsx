import { Box, Typography } from "@mui/material";
import DashboardCard from "./Card";
import React from "react";
import SkullIcon from "../Icons/skullIcon";



interface MortalityCardProps {
  title: string;
  count: number;
}
const MortalityCard: React.FC<MortalityCardProps> = ({ title, count }) => {
  return (
    <div>
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
             <SkullIcon sx={{ fontSize: 60, color: "#e4ae24ff" }} />
          </Box>
          <Box sx={{ display: "block", alignItems: "center" }}>
            <Typography
              color="primary.dark"
              sx={{
                marginBottom: "10px",
                fontStyle: "italic",
                fontFamily: "Times New Roman, serif",
                fontSize: "20px",
                padding: "1px",
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
    </div>
  );
};

export default MortalityCard;
