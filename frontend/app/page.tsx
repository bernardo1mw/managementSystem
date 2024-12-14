'use client';

import Grid from '@mui/material/Grid2';
import { Box, Typography, Button, Paper  } from '@mui/material';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Sistema de Gestão
      </Typography>
      <Typography variant="h6" gutterBottom>
        Bem-vindo! Selecione uma das opções abaixo para começar:
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '2rem' }}>
        <Grid>
          <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Clientes
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/customers')}
            >
              Gerenciar Clientes
            </Button>
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Produtos
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/products')}
            >
              Gerenciar Produtos
            </Button>
          </Paper>
        </Grid>
        <Grid>
          <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Pedidos
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/orders')}
            >
              Gerenciar Pedidos
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
