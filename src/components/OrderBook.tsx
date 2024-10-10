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
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // This is the missing scale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the scales and components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the order book
const mockOrderBookData = [
  { price: 175.55, volume: 500 },
  { price: 175.5, volume: 300 },
  { price: 175.45, volume: 1000 },
];

// Mock data for the stock price graph
const mockPriceData = {
  labels: ["10:00", "10:30", "11:00", "11:30", "12:00"],
  datasets: [
    {
      label: "AAPL Price",
      data: [174.5, 175.0, 175.5, 176.0, 175.55],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
      tension: 0.1,
    },
  ],
};

export const OrderBook: React.FC = () => {
  return (
    <Box>
      <Heading size="md" mb={4}>
        Stock Price Graph
      </Heading>
      <Box mb={8}>
        <Line data={mockPriceData} />
      </Box>

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
