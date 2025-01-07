import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Typography, Drawer } from "@mui/material";
import Header from "./components/Header";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [categories, setCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const sortProducts = (products, sortOption) => {
    switch (sortOption) {
      case "price_low_high":
        return [...products].sort((a, b) => a.price - b.price);
      case "price_high_low":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating_high_low":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = sortProducts(filteredProducts, selectedSort);

  return (
    <Container>
      <Header
        cartCount={cartCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        toggleCart={toggleCart}
        goToCart={goToCart}
      />
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <Routes>
          <Route
            path="/cart"
            element={<Cart cartItems={cart} setCart={setCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route
            path="/"
            element={sortedProducts.map((product) => (
              <div
                style={{
                  flex: "1 1 calc(33.333% - 16px)",
                  marginBottom: "16px",
                  minWidth: "280px",
                }}
                key={product.id}
              >
                <Product product={product} addToCart={addToCart} />
              </div>
            ))}
          />
        </Routes>
      </div>

      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <div style={{ width: "350px", padding: "20px" }}>
          <Cart cartItems={cart} setCart={setCart} />
        </div>
      </Drawer>
    </Container>
  );
};

export default App;
