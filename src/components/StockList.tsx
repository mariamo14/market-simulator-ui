import React from "react";
import { Box, Text, Heading, Flex, Icon } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">{stock.symbol}</Text>
            <Flex align="center">
              {stock.change.includes("+") ? (
                <Icon as={FaArrowUp} color="green.400" mr={2} />
              ) : (
                <Icon as={FaArrowDown} color="red.400" mr={2} />
              )}
              <Text
                color={stock.change.includes("+") ? "green.400" : "red.400"}
              >
                {stock.change}
              </Text>
            </Flex>
          </Flex>
          <Text>Price: ${stock.price}</Text>
        </Box>
      ))}
    </Box>
  );
};
