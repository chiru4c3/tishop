import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Select,
  MenuItem,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import { useNavigate } from "react-router-dom";

const Header = ({
  cartCount,
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
  toggleCart,
}) => {
  const navigate = useNavigate();

  const handleStoreClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ padding: "8px" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Store Name */}
        <Typography
          variant="h6"
          style={{ flexGrow: 1, cursor: "pointer", padding: "10px" }}
          onClick={handleStoreClick}
        >
          TiSHOP
        </Typography>

        {/* Search, Filters, Sorting, and Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />

          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              size="small"
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                minWidth: "120px",
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FilterListIcon style={{ color: "white" }} /> {/* Filter Icon */}
          </div>

          {/* Sorting */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              size="small"
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                minWidth: "140px",
              }}
            >
              <MenuItem value="">Sort By</MenuItem>
              <MenuItem value="price_low_high">Price: Low to High</MenuItem>
              <MenuItem value="price_high_low">Price: High to Low</MenuItem>
              <MenuItem value="rating_high_low">Rating: High to Low</MenuItem>
            </Select>
            <SortIcon style={{ color: "white" }} /> {/* Sort Icon */}
          </div>

          {/* Cart Icon */}
          <IconButton onClick={toggleCart}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
