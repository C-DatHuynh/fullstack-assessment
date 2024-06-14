import { Chip, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useTheme } from '@mui/material/styles';

export interface Item {
  size: string;
  description?: string;
  price?: string;
  tags?: string[];
}

interface PurchaseItemProps {
  /**
   * Item
   */
  item: Item;
}

/**
 * Primary UI component for user interaction
 */
export const PurchaseItem = ({ item: { size, description, price, tags } }: PurchaseItemProps) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: theme.spacing(6),
        height: 'fit-content',
        boxShadow: '0px 2px 1px 1px #636363;',
      }}>
      <CardContent
        sx={{
          padding: theme.spacing(3),
        }}>
        <Stack spacing={1} direction="row">
          <ShoppingBasketIcon />
          <Typography sx={{ flexGrow: 2 }}>{size}</Typography>
          {price && <Typography sx={{ fontSize: '0.8rem' }}>{price}</Typography>}
        </Stack>
        {description && <Typography sx={{ marginTop: theme.spacing(1) }}>{description}</Typography>}
        {tags && tags.length > 0 && (
          <Stack direction="row" sx={{ marginTop: theme.spacing(2) }}>
            {tags?.map((tag, idx) => (
              <Chip sx={{ borderRadius: '10%' }} key={tag + idx} label={tag} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
