'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Progress } from "@nextui-org/react";
import { MailIcon } from './MailIcon.jsx';
import { LockIcon } from './LockIcon.jsx';
import { useAuth } from "@/contexts/authContext.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function ModalSignIn() {
    const { login } = useAuth();
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const [loading, setLoading] = useState(false);

    const iniciarSesion = (userData) => {
        login(userData);
    }

    const handleSubmit = async () => {
        
        if (!email || !password) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                if (response.status === 401) {
                    setMessage("El correo o contraseña son incorrectos!")
                }
                //throw new Error('Error en la solicitud');
            } else {
                const data = await response.json();
                const userData = { 
                    personId: data.personId,
                    email: data.email,
                    picturePhoto: data.picturePhoto,
                    fullName: data.fullName,
                    nickName: data.nickName,
                    roles: data.roles
                };
                iniciarSesion(userData);
                router.push('/');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Hubo un error en el servidor")
            //setError('Hubo un problema al iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <Link href={"/auth/signIn"} className="text-orange-400">¿Ya tienes una cuenta?</Link> */}
            <Button variant="light" onPress={onOpen}><span className="text-blue-700">Iniciar Sesión</span></Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="opaque"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {loading && (
                                <Progress
                                    color="warning"
                                    size="sm"
                                    isIndeterminate
                                    aria-label="Loading..."
                                    className="w-full"
                                />
                            )}
                            <ModalHeader className="flex flex-col gap-1">Inicio de sesíon</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Correo"
                                    placeholder="Digita tu correo"
                                    type="email"
                                    variant="bordered"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Contraseña"
                                    placeholder="Digita tu contraseña"
                                    type="password"
                                    variant="bordered"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    message != null ? (
                                        <p className="text-red-500 text-sm pl-2">{message}</p>
                                    ) : (
                                        <></>
                                    )
                                }
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        color="primary"
                                        classNames={{
                                            label: "text-small dark:text-white",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link href="/auth/password" size="sm">
                                        ¿Olvidastes tu contraseña?
                                    </Link>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onClick={handleSubmit}>
                                    Iniciar Sesión
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}