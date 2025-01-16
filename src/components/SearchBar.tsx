import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };

  return (
    <Flex mb={4} align="center">
      <Input
        placeholder="Search for a company (e.g., AAPL)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mr={2}
      />
      <Button colorScheme="blue" onClick={handleSearch} mr={2}>
        Search
      </Button>
      <Button colorScheme="gray" onClick={handleClear}>
        Clear
      </Button>
    </Flex>
  );
};
