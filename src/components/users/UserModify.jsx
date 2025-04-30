import { useState } from "react";
import {
    validateUsername,
    validateUsernameMessage,
    validateEmail,
    emailValidationMessage,
    validatePasswordMessage,
    validatePassword
} from "../../shared/validators"
import { CustomInput } from "../Input";
import { useDisclosure } from "@chakra-ui/react";

const inputs = [
    {
        field: 'name',
        label: 'Name',
        validationMessage: '',
        type: 'text'
    },
    {
        field: 'surname',
        label: 'Lastname',
        validationMessage: '',
        type: 'text'
    },
    {
        field: 'username',
        label: 'Username',
        validationMessage: validateUsernameMessage,
        type: 'text'
    },
    {
        field: 'phone',
        label: 'Phone',
        validationMessage: '',
        type: 'text'
    },
    {
        field: 'email',
        label: 'Email',
        validationMessage: emailValidationMessage,
        type: 'text'
    },
    {
        field: 'password',
        label: 'Password',
        validationMessage: validatePasswordMessage
    }
]

export const UsersModify = ({ settings, saveSettings }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [formState, setFormState] = useState({
        name: {
            isValid: true,
            showError: false,
            value: settings.name
        },
        surname: {
            isValid: true,
            showError: false,
            value: settings.surname
        },
        username: {
            isValid: validateUsername(settings.username),
            showError: false,
            value: settings.username
        },
        phone: {
            isValid: true,
            showError: false,
            value: settings.phone
        },
        email: {
            isValid: validateEmail(settings.email),
            showError: true,
            value: settings.email
        },
        password: {
            isValid: validatePassword(settings.password),
            showError: true,
            value: settings.password
        }
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {

        let isValid = false

        switch (field) {
            case 'name':
                isValid = true
                break
            case 'surname':
                isValid = true
                break
            case 'username':
                isValid = validateUsername(value)
                break
            case 'phone':
                isValid = true
                break
            case 'email':
                isValid = validateEmail(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))

    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onClose();

        saveSettings({
            name: formState.name.value,
            surname: formState.surname.value,
            username: formState.username.value,
            phone: formState.phone.value,
            email: formState.email.value,
            password: formState.email.value
        })
    }

    const isSubmitButtonDisabled = !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.phone.isValid ||
        !formState.email.isValid ||
        !formState.email.isValid

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        {inputs.map((input) => (
                            <CustomInput
                                key={input.field}
                                field={input.field}
                                label={input.label}
                                value={formState[input.field].value}
                                onChangeHandler={handleInputValueChange}
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState[input.field].showError}
                                validationMessage={input.validationMessage}
                                type={input.type}
                                textArea={input.textArea}
                            />
                        ))}
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}