import { useState, useEffect } from "react";
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
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { ref, onValue } from "firebase/database";
import { database } from "../firebase.js";

function SurveyAnswers() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const answersRef = ref(database, "form-data");

    const Respuesta = onValue(answersRef, (snapshot) => {
      setAnswers(Object.values(snapshot.val()));
    });
  }, []);

  console.log(answers);

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
      <Text color="purple.400" fontSize="2xl" my={8} textTransform="uppercase">
        Respuestas del formulario
      </Text>

      {answers.map((answer, key) => (
        <Box w="100%" key={key}>
          <Text as="u" color="purple.100" fontSize="lg">
            Nombre:
          </Text>
          <Text color="white" fontSize="lg">
            {answer.full_name}
          </Text>
          <Text as="u" color="purple.100" fontSize="lg">
            Email:
          </Text>
          <Text color="white" fontSize="lg">
            {answer.email}
          </Text>
          <Text as="u" color="purple.100" fontSize="lg">
            Fecha de nacimiento
          </Text>
          <Text color="white" fontSize="lg">
            {answer.birth_date}
          </Text>
          <Text as="u" color="purple.100" fontSize="lg">
            País de residencia:
          </Text>
          <Text color="white" fontSize="lg">
            {answer.country_of_origin}
          </Text>

          <Divider my={8} />
        </Box>
      ))}
    </Flex>
  );
}

export default SurveyAnswers;
