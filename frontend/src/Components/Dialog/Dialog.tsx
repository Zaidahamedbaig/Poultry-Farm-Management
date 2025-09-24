import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const GFDialog = ({
  title,
  open,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: any) => {
  return (
    <Dialog open={open} onClose={() => {}}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        {children}
        <DialogActions>
          <Button variant="contained" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            {cancelText}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
