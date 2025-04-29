import { useState } from "react";
import { CustomInput } from "./Input";
import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirPassword,
    validateUsernameMessage,
    emailValidationMessage,
    validatePasswordMessage,
    passwordConfirmationMessage,
} from "../shared/validators";
import { useRegister } from "../shared/hooks";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    useColorModeValue,
    Stack,
    Heading,
    Text,
    Flex,
    Image,
} from "@chakra-ui/react";

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        username: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
        passwordConfir: {
            value: "",
            isValid: false,
            showError: false,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "email":
                isValid = validateEmail(value);
                break;
            case "username":
                isValid = validateUsername(value);
                break;
            case "password":
                isValid = validatePassword(value);
                break;
            case "passwordConfir":
                isValid = validateConfirPassword(formState.password.value, value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));

        
    };

    const handleRegister = (e) => {
        e.preventDefault();
        register(
            formState.email.value,
            formState.password.value,
            formState.username.value
        );
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfir.isValid ||
        !formState.username.isValid;

    const formBackground = useColorModeValue("white", "gray.700");
    const labelColor = useColorModeValue("gray.700", "gray.200");
    const buttonColor = useColorModeValue("red.500", "red.800");

    return (
        <Flex
            position="relative"
            minH="100vh"
            align="center"
            justify="center"
            p={8}
        >
            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={8}
                align="center"
                position="relative"
                zIndex={1}
            >
                <Box
                    flex="1"
                    bg={formBackground}
                    p={8}
                    borderRadius="md"
                    boxShadow="dark-lg"
                    maxW="md"
                    w="full"
                >
                    <Stack spacing={4}>
                        <Stack align="center">
                            <Heading fontSize="3xl" textAlign="center">
                                Sign up
                            </Heading>
                            <Text fontSize="lg" color="white.600">

                            </Text>
                        </Stack>
                        <form>
                            <VStack spacing={4}>
                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        // type="text"
                                        // placeholder="Name"
                                        // bg={inputBackground}
                                        // value={name}
                                        // onChange={handleNameChange}
                                        field='email'
                                        label='Email'
                                        value={formState.email.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.email.showError}
                                        validationMessage={emailValidationMessage}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='username'
                                        label='Username'
                                        value={formState.username.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='text'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.username.showError}
                                        validationMessage={validateUsernameMessage}
                                    />
                                </FormControl>
                                
                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='password'
                                        label='New Password'
                                        value={formState.password.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='password'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.password.showError}
                                        validationMessage={validatePasswordMessage}
                                    />
                                </FormControl>
                                
                                <FormControl>
                                    <FormLabel color={labelColor}></FormLabel>
                                    <CustomInput
                                        field='newPassowrd'
                                        label='Confirm Password'
                                        value={formState.passwordConfir.value}
                                        onChangeHandler={handleInputValueChange}
                                        type='password'
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={formState.passwordConfir.showError}
                                        validationMessage={passwordConfirmationMessage}
                                    />
                                </FormControl>
                                <Button
                                    bg={buttonColor}
                                    color="white"
                                    _hover={{ bg: "red.700" }}
                                    width="full"
                                    type="submit"
                                    isDisabled={isSubmitButtonDisabled}
                                    onClick={handleRegister}
                                >
                                    Sign Up
                                </Button>
                            </VStack>
                        </form>
                        <Text textAlign="center">
                            Already have an account{" "}
                            <Box
                                as="span"
                                fontWeight="bold"
                                color="blue.300"
                                cursor="pointer"
                                onClick={switchAuthHandler}
                            >
                                Sign In
                            </Box>
                        </Text>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
