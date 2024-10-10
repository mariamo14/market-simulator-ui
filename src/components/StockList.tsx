import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

const mockStockData = [
  { symbol: "AAPL", price: 175.55, change: "+1.5%" },
  { symbol: "GOOGL", price: 2734.12, change: "-0.3%" },
  { symbol: "AMZN", price: 3401.45, change: "+0.9%" },
];

export const StockList: React.FC = () => {
  return (
    <Box width="20%" bg="gray.900" color="white" p={4}>
      <Heading size="lg" mb={4}>
        Stocks
      </Heading>
      {mockStockData.map((stock) => (
        <Box mb={4} key={stock.symbol}>
          <Text fontWeight="bold">{stock.symbol}</Text>
          <Text>Price: ${stock.price}</Text>
          <Text>Change: {stock.change}</Text>
        </Box>
      ))}
    </Box>
  );
};
