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
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Type definitions
type StockPrice = {
  companyName: string;
  timestamp: string;
  price: number;
};

type OrderBookEntry = {
  price: number;
  volume: number;
};

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[]; // Allow null values in the dataset
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

export const OrderBook: React.FC = () => {
  const [stockData, setStockData] = useState<StockPrice[]>([]);
  const [orderBookData, setOrderBookData] = useState<OrderBookEntry[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch stock price data
    axios
      .get("http://localhost:8080/api/stocks?symbols=AAPL,GOOGL,AMZN")
      .then((response) => {
        const data: StockPrice[] = response.data;

        // Extract unique company names
        const companyNames = Array.from(
          new Set(data.map((stock) => stock.companyName))
        );

        // Align timestamps
        const allTimestamps = Array.from(
          new Set(data.map((stock) => stock.timestamp))
        ).sort();

        // Create datasets for each company
        const datasets = companyNames.map((companyName) => {
          const companyData = data.filter(
            (stock) => stock.companyName === companyName
          );

          // Map prices to aligned timestamps
          const prices = allTimestamps.map((timestamp) => {
            const stock = companyData.find((s) => s.timestamp === timestamp);
            return stock ? stock.price : null; // Fill gaps with null
          });

          return {
            label: `${companyName} Price`,
            data: prices,
            fill: false,
            borderColor: getRandomColor(),
            tension: 0.1,
          };
        });

        // Update the chart data
        setChartData({
          labels: allTimestamps,
          datasets,
        });
      })
      .catch((error) => console.error("Error fetching stock data:", error));

    // Fetch order book data
    axios
      .get("http://localhost:8080/api/stocks?symbols=AAPL,GOOGL,AMZN")
      .then((response) => {
        setOrderBookData(response.data); // Assume the response is an array of OrderBookEntry
      })
      .catch((error) =>
        console.error("Error fetching order book data:", error)
      );
  }, []);

  // Function to generate random colors for datasets
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        Stock Price Graph
      </Heading>
      <Box mb={8} width="100%" height="400px">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
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
          {orderBookData.map((entry, index) => (
            <Tr key={index}>
              <Td>${entry.price.toFixed(2)}</Td>
              <Td>{entry.volume}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
