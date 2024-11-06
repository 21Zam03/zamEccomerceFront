'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";

export default function ModalSignUp2({ open, onClose }) {

    const [password, setPassword] = useState('');
    const validatePassword = (password) => password.match(/^.{10,}$/);

    const isInvalid = useMemo(() => {
        if (password === "") return false;

        return validatePassword(password) ? false : true;
    }, [password]);

    const [confirmPassword, setConfirmPassword] = useState('');
    const validateConfirmPassword = (confirmPassword) => confirmPassword === password;
    const isInvalid2 = useMemo(() => {
        if (confirmPassword === "") return false;

        return validateConfirmPassword(confirmPassword) ? false : true;
    }, [confirmPassword]);


    const isFormValid = () => {
        return (
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            isInvalid === false && isInvalid2 === false
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ACCOUNTS_PROFILE_PHOTO_ENDPOINT}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir la foto de perfil');
            }

            const data = await response.json();

            const userData = {
                idStudent: data.idStudent,
                email: data.email,
                picturePhoto: data.picturePhoto,
                fullName: data.fullName,
                nickName: data.nickName
            };
            iniciarSesion(userData);

            router.push('/');

        } catch (error) {
            console.error('Error al subir la foto de perfil:', error.message);
            alert('Hubo un problema al subir tu foto de perfil. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }

        onClose();
    };

    return (
        <>
            <Modal
                isOpen={open}
                onClose={onClose}
                placement="center"
                backdrop="opaque"
            >
                <ModalContent className="py-5">
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-3xl text-starts">Necesitaras una contraseña<br /> <span className="text-xs">Asegurate que contenga 8 carácteres o mas</span></ModalHeader>
                        <ModalBody className="flex flex-col gap-5">
                            <div className="flex flex-col gap-4">
                                <Input
                                    label="Contraseña"
                                    type="password"
                                    variant="bordered"
                                    value={password}
                                    errorMessage="La contraseña debe contener almenos 10 digitos"
                                    color={isInvalid ? "danger" : ""}
                                    isInvalid={isInvalid}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    label="Contraseña de confirmación"
                                    placeholder="Confirma tu contraseña"
                                    type="password"
                                    variant="bordered"
                                    value={confirmPassword}
                                    errorMessage="La contraseña debe coincidir"
                                    color={isInvalid2 ? "danger" : ""}
                                    isInvalid={isInvalid2}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex flex-col">
                            <Button color="primary" isDisabled={!isFormValid()} onClick={handleSubmit}>
                                Siguiente
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}