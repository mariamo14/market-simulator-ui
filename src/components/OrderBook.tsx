import React, { useEffect, useState } from "react";
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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios"; // Import Axios

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

// Type for Stock Price Data
type StockPrice = {
  companyName: string;
  timestamp: string;
  price: number;
};

// Proper type for Chart Data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

export const OrderBook: React.FC = () => {
  // State for storing stock data from backend
  const [stockData, setStockData] = useState<StockPrice[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:8080/api/stocks")
      .then((response) => {
        const data: StockPrice[] = response.data;

        // Extract unique companies from the data and convert Set to Array
        const companyNames = Array.from(
          new Set(data.map((stock) => stock.companyName))
        );

        // Extract datasets for each company
        const datasets = companyNames.map((companyName) => {
          // Filter data for the current company
          const companyData = data.filter(
            (stock) => stock.companyName === companyName
          );

          // Extract timestamps and prices for the company
          const labels = companyData.map((stock) => stock.timestamp);
          const prices = companyData.map((stock) => stock.price);

          // Return the dataset for the company
          return {
            label: `${companyName} Price`,
            data: prices,
            fill: false,
            borderColor: getRandomColor(), // Assign a random color to each company
            tension: 0.1,
          };
        });

        // Update the chart data state
        setChartData({
          labels: data.map((stock) => stock.timestamp), // Use all timestamps for labels
          datasets,
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data from backend:", error);
      });
  }, []);

  // Function to generate random colors for different datasets
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Mock data for the order book (this can be replaced with backend integration later)
  const mockOrderBookData = [
    { price: 175.55, volume: 500 },
    { price: 175.5, volume: 300 },
    { price: 175.45, volume: 1000 },
  ];

  return (
    <Box>
      <Heading size="md" mb={4}>
        Stock Price Graph
      </Heading>
      <Box mb={8}>
        <Line data={chartData} />
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
