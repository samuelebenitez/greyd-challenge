import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";

export default function SurveyField({ item }) {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const renderField = (item) => {
    switch (item.type) {
      case "text":
        return (
          <Input
            type="text"
            placeholder="Name"
            name={item.name}
            required={item.required}
            color="white"
            onChange={handleChange}
          />
        );
      case "email":
        return (
          <Input
            type="email"
            placeholder="Email"
            name={item.name}
            required={item.required}
            color="white"
            onChange={handleChange}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            color="white"
            name={item.name}
            required={item.required}
            onChange={handleChange}
          />
        );
      case "select":
        return (
          <Select
            color="gray.500"
            name={item.name}
            required={item.required}
            onChange={handleChange}
          >
            {item.options.map((option, key) => (
              <option key={key} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case "checkbox":
        return (
          <Checkbox
            name={item.name}
            required={item.required}
            variant="filled"
            size="lg"
            colorScheme="purple"
            onChange={handleChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box my={8}>
      <FormLabel color="purple.100" fontSize="lg">
        {item.label}
      </FormLabel>
      {renderField(item)}
    </Box>
  );
}
