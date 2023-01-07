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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { ref, push } from "firebase/database";
import { database } from "../firebase.js";

import items from "../items/db.json";

export default function SurveyForm() {
  const [values, setValues] = useState({});

  const [errors, setErrors] = useState(false);

  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      const formDataRef = ref(database, "form-data");
      push(formDataRef, values);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
      direction="column "
      bgGradient={[
        "linear(to-t, blackAlpha.800, blackAlpha.900)",
        "linear(to-b, blackAlpha.800, blackAlpha.900)",
      ]}
      p={8}
      w="100%"
      h="100%"
      color="white"
    >
      <Text color="purple.400" fontSize="3xl" textTransform="uppercase">
        Greydive challenge
      </Text>

      <FormControl w="100%" onSubmit={handleSubmit}>
        {items.map((item, key) => {
          switch (item.type) {
            case "text":
              return (
                <Box my={8} key={key}>
                  <FormLabel color="purple.100" fontSize="lg">
                    {item.label} *
                  </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    name={item.name}
                    required={item.required}
                    color="white"
                  />
                  {errors ? (
                    <FormErrorMessage>This field is required</FormErrorMessage>
                  ) : null}
                </Box>
              );
            case "email":
              return (
                <Box my={8} key={key}>
                  <FormLabel color="purple.100" fontSize="lg">
                    {item.label} *
                  </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    name={item.name}
                    required={item.required}
                    color="white"
                  />
                </Box>
              );
            case "date":
              return (
                <Box my={8} key={key}>
                  <FormLabel color="purple.100" fontSize="lg">
                    {item.label} *
                  </FormLabel>
                  <Input
                    onChange={handleChange}
                    type="date"
                    color="white"
                    name={item.name}
                    required={item.required}
                  />
                </Box>
              );
            case "select":
              return (
                <Box my={8} key={key}>
                  <FormLabel color="purple.100" fontSize="lg">
                    {item.label} *
                  </FormLabel>
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
                </Box>
              );
            case "checkbox":
              return (
                <Box my={8} key={key}>
                  <FormLabel color="purple.100" fontSize="lg">
                    {item.label} *
                  </FormLabel>
                  <Checkbox
                    name={item.name}
                    required={item.required}
                    variant="filled"
                    size="lg"
                    colorScheme="purple"
                    onChange={handleChange}
                  />
                </Box>
              );
            case "submit":
              return (
                <Flex my={8} key={key}>
                  <Button
                    type="submit"
                    isLoading={loading}
                    loadingText="Enviando"
                    onClick={handleSubmit}
                    colorScheme="purple"
                    size="lg"
                  >
                    {item.label}
                  </Button>
                </Flex>
              );
            default:
              return null;
          }
        })}
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={4}>
          <ModalHeader>¡Enviado!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¡Gracias por completar el formulario! Podés ver las respuestas
            haciendo click acá abajo.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => router.push("/answers")}
            >
              Ver respuestas
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
