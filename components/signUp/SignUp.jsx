'use client'

import React from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import ModalSignUp1 from './ModalSignUp1';
import ModalSignUp2 from './ModalSignUp2';

export default function MainModal() {
    const { isOpen: isFirstModalOpen, onOpen: openFirstModal, onClose: closeFirstModal } = useDisclosure();
    const { isOpen: isSecondModalOpen, onOpen: openSecondModal, onClose: closeSecondModal } = useDisclosure();
    
    const handleOpenSecondModal = () => {
        closeFirstModal();
        openSecondModal();
    };

    return (
        <>
            <Button onClick={openFirstModal} color="primary" variant="flat">
                Crear cuenta
            </Button>

            <ModalSignUp1
                open={isFirstModalOpen}
                onClose={closeFirstModal}
                onOpenSecondModal={handleOpenSecondModal}
            />

            <ModalSignUp2
                open={isSecondModalOpen}
                onClose={closeSecondModal}
            />

        </>
    );
};