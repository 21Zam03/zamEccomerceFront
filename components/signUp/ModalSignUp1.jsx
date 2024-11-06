'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { tipos_carnet } from '@/utils/TiposCarnet';
import { paises } from '@/utils/Paises';

export default function ModalSignUp1({ open, onClose, onOpenSecondModal }) {
    
    const [email, setEmail] = useState('');
    const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [typeIdentityDocument, setTypeIdentityDocument] = useState('');
    const [identityDocumentNumber, setIdentityDocumentNumber] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const isFormValid = () => {
        return (
            name.trim() !== '' &&
            lastName.trim() !== '' &&
            email.trim() !== '' && isInvalid == false &&
            typeIdentityDocument.trim() !== '' &&
            identityDocumentNumber.trim() !== '' &&
            phoneCountryCode.trim() !== '' &&
            phoneNumber.trim() !== '' 
        );
    };

    const handleSubmit = () => {
        localStorage.setItem('firstName', name);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        localStorage.setItem('typeIdentityDocument', typeIdentityDocument)
        localStorage.setItem('phoneCountryCode', phoneCountryCode)
        localStorage.setItem('phoneNumber', phoneNumber)
        onOpenSecondModal();
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
                        <ModalHeader className="flex flex-col gap-1 text-3xl text-center">Crea tu cuenta</ModalHeader>
                        <ModalBody className="flex flex-col gap-5">
                            <div className="flex gap-4">
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    type="text"
                                    variant="bordered"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    label="Apellido"
                                    type="text"
                                    variant="bordered"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="flex">
                                <Input
                                    isInvalid={isInvalid}
                                    label="Correo Electrónico"
                                    type="email"
                                    variant="bordered"
                                    value={email}
                                    errorMessage="Por favor digita un correo valido"
                                    color={isInvalid ? "danger" : ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Select
                                    variant="bordered"
                                    label="Tipo"
                                    placeholder="Tipo"
                                    className="w-1/5"
                                    onChange={(e) => setTypeIdentityDocument(e.target.value)}
                                >
                                    {tipos_carnet.map(carnet => (
                                        <SelectItem key={carnet.value} value={carnet.value}>{carnet.label}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    className="w-4/5"
                                    autoFocus
                                    label="Numero de documento"
                                    type="number"
                                    variant="bordered"
                                    onChange={(e) => setIdentityDocumentNumber(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Select
                                    variant="bordered"
                                    label="Codigo"
                                    placeholder="Codigo"
                                    className="w-1/5"
                                    onChange={(e) => setPhoneCountryCode(e.target.value)}
                                >
                                    {paises.map(pais => (
                                        <SelectItem key={pais.country} value={pais.code}>{pais.code}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    className="w-4/5"
                                    autoFocus
                                    label="N° de telefono"
                                    type="number"
                                    variant="bordered"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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