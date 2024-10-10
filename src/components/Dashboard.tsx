import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { StockList } from "./StockList";
import { OrderBook } from "./OrderBook";

export const Dashboard: React.FC = () => {
  return (
    <Flex height="100vh">
      {/* Sidebar: Stock List */}
      <StockList />

      {/* Main Dashboard */}
      <Box flex="1" p={6} bg="gray.100">
        {/* Order Book Table */}
        <OrderBook />
      </Box>
    </Flex>
  );
};
