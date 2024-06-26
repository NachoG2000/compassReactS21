import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const OfertaAcademicaAdminPage = (props) => {
  const universidadId = 1;
  const [ofertas, setOfertas] = useState([]);
  const [tipoOferta, setTipoOferta] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [ofertaToEdit, setOfertaToEdit] = useState(null);
  const [ofertaToDelete, setOfertaToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ofertas/universidad/${universidadId}`);
        setOfertas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [universidadId]);

  const handleInputChange = (e) => {
    setTipoOferta(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/ofertas/universidad/${universidadId}`, {
        tipo_oferta: tipoOferta
      });
      setOfertas([...ofertas, {
        idOfertaAcademica: response.data.id_oferta_academica,
        tipoOferta: response.data.tipo_oferta
      }]);
      setTipoOferta('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/ofertas/${ofertaToEdit.idOfertaAcademica}`, {
        tipo_oferta: ofertaToEdit.tipoOferta
      });
      setOfertas(ofertas.map(oferta => (oferta.idOfertaAcademica === ofertaToEdit.idOfertaAcademica ? ofertaToEdit : oferta)));
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/ofertas/${ofertaToDelete.idOfertaAcademica}`);
      setOfertas(ofertas.filter(oferta => oferta.idOfertaAcademica !== ofertaToDelete.idOfertaAcademica));
      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openEditDialog = (oferta) => {
    setOfertaToEdit(oferta);
    setIsEditDialogOpen(true);
  };

  const openAlertDialog = (oferta) => {
    setOfertaToDelete(oferta);
    setIsAlertDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setOfertaToEdit({ ...ofertaToEdit, [name]: value });
  };

  const ofertasComponent = ofertas.map((oferta) => (
    <TableRow key={oferta.idOfertaAcademica} className="bg-accent">
      <TableCell>{oferta.idOfertaAcademica}</TableCell>
      <TableCell className="hidden sm:table-cell">{oferta.tipoOferta}</TableCell>
      <TableCell className="hidden md:table-cell text-right">
        <div className="flex justify-end">
          <Link to={`${oferta.idOfertaAcademica}`}> 
            <img src="/eye.svg" alt="eye-icon" className='mr-2' />
          </Link>
          <img src="/edit.svg" alt="edit-icon" className="mr-2 cursor-pointer" onClick={() => openEditDialog(oferta)} />
          <img src="/trash.svg" alt="trash-icon" className="mr-2 cursor-pointer" onClick={() => openAlertDialog(oferta)} />
        </div>
      </TableCell>
    </TableRow>
  ));

  const dialogContent = (
    <form onSubmit={handleFormSubmit}>
      <DialogHeader>
        <DialogTitle>Nueva Oferta Academica</DialogTitle>
        <DialogDescription>
          Agrega el nombre de la nueva oferta. Clickea guardar cuando este listo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tipo_oferta" className="text-right">
            Tipo de oferta
          </Label>
          <input
            id="tipo_oferta"
            value={tipoOferta}
            onChange={handleInputChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="col-span-2 px-4 py-2 mt-2 font-medium text-white bg-[#016654] rounded hover:bg-[#01AA8D] focus:outline-none focus:ring focus:ring-[#016654]">Guardar Cambios</Button>
      </DialogFooter>
    </form>
  );

  const alertDialogContent = (
    <div>
      <DialogHeader>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogDescription>¿Estás seguro de que quieres eliminar esta oferta académica?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => setIsAlertDialogOpen(false)} className="col-span-2 px-4 py-2 mt-2 font-medium">Cancelar</Button>
        <Button onClick={handleDelete} className="bg-red-600 col-span-2 px-4 py-2 mt-2 font-medium text-white rounded hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-600">Eliminar</Button>
      </DialogFooter>
    </div>
  );

  const editDialogContent = (
    <form onSubmit={handleEditSubmit}>
      <DialogHeader>
        <DialogTitle>Editar Oferta Academica</DialogTitle>
        <DialogDescription>Edita los campos de la oferta académica y guarda los cambios.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="edit_tipo_oferta" className="text-right">
            Tipo de oferta
          </Label>
          <input
            id="edit_tipo_oferta"
            name="tipoOferta"
            value={ofertaToEdit?.tipoOferta || ''}
            onChange={handleEditChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => setIsEditDialogOpen(false)} className="col-span-2 px-4 py-2 mt-2 font-medium">Cancelar</Button>
        <Button type="submit" className="col-span-2 px-4 py-2 mt-2 font-medium text-white bg-[#016654] rounded hover:bg-[#01AA8D] focus:outline-none focus:ring focus:ring-[#016654]">Guardar Cambios</Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ScrollArea className="h-[78vh] w-full rounded-[0.5rem] border bg-white">
          <Card className="bg-white h-full text-start">
            <CardHeader className="px-7 flex flex-row justify-between">
              <div className='flex flex-col'>
                <CardTitle>Ofertas Academicas</CardTitle>
                <CardDescription>Lista de ofertas academicas disponibles</CardDescription>
              </div>
              <DialogTrigger asChild>
                <Button
                  className="rounded max-w-xs bg-[#016654] hover:bg-[#01AA8D] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Nueva Oferta Academica
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white rounded-[0.5rem]">
                {dialogContent}
              </DialogContent>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">ID</TableHead>
                      <TableHead className="hidden sm:table-cell">Tipo de Oferta</TableHead>
                      <TableHead className="hidden md:table-cell text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ofertasComponent}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <ScrollBar />
        </ScrollArea>
      </Dialog>

      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[0.5rem]">
          {alertDialogContent}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[0.5rem]">
          {editDialogContent}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfertaAcademicaAdminPage;