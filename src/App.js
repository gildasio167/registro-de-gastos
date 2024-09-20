import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

function App() {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');
    const [gastos, setGastos] = useState([]);

    // Carregar gastos do localStorage
    useEffect(() => {
        const savedGastos = JSON.parse(localStorage.getItem('gastos')) || [];
        setGastos(savedGastos);
    }, []);

    // Salvar gastos no localStorage
    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }, [gastos]);

    // Adicionar novo gasto
    const handleAddGasto = () => {
        if (nome && data && valor && parseFloat(valor) > 0) {
            const novoGasto = { nome, data, valor: parseFloat(valor) };
            setGastos([...gastos, novoGasto]);
            setNome('');
            setData('');
            setValor('');
        }
    };

    // Remover gasto
    const handleRemoveGasto = (index) => {
        const updatedGastos = gastos.filter((_, i) => i !== index);
        setGastos(updatedGastos);
    };

    // Calcular total gasto
    const calcularTotal = () => {
        return gastos.reduce((total, gasto) => total + gasto.valor, 0).toFixed(2);
    };

    return (
        <Container
            style={{
                backgroundImage: 'url(/image.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                RU - App de Gastos
            </Typography>
            
            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                    style: { backgroundColor: 'white' },
                }}
            />
            <TextField
                label=""
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    style: { backgroundColor: 'white' },
                }}
            />
            <TextField
                label="Valor pago"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                fullWidth
                margin="normal"
                type="number"
                InputProps={{
                    style: { backgroundColor: 'white' },
                }}
            />
            <Button variant="contained" color="primary" onClick={handleAddGasto} fullWidth>
                Adicionar Gasto
            </Button>

            <List>
                {gastos.map((gasto, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={gasto.nome}
                            secondary={`Data: ${gasto.data} - Valor: R$ ${gasto.valor.toFixed(2)}`}
                            primaryTypographyProps={{ style: { color: 'white' } }}
                            secondaryTypographyProps={{ style: { color: 'white' } }}
                        />
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ color: 'white', borderColor: 'white' }}  // Cor do texto e borda brancas
                        onClick={() => handleRemoveGasto(index)}
                    >
                        Remover
                    </Button>

                    </ListItem>
                ))}
            </List>


            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                Total gasto: R$ {calcularTotal()}
            </Typography>
        </Container>
    );
}

export default App;
