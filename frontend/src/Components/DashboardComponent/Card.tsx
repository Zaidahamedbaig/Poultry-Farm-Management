import React from "react";
import { Card, useTheme } from "@mui/material";

interface DashboardCardProps {
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        flex: 1, 
        maxWidth:"285px",
        width: { xs: "100%", sm: 300 },
        height: 150,
        borderRadius: 2,
        border: `2px solid ${theme.palette.primary.light}`,
        boxShadow: "none",
        color: theme.palette.primary.dark,
        display: "block",
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          border: "none",
          boxShadow: `0px 0px 12px 3px ${theme.palette.primary.light}`,
        },
      }}
    >
      {children}
    </Card>
  );
};

export default DashboardCard;
