import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { numberToWords, getCurrencyName } from "../utils/helpers";

export default function HeaderSection({
  fromCurrencyObj,
  toCurrencyObj,
  amount,
  convertedAmount,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "40vh", md: "50vh" },
        backgroundColor: "#000",
        color: "#fff",
        clipPath: "ellipse(150% 100% at 50% 0%)",
        display: "flex",
        alignItems: "flex-end",
        pb: 4,
      }}
    >
      <Container
        maxWidth="md"
        sx={{ color: "white", mb: "150px", ml: "300px" }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={1}
          sx={{ ml: "250px", mb: "50px", mt: "50px" }}
        >
          Currency Converter
        </Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
          {fromCurrencyObj?.currency} to {toCurrencyObj?.currency} Conversion at
          Real Exchange Rate
        </Typography>
        {convertedAmount !== null ? (
          <Typography
            variant="subtitle1"
            mb={1}
            sx={{ mt: "15px", mb: "-10px" }}
          >
            {numberToWords(parseFloat(amount))}{" "}
            {getCurrencyName(fromCurrencyObj?.currency)} converted to{" "}
            {numberToWords(convertedAmount)}{" "}
            {getCurrencyName(toCurrencyObj?.currency)}
          </Typography>
        ) : (
          <>
            <Typography variant="subtitle1" mb={1}>
              Select currencies and enter an amount to see live conversion
            </Typography>
            <Typography variant="subtitle1">(No conversion yet)</Typography>
          </>
        )}
      </Container>
    </Box>
  );
}
