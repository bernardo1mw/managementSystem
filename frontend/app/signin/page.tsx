'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { signin } from '../services/api/user';
import { setLocalStorage } from '../utils/localstorage';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signin(email, password);
      if (data.token) {
        setLocalStorage({ ...data, email })
        router.push('/');
      }
    } catch (err) {
      setError('Credenciais inválidas!');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Entrar
        </Button>
      </form>

      <div className='my-1'>
        <Link href="/signup">
            <Button size='small' variant="text" color="primary" fullWidth type="submit">
              Registrar
            </Button>
        </Link>
      </div>
    </Box>
  );
};

export default SignIn;
