// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import ParticleBackground from "./components/ParticleBackground";
import Converter from "./components/Converter";
import TransferHistory from "./components/TransferHistory";

function App() {
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transfers");
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <>
      {/* Particle animation in the background */}
      <ParticleBackground />

      {/* Main content is wrapped in a Paper with some transparency */}
      <Container
        maxWidth="sm"
        style={{ position: "relative", zIndex: 1, marginTop: "2rem" }}
      >
        <Paper
          elevation={6}
          style={{ padding: "2rem", backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Currency Converter
            </Typography>
            <Converter onTransferCreated={fetchTransfers} />
            <TransferHistory
              transfers={transfers}
              onTransferDeleted={fetchTransfers}
            />
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default App;
