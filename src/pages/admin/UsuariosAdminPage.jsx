import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const UsuariosAdminPage = () => {
  const universidadId = 1;
  const [usuarios, setUsuarios] = useState([]);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/usuarios/universidad/${universidadId}`);
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [universidadId]);

  const getCarrerasSeleccionadas = async (idUsuario) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/carreras/usuario/${idUsuario}`);
      console.log(response.data);
      setCarrerasSeleccionadas(response.data);
    } catch (error) {
      console.error('Error fetching carreras seleccionadas:', error);
    }
  };

  const openAlertDialog = (usuario) => {
    setUsuarioToDelete(usuario);
    setIsAlertDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/usuarios/${usuarioToDelete.idUsuario}`);
      setUsuarios(usuarios.filter(usuario => usuario.idUsuario !== usuarioToDelete.idUsuario));
      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  
  const carrerasSeleccionadasComponent = carrerasSeleccionadas.map((carrera) => (
    <li key={carrera.id_carrera}>{carrera.nombre_carrera}</li>
  ));

  const usuariosComponent = usuarios.map((usuario) => (
    <TableRow key={usuario.idUsuario} className="bg-accent">
      <TableCell>{usuario.idUsuario}</TableCell>
      <TableCell>
        <div className="font-medium">{usuario.nombreUsuario}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {usuario.email}
        </div>
      </TableCell>
      <TableCell>{usuario.fechaNacimiento}</TableCell>
      <TableCell>{usuario.genero}</TableCell>
      <TableCell className="hidden md:table-cell text-right">
        <div className='flex justify-end'>
          <HoverCard>
            <HoverCardTrigger >
              <img src="/eye.svg" alt="eye-icon" className="mr-2 cursor-pointer" onMouseOver={() => getCarrerasSeleccionadas(usuario.idUsuario)}/>
            </HoverCardTrigger>
            <HoverCardContent className="bg-white mr-10 text-left rounded-[0.5rem]">
              <div className="text-lg font-semibold">Carreras seleccionadas:</div>
              <div className='mt-2 flex flex-col gap-y-1'>
                {carrerasSeleccionadasComponent} 
              </div>
            </HoverCardContent>
          </HoverCard>
          <img src="/trash.svg" alt="delete-icon" className="mr-2 cursor-pointer" onClick={() => openAlertDialog(usuario)} />
        </div>
      </TableCell>
    </TableRow>
  ));

  const alertDialogContent = (
    <div>
      <DialogHeader>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogDescription>¿Estás seguro de que quieres eliminar este usuario?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => setIsAlertDialogOpen(false)} className="col-span-2 px-4 py-2 mt-2 font-medium">Cancelar</Button>
        <Button onClick={handleDelete} className="bg-red-600 col-span-2 px-4 py-2 mt-2 font-medium text-white rounded hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-600">Eliminar</Button>
      </DialogFooter>
    </div>
  );

  return (
    <div className="">
      <ScrollArea className="h-[78vh] w-full rounded-[0.5rem] border bg-white">
        <Card className="bg-white h-full text-start">
          <CardHeader className="px-7">
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Lista de estudiantes</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="h-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden sm:table-cell">ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Usuario</TableHead>
                    <TableHead className="hidden sm:table-cell">Fecha de nacimiento</TableHead>
                    <TableHead className="hidden sm:table-cell">Genero</TableHead>
                    <TableHead className="hidden md:table-cell text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosComponent}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <ScrollBar />
      </ScrollArea>

      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[0.5rem]">
          {alertDialogContent}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsuariosAdminPage;