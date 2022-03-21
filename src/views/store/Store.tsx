import { CssBaseline } from '@mui/material'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from '../../lib/comerce';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import NavBar from './navbar/Navbar'
import Products from './product/Product'

const Store = () => {
    // const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState<any>({});
    const [order, setOrder] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data }: any = await commerce.products.list();
        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId: string, quantity: number) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    };

    const handleUpdateCartQty = async (lineItemId: string, quantity: number) => {
        const response = await commerce.cart.update(lineItemId, { quantity });
        setCart(response.cart);
    };

    const handleRemoveFromCart = async (lineItemId: string) => {
        const response = await commerce.cart.remove(lineItemId);
        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response.cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId: any, newOrder: any) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);

            refreshCart();
        } catch (error: any) {
            setErrorMessage(error.data.error.message);
        }
    };

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    // const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
        <Router>
            <CssBaseline />
            <NavBar totalItems={cart?.total_items} />
            <Switch>
                <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart">
                    <Cart
                        cart={cart}
                        onUpdateCartQty={handleUpdateCartQty}
                        onRemoveFromCart={handleRemoveFromCart}
                        onEmptyCart={handleEmptyCart}
                    />
                </Route>
                <Route path="/checkout" exact>
                    <Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                    />
                </Route>
            </Switch>
        </Router>
    )
}

export default Store