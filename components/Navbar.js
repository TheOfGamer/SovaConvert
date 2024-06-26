'use strict'

import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from "next/image";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
      <main className="dark">
          <Navbar onMenuOpenChange={setIsMenuOpen}>
              <NavbarContent>
                  <NavbarMenuToggle
                      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                      className="sm:hidden"
                  />
                  <NavbarBrand>

                      <p className="font-bold text-inherit">SovaConvert</p>
                  </NavbarBrand>
              </NavbarContent>

              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                  <NavbarItem isActive>
                      <Link color="foreground" href="https://github.com/TheOfGamer/SovaConvert">
                          GitHub
                      </Link>
                  </NavbarItem>
                  <NavbarItem >
                      <Link color="foreground" href="https://sovagroup.one/" aria-current="page">
                          SovaGroup
                      </Link>
                  </NavbarItem>
              </NavbarContent>
              <NavbarContent justify="end">
                  <NavbarItem>
                      <Button as={Link} color="primary" href="https://www.donationalerts.com/r/theofgamer" variant="flat">
                          Поддержать
                      </Button>
                  </NavbarItem>
              </NavbarContent>
              <NavbarMenu className="dark">
                      <NavbarMenuItem isActve>
                          <Link color="foreground" href="https://github.com/TheOfGamer/SovaConvert">
                              GitHub
                          </Link>
                      </NavbarMenuItem>
                  <NavbarMenuItem>
                      <Link color="foreground" href="https://sovagroup.one/">SovaGroup</Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                      <Link color="foreground" href="https://www.donationalerts.com/r/theofgamer">Поддержать</Link>
                  </NavbarMenuItem>
              </NavbarMenu>
          </Navbar>
      </main>
        );
        }