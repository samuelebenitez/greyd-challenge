import { useState, useEffect } from "react";
import {
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { ref, onValue } from "firebase/database";
import { database } from "../firebase.js";

function SurveyAnswers() {
  const router = useRouter();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const answersRef = ref(database, "form-data");

      onValue(answersRef, (snapshot) => {
        setAnswers(Object.values(snapshot?.val()));
      });
    } catch (error) {
      setError(true);
    }
  }, []);

  console.log(answers);

  return (
    <Flex
      align="space-between"
      justify="space-between"
      direction="column "
      bgGradient={[
        "linear(to-t, blackAlpha.800, blackAlpha.900)",
        "linear(to-b, blackAlpha.800, blackAlpha.900)",
      ]}
      p={[4, 8]}
      w="100%"
      minH="100vh"
      color="white"
    >
      <Flex w="100%" justify="space-around" align="center">
        <Button onClick={() => router.back()} colorScheme="purple">
          Volver
        </Button>
        <Heading color="purple.400" fontSize={["lg", "2xl"]} my={8} mx={4}>
          Respuestas del formulario
        </Heading>
      </Flex>

      <Grid
        w="100%"
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={[2, 4]}
      >
        {answers.map((answer, key) => (
          <GridItem key={key} bgColor="gray.600" borderRadius={8} p={[4, 8]}>
            <Text
              my={[1, 2]}
              as="b"
              color="purple.300"
              textTransform="uppercase"
              fontSize={["md", "lg"]}
            >
              Nombre:
            </Text>

            <Text my={[1, 2]} color="white" fontSize={["sm", "md"]}>
              {answer.full_name}
            </Text>

            <Text
              my={[1, 2]}
              as="b"
              color="purple.300"
              textTransform="uppercase"
              fontSize={["md", "lg"]}
            >
              Email:
            </Text>
            <Text my={[1, 2]} color="white" fontSize={["sm", "md"]}>
              {answer.email}
            </Text>
            <Text
              my={[1, 2]}
              as="b"
              color="purple.300"
              textTransform="uppercase"
              fontSize={["md", "lg"]}
            >
              Fecha de nacimiento
            </Text>
            <Text my={[1, 2]} color="white" fontSize={["sm", "md"]}>
              {answer.birth_date}
            </Text>
            <Text
              my={[1, 2]}
              as="b"
              color="purple.300"
              textTransform="uppercase"
              fontSize={["md", "lg"]}
            >
              País de residencia:
            </Text>
            <Text my={[1, 2]} color="white" fontSize={["sm", "md"]}>
              {answer.country_of_origin}
            </Text>
          </GridItem>
        ))}
        {error ?? <Heading>AÚN NO HAY RESPUESTAS</Heading>}
      </Grid>
    </Flex>
  );
}

export default SurveyAnswers;
