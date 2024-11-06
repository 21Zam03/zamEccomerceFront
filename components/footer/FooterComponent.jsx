'use client';

import { AcmeLogo } from '../navbar/AcmeLogo';

export default function FooterComponent() {
    return (
        <div className="w-full flex flex-col">
            <div className='flex items-start justify-evenly py-5'>
                <div className="flex items-center gap-2">
                    <div className='border rounded-xl'><AcmeLogo /></div>
                    <p className="font-bold text-inherit">ACME STORE</p>
                </div>
                <div className="">
                    <ul className='flex flex-col gap-3'>
                        <li><a href="#" className='text-gray-500'>Acerca de nosotros</a></li>
                        <li><a href="#" className='text-gray-500'>Términos y Condiciones</a></li>
                        <li><a href="#" className='text-gray-500'>Política de cookies</a></li>
                        <li><a href="#" className='text-gray-500'>Política de privacidad</a></li>
                        <li><a href="#" className='text-gray-500'>Revisa tu boleta</a></li>
                    </ul>
                </div>
            </div>
            <div className='flex w-full py-5 border-t p-5 justify-center gap-2'>
                <p className='text-gray-400'>© 2023-2024 ACME, Inc. All rights reserved.</p>
                <p className='text-gray-400'>@21Zam03</p>
            </div>
        </div>
    );
}