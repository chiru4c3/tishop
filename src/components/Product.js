import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Product = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      style={{
        cursor: "pointer",
        margin: "16px",
        flex: "1 1 calc(33.333% - 16px)",
        minWidth: "280px",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
