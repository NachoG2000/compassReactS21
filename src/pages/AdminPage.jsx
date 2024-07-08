import React from "react"
import axios from "axios"

import { Link, NavLink, Outlet } from "react-router-dom"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import useAuth from "../auth/useAuth"

export default function AdminPage() {
  const { auth, setAuth } = useAuth()

  const handleLogOut = async (e) => {
    // e.preventDefault();

    try {
        const response = axios.post('http://localhost:8080/api/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setAuth({});
        console.log(auth)
    } catch (error) {
        console.error('Logout failed', error);
        // Handle login error (e.g., show error message to user)
    }
  } 

  return (
    <div className="flex h-screen w-full">
      <div className="bg-[#016654] text-white w-64">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/administrador" className="flex items-center gap-2">
            <span className="font-bold">Panel de Administrador</span>
          </Link>
        </div>
        <nav className="mt-4">
          <NavLink
            to="/administrador"
            end
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-[#01AA8D] text-white'
                : 'flex items-center gap-3 px-4 py-3 hover:bg-[#01AA8D]'
            }
          >
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/administrador/ofertaacademica"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-[#01AA8D] text-white'
                : 'flex items-center gap-3 px-4 py-3 hover:bg-[#01AA8D]'
            }
          >
            <BookIcon className="h-5 w-5" />
            <span>Oferta Academica</span>
          </NavLink>
          <NavLink
            to="/administrador/formulario"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-[#01AA8D] text-white'
                : 'flex items-center gap-3 px-4 py-3 hover:bg-[#01AA8D]'
            }
          >
            <FileIcon className="h-5 w-5" />
            <span>Formulario</span>
          </NavLink>
          <NavLink
            to="/administrador/usuarios"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-[#01AA8D] text-white'
                : 'flex items-center gap-3 px-4 py-3 hover:bg-[#01AA8D]'
            }
          >
            <UsersIcon className="h-5 w-5" />
            <span>Usuarios</span>
          </NavLink>
          <NavLink
            to="/administrador/settings"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 px-4 py-3 bg-[#01AA8D] text-white'
                : 'flex items-center gap-3 px-4 py-3 hover:bg-[#01AA8D]'
            }
          >
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-800">
        <header className="bg-white dark:bg-gray-900 shadow">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Link to="/administrador" className="flex items-center gap-2">
                <span className="font-bold">Universidad Siglo 21</span>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>{auth.email}</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="container h-max mx-auto py-8 px-4 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}