'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useState } from "react";
import SignIn from '../SignIn/SignIn.jsx';
import Switcher from '../switchTheme/Switcher.jsx';
import SignUp from '../signUp/SignUp.jsx';

export default function NavbarComponent() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    // Estado para el enlace activo
    const [activeLink, setActiveLink] = useState("Inicio");

    // Función para actualizar el enlace activo
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        href="#"
                        onClick={() => handleLinkClick("Inicio")}
                    >
                        <span className={activeLink === "Inicio" ? "text-blue-600" : "text-foreground-900"}>Inicio</span>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="#"
                        onClick={() => handleLinkClick("Productos")} 
                    >
                        <span className={activeLink === "Productos" ? "text-blue-600" : "text-foreground-900"}>Productos</span>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="#"
                        onClick={() => handleLinkClick("Acerca de")} 
                    >
                        <span className={activeLink === "Acerca de" ? "text-blue-600" : "text-foreground-900"}>Acerca de</span>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <SignIn />
                </NavbarItem>
                <NavbarItem>
                    <SignUp/>
                </NavbarItem>
                <NavbarItem>
                    <Switcher/>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}