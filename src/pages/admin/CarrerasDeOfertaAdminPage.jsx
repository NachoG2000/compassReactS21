import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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

const CarrerasDeOfertaAdminPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [carreras, setCarreras] = useState([]);
  const [nombreCarrera, setNombreCarrera] = useState('');
  const [descripcionCarrera, setDescripcionCarrera] = useState('');
  const [duracionCarrera, setDuracionCarrera] = useState('');
  const [linkWebCarrera, setLinkWebCarrera] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [carreraToDelete, setCarreraToDelete] = useState(null);
  const [carreraToEdit, setCarreraToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/carreras/oferta/${params.id}`);
        setCarreras(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate('/administrador/*');
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [params.id, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/carreras/oferta/${params.id}`, {
        nombre_carrera: nombreCarrera,
        descripcion_carrera: descripcionCarrera,
        duracion_carrera: duracionCarrera,
        link_web_carrera: linkWebCarrera
      });
      setCarreras([...carreras, {
        id_carrera: response.data.id_carrera,
        nombre_carrera: response.data.nombre_carrera,
        descripcion_carrera: response.data.descripcion_carrera,
        duracion_carrera: response.data.duracion_carrera,
        link_web_carrera: response.data.link_web_carrera
      }]);
      setNombreCarrera('');
      setDescripcionCarrera('');
      setDuracionCarrera('');
      setLinkWebCarrera('');
      setIsDialogOpen(false);  // Close the dialog after successful submission
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/carreras/${carreraToDelete.id_carrera}`);
      setCarreras(carreras.filter(carrera => carrera.id_carrera !== carreraToDelete.id_carrera));
      setIsAlertDialogOpen(false);  // Close the alert dialog after successful deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/carreras/${carreraToEdit.id_carrera}`, {
        nombre_carrera: carreraToEdit.nombre_carrera,
        descripcion_carrera: carreraToEdit.descripcion_carrera,
        duracion_carrera: carreraToEdit.duracion_carrera,
        link_web_carrera: carreraToEdit.link_web_carrera
      });
      setCarreras(carreras.map(carrera => (carrera.id_carrera === carreraToEdit.id_carrera ? carreraToEdit : carrera)));
      setIsEditDialogOpen(false);  // Close the edit dialog after successful update
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const openAlertDialog = (carrera) => {
    setCarreraToDelete(carrera);
    setIsAlertDialogOpen(true);
  };

  const openEditDialog = (carrera) => {
    setCarreraToEdit(carrera);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCarreraToEdit({ ...carreraToEdit, [name]: value });
  };

  const carrerasComponent = carreras.map((carrera) => (
    <TableRow key={carrera.id_carrera} className="bg-accent">
      <TableCell>{carrera.id_carrera}</TableCell>
      <TableCell className="hidden sm:table-cell">{carrera.nombre_carrera}</TableCell>
      <TableCell className="hidden sm:table-cell">{carrera.duracion_carrera}</TableCell>
      <TableCell className="hidden sm:table-cell underline text-blue-800">
        <a href={carrera.link_web_carrera} target="_blank" rel="noopener noreferrer">
          <img src="/link.svg" alt="" />
        </a>
      </TableCell>
      <TableCell className="hidden md:table-cell text-right"> 
        <div className="flex justify-end">
          <img src="/edit.svg" alt="edit-icon" className="mr-2 cursor-pointer" onClick={() => openEditDialog(carrera)} />
          <img src="/trash.svg" alt="trash-icon" className="mr-2 cursor-pointer" onClick={() => openAlertDialog(carrera)} />
        </div>
      </TableCell>
    </TableRow>
  ));

  const dialogAddContent = (
    <form onSubmit={handleFormSubmit}>
      <DialogHeader>
        <DialogTitle>Nueva Carrera</DialogTitle>
        <DialogDescription>
          Agrega el texto de la nueva Carrera. Clickea guardar cuando este listo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="nombre_carrera" className="text-right">
            Nombre de la Carrera
          </Label>
          <input
            id="nombre_carrera"
            value={nombreCarrera}
            onChange={(e) => setNombreCarrera(e.target.value)}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="descripcion_carrera" className="text-right">
            Descripcion de la Carrera
          </Label>
          <input
            id="descripcion_carrera"
            value={descripcionCarrera}
            onChange={(e) => setDescripcionCarrera(e.target.value)}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duracion_carrera" className="text-right">
            Duracion de la Carrera
          </Label>
          <input
            id="duracion_carrera"
            value={duracionCarrera}
            onChange={(e) => setDuracionCarrera(e.target.value)}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="link_web_carrera" className="text-right">
            Link Web de la Carrera
          </Label>
          <input
            id="link_web_carrera"
            value={linkWebCarrera}
            onChange={(e) => setLinkWebCarrera(e.target.value)}
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
        <DialogDescription>¿Estás seguro de que quieres eliminar esta carrera?</DialogDescription>
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
        <DialogTitle>Editar Carrera</DialogTitle>
        <DialogDescription>
          Edita los campos de la carrera y guarda los cambios.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="edit_nombre_carrera" className="text-right">
            Nombre de la Carrera
          </Label>
          <input
            id="edit_nombre_carrera"
            name="nombre_carrera"
            value={carreraToEdit?.nombre_carrera || ''}
            onChange={handleEditChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="edit_descripcion_carrera" className="text-right">
            Descripcion de la Carrera
          </Label>
          <input
            id="edit_descripcion_carrera"
            name="descripcion_carrera"
            value={carreraToEdit?.descripcion_carrera || ''}
            onChange={handleEditChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="edit_duracion_carrera" className="text-right">
            Duracion de la Carrera
          </Label>
          <input
            id="edit_duracion_carrera"
            name="duracion_carrera"
            value={carreraToEdit?.duracion_carrera || ''}
            onChange={handleEditChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="edit_link_web_carrera" className="text-right">
            Link Web de la Carrera
          </Label>
          <input
            id="edit_link_web_carrera"
            name="link_web_carrera"
            value={carreraToEdit?.link_web_carrera || ''}
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
                <CardTitle>Carreras</CardTitle>
                <CardDescription>Lista de Carreras de Oferta Academica {params.id}</CardDescription>
              </div>
              <DialogTrigger asChild>
                <Button
                  className="rounded max-w-xs bg-[#016654] hover:bg-[#01AA8D] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Nueva Carrera
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white rounded-[0.5rem]">
                {dialogAddContent}
              </DialogContent>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">ID</TableHead>
                      <TableHead className="hidden sm:table-cell">Nombre</TableHead>
                      <TableHead className="hidden sm:table-cell">Duración</TableHead>
                      <TableHead className="hidden sm:table-cell">Link web</TableHead>
                      <TableHead className="hidden md:table-cell text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carrerasComponent}
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

export default CarrerasDeOfertaAdminPage;