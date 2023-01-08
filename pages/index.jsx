// chakra ui components
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
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
  Heading,
} from "@chakra-ui/react";

//react-hook-form
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

// to uso firebase
import { ref, push } from "firebase/database";
import { database } from "../firebase.js";

//input fields
import items from "../items/db.json";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //sending data to firebase realtime database and opening modal after
  const onSubmit = (data) => {
    console.log(errors);
    try {
      const formDataRef = ref(database, "form-data");
      push(formDataRef, data);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  //hook to manage modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <Flex
      align="center"
      justify="center"
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
      {/* TITLE */}
      <Heading color="purple.400" fontSize={["3xl", "4xl"]}>
        Greydive challenge
      </Heading>

      {/* FORM */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {items.map((item, key) => {
          const { type, label, name, required, options } = item;

          switch (type) {
            case "text":
              return (
                <FormControl isInvalid={errors.full_name} my={8} key={key}>
                  <FormLabel color="white" fontSize={["md", "lg"]}>
                    {label}
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    name={name}
                    color="white"
                    {...register(`${name}`, { required: required })}
                  />
                  {errors.full_name && (
                    <FormErrorMessage>Este campo es requerido</FormErrorMessage>
                  )}
                </FormControl>
              );
            case "email":
              return (
                <FormControl isInvalid={errors.email} my={8} key={key}>
                  <FormLabel color="white" fontSize={["md", "lg"]}>
                    {label}
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    name={name}
                    color="white"
                    {...register(`${name}`, { required: required })}
                  />
                  {errors.email && (
                    <FormErrorMessage>Este campo es requerido</FormErrorMessage>
                  )}
                </FormControl>
              );
            case "date":
              return (
                <FormControl isInvalid={errors.birth_date} my={8} key={key}>
                  <FormLabel color="white" fontSize={["md", "lg"]}>
                    {label}
                  </FormLabel>
                  <Input
                    type="date"
                    color="white"
                    name={name}
                    {...register(`${name}`, { required: required })}
                  />
                  {errors.birth_date && (
                    <FormErrorMessage>Este campo es requerido</FormErrorMessage>
                  )}
                </FormControl>
              );
            case "select":
              return (
                <FormControl
                  isInvalid={errors.country_of_origin}
                  my={8}
                  key={key}
                >
                  <FormLabel color="white" fontSize={["md", "lg"]}>
                    {label}
                  </FormLabel>
                  <Select
                    color="gray.500"
                    name={name}
                    {...register(`${name}`, { required: required })}
                  >
                    {options.map((option, key) => (
                      <option key={key} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {errors.country_of_origin && (
                    <FormErrorMessage>Este campo es requerido</FormErrorMessage>
                  )}
                </FormControl>
              );
            case "checkbox":
              return (
                <FormControl
                  isInvalid={errors.terms_and_conditions}
                  my={8}
                  key={key}
                >
                  <FormLabel color="white" fontSize={["md", "lg"]}>
                    {label}
                  </FormLabel>
                  <Checkbox
                    name={name}
                    variant="filled"
                    size="lg"
                    colorScheme="purple"
                    {...register(`${name}`, { required: required })}
                  />
                  {errors.terms_and_conditions && (
                    <FormErrorMessage>Este campo es requerido</FormErrorMessage>
                  )}
                </FormControl>
              );
            case "submit":
              return (
                <Flex my={8} key={key}>
                  <Button type="submit" colorScheme="purple" size="lg">
                    {label}
                  </Button>
                </Flex>
              );
            default:
              return null;
          }
        })}
      </form>

      {/* MODAL */}

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
