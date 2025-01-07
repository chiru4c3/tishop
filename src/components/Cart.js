import React from "react";
import { Typography, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ cartItems, setCart }) => {
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ padding: "20px", width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <Box sx={{ flex: "0 0 120px" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, paddingLeft: "15px" }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                <Box sx={{ display: "flex", gap: "10px", mt: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{
                      marginLeft: "auto",
                    }}
                  >
                    <DeleteIcon />
                    {/* Add the Delete Icon */}
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Typography variant="h5" sx={{ mt: 2 }}>
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default Cart;
