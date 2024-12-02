import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { StockList } from "./StockList";
import { OrderBook } from "./OrderBook";

export const Dashboard: React.FC = () => {
  return (
    <Flex direction={["column", "row"]} height="100vh" overflow="hidden">
      {/* Sidebar: Stock List */}
      <Box
        width={["100%", "25%", "20%"]}
        p={4}
        bg="gray.800"
        color="white"
        minW="250px"
        overflowY="auto"
      >
        <StockList />
      </Box>

      {/* Main Dashboard */}
      <Box flex="1" p={[4, 6]} bg="gray.100" overflowY="auto" minW="0">
        <OrderBook />
      </Box>
    </Flex>
  );
};
