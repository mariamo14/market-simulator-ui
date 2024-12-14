import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Flex, Icon } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";

// Type for Stock Price Data
type StockPrice = {
  companyName: string;
  price: number;
  timestamp: string;
};

type LatestStock = {
  companyName: string;
  price: number;
  change: number; // Calculated change percentage
};

export const StockList: React.FC = () => {
  const [stockData, setStockData] = useState<LatestStock[]>([]);

  useEffect(() => {
    // Fetch stock data from the backend
    axios
      .get("http://localhost:8080/api/stocks?symbols=AAPL,GOOGL,AMZN")
      .then((response) => {
        const data: StockPrice[] = response.data;

        // Create a map to store the latest and previous stock for each company
        const latestStockMap = new Map<
          string,
          { latest: StockPrice; previous?: StockPrice }
        >();

        // Iterate over the data to find the latest and previous stock for each company
        data.forEach((stock) => {
          const existing = latestStockMap.get(stock.companyName);
          if (!existing) {
            latestStockMap.set(stock.companyName, { latest: stock });
          } else if (
            new Date(stock.timestamp) > new Date(existing.latest.timestamp)
          ) {
            latestStockMap.set(stock.companyName, {
              latest: stock,
              previous: existing.latest,
            });
          }
        });

        // Calculate the change and create an array of LatestStock
        const latestStocks: LatestStock[] = Array.from(
          latestStockMap.values()
        ).map(({ latest, previous }) => {
          const change =
            previous && previous.price
              ? ((latest.price - previous.price) / previous.price) * 100
              : 0; // Calculate percentage change
          return {
            companyName: latest.companyName,
            price: latest.price,
            change,
          };
        });

        // Update the state with the latest stock data
        setStockData(latestStocks);
      })
      .catch((error) => {
        console.error("Error fetching stock list data from backend:", error);
      });
  }, []);

  return (
    <Box width="100%" p={4}>
      <Heading size="lg" mb={4}>
        Latest Stocks
      </Heading>
      {stockData.map((stock) => (
        <Box mb={4} key={stock.companyName}>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">{stock.companyName}</Text>
            <Flex align="center">
              {stock.change > 0 ? (
                <>
                  <Icon as={FaArrowUp} color="green.400" mr={2} />
                  <Text color="green.400">+{stock.change.toFixed(2)}%</Text>
                </>
              ) : stock.change < 0 ? (
                <>
                  <Icon as={FaArrowDown} color="red.400" mr={2} />
                  <Text color="red.400">{stock.change.toFixed(2)}%</Text>
                </>
              ) : (
                <Text color="gray.400">No Change</Text>
              )}
            </Flex>
          </Flex>
          <Text>Price: ${stock.price.toFixed(2)}</Text>
        </Box>
      ))}
    </Box>
  );
};
