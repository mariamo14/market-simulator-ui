import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from "@chakra-ui/react";

const mockOrderBookData = [
  { price: 175.55, volume: 500 },
  { price: 175.5, volume: 300 },
  { price: 175.45, volume: 1000 },
];

export const OrderBook: React.FC = () => {
  return (
    <Box>
      <Heading size="md" mb={4}>
        Order Book
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Price</Th>
            <Th>Volume</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockOrderBookData.map((order, index) => (
            <Tr key={index}>
              <Td>${order.price}</Td>
              <Td>{order.volume}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
