import { Button, Backdrop } from '@mui/material';
import { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Stack from '@mui/material/Stack';
import { PurchaseItem, Item } from './PurchaseItem';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

interface PurchaseButtonProps {
  /**
   * List of purchase items
   */
  items: Item[];
}

/**
 * Primary UI component for user interaction
 */
export const PurchaseButton = ({ items }: PurchaseButtonProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {!open && (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            height: theme.spacing(5),
            textTransform: 'none',
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          startIcon={<ShoppingBasketIcon />}>
          Buy
        </Button>
      )}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}>
        <Stack spacing={1}>
          {items.map((item) => (
            <PurchaseItem key={JSON.stringify(item)} item={item} />
          ))}
        </Stack>
        {open && (
          <IconButton
            aria-label="delete"
            sx={{
              boxShadow: '0px 2px 1px 1px #636363;',
              borderRadius: '50%',
              padding: theme.spacing(1),
              height: theme.spacing(5),
              marginLeft: theme.spacing(2),
              backgroundColor: 'white',
            }}
            onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Backdrop>
    </>
  );
};
