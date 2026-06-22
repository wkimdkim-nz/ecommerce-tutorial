import { useParams } from "react-router"
import type { Product } from "../../models/product";
import { useEffect, useState } from "react";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const productDetails = [
    { label: 'Name', value: product?.name },
    { label: 'Description', value: product?.description },
    { label: 'Type', value: product?.type },
    { label: 'Brand', value: product?.brand },
    { label: 'Quantity in Stock', value: product?.quantityInStock },
  ]

  useEffect(() => {
    // Fetch product details using the id
    fetch(`https://localhost:7033/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <Grid container spacing={6} sx={{ mx: 'auto', maxWidth: 'lg' }}>
      <Grid size={6}>
        <img src={product?.pictureUrl} alt={product?.name} style={{ width: '100%' }} />
      </Grid>
      <Grid size={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{ '& td': { fontSize: '1.25rem' }}}>
            <TableBody>
              {productDetails.map((detail) => (
                <TableRow key={detail.label}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid size={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in basket'
              fullWidth
              defaultValue={1}
            />
          </Grid>
          <Grid size={6}>
            <Button
              color='primary'
              size='large'
              variant='contained'
              fullWidth
              sx={{ 'height': '56px' }}
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid> 
    </Grid>
  )
}