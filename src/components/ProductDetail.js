import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="center"
      padding="16px"
      gap="20px"
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.title}
          style={{ objectFit: "contain", maxWidth: "100%" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" paragraph>
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" paragraph>
            Category: {product.category}
          </Typography>
          <Typography variant="body2" paragraph>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Typography>

          <Box display="flex" justifyContent="center" gap="10px">
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Back to Products
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
