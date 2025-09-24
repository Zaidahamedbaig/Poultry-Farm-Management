import PropTypes from "prop-types";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { handlerDrawerOpen, useGetMenuMaster } from "../../../../../api/menu";

export default function NavItem({
  item,
  level,
  isParents = false,
  setSelectedID,
}: any) {
  const { menuMaster }: any = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;

  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const itemHandler = () => {
    if (downLG) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID(item.id);
    }
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? "1rem" : "1.25rem",
        ...(isParents && { fontSize: 20, stroke: "1.5" }),
      }}
    />
  ) : (
    false
  );

  const { pathname } = useLocation();
  const isSelected = !!matchPath(
    { path: item?.link ? item.link : item.url, end: false },
    pathname
  );

  const light = theme.palette.primary.light;
  const dark = theme.palette.primary.dark;

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <ListItemButton
          component={Link}
          to={item.url}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
          sx={(theme) => ({
            zIndex: 1201,
            pl: drawerOpen ? `${level * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              "&:hover": {
                bgcolor: light,
                ...theme.applyStyles("dark", { bgcolor: "divider" }),
              },
              "&.Mui-selected": {
                bgcolor: light,
                ...theme.applyStyles("dark", { bgcolor: "divider" }),
                borderRight: "2px solid ",
                borderColor: dark,
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  bgcolor: light,
                  ...theme.applyStyles("dark", { bgcolor: "divider" }),
                },
              },
            }),
            ...(!drawerOpen && {
              "&:hover": { bgcolor: "transparent" },
              "&.Mui-selected": {
                "&:hover": { bgcolor: "transparent" },
                bgcolor: "transparent",
              },
            }),
          })}
          onClick={() => itemHandler()}
        >
          {itemIcon && (
            <ListItemIcon
              sx={(theme) => ({
                minWidth: 28,
                color: isSelected ? dark : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    bgcolor: light,
                    ...theme.applyStyles("dark", {
                      bgcolor: "secondary.light",
                    }),
                  },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: light,
                    ...theme.applyStyles("dark", { bgcolor: "primary.900" }),
                    "&:hover": {
                      bgcolor: "primary.lighter",
                      ...theme.applyStyles("dark", {
                        bgcolor: "primary.darker",
                      }),
                    },
                  }),
              })}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{ color: isSelected ? dark : textColor }}
                >
                  {item.title}
                </Typography>
              }
            />
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      </Box>
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
  isParents: PropTypes.bool,
  setSelectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
};
