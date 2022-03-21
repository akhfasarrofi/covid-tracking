import { Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import useStyles from './styles';

interface ISubItem {
  url: string
  formatted_with_symbol: string
}

interface IItem {
  id: number
  name: string
  image: ISubItem
  line_total: ISubItem
  quantity: number
}

type TProps = {
  item: IItem,
  onUpdateCartQty: any,
  onRemoveFromCart: any
}

const CartItem: React.FC<TProps> = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  const handleUpdateCartQty = (lineItemId: number, newQuantity: number) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId: number) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <img
        src={item?.image?.url}
        alt={item?.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item?.name}</Typography>
        <Typography variant="h5">{item?.line_total?.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item?.id, item?.quantity - 1)}>
            -
          </Button>
          <Typography>&nbsp;{item?.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item?.id, item?.quantity + 1)}>
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item?.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
