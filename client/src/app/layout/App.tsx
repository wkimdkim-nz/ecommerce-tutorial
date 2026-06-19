import { useEffect, useState } from "react";
import Catalog from "../features/catalog/Catalog";
import type { Product } from "../models/product";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState);
  }

  useEffect(() => {
    fetch('https://localhost:7033/api/products')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode 
          ? 'radial-gradient(circle, #1e3aBa, #111B27)' 
          : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          py: 6
        }}>
        <Container 
          maxWidth="xl"
          sx={{ mt: 8 }}
        >
          <Catalog products={products} />
          </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
