import { Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { AddShoppingCart } from '@material-ui/icons';

type TProps = {
  products: any,
  onAddToCart: any
}

interface ISubProduct {
  formatted: number
  url: string
}

interface IProduct {
  id: number
  image: ISubProduct
  name: string
  price: ISubProduct
  description: string
}

const Product: React.FC<TProps> = ({ products, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = (id: number) => onAddToCart(id, 1);

  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products?.map((product: IProduct) => (
          <Grid key={product?.id} item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={product?.image?.url} title={product?.name} />
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Rp.{product?.price?.formatted}
                  </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product?.description }} variant="body2" color="textSecondary" component="p" />
              </CardContent>
              <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => handleAddToCart(product?.id)}>
                  <AddShoppingCart />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Product;