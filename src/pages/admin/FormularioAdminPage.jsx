import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { Label } from '@/components/ui/label';
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

const FormularioAdminPage = () => {
  const universidadId = 1;
  const [preguntas, setPreguntas] = useState([]);
  const [textoPregunta, setTextoPregunta] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [preguntaToEdit, setPreguntaToEdit] = useState(null);
  const [preguntaToDelete, setPreguntaToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/preguntas/${universidadId}`);
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [universidadId]);

  const handleInputChange = (e) => {
    setTextoPregunta(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/createPregunta/${universidadId}`, {
        texto_pregunta: textoPregunta
      });
      setPreguntas([...preguntas, {
        id_pregunta: response.data.id_pregunta,
        texto_pregunta: response.data.texto_pregunta
      }]);
      setTextoPregunta('');
      setIsDialogOpen(false); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/v1/updatePregunta/${preguntaToEdit.id_pregunta}`, {
        texto_pregunta: preguntaToEdit.texto_pregunta
      });
      setPreguntas(preguntas.map(pregunta => (pregunta.id_pregunta === preguntaToEdit.id_pregunta ? preguntaToEdit : pregunta)));
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/deletePregunta/${preguntaToDelete.id_pregunta}`);
      setPreguntas(preguntas.filter(pregunta => pregunta.id_pregunta !== preguntaToDelete.id_pregunta));
      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openEditDialog = (pregunta) => {
    setPreguntaToEdit(pregunta);
    setIsEditDialogOpen(true);
  };

  const openAlertDialog = (pregunta) => {
    setPreguntaToDelete(pregunta);
    setIsAlertDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setPreguntaToEdit({ ...preguntaToEdit, [name]: value });
  };

  const preguntasComponent = preguntas.map((pregunta) => (
    <TableRow key={pregunta.id_pregunta} className="bg-accent">
      <TableCell>{pregunta.id_pregunta}</TableCell>
      <TableCell className="hidden sm:table-cell">{pregunta.texto_pregunta}</TableCell>
      <TableCell className="hidden md:table-cell text-right">
        <div className="flex justify-end">
          <img src="/edit.svg" alt="edit-icon" className="mr-2 cursor-pointer" onClick={() => openEditDialog(pregunta)} />
          <img src="/trash.svg" alt="trash-icon" className="mr-2 cursor-pointer" onClick={() => openAlertDialog(pregunta)} />
        </div>
      </TableCell>
    </TableRow>
  ));

  const dialogContent = (
    <form onSubmit={handleFormSubmit}>
      <DialogHeader>
        <DialogTitle>Nueva pregunta</DialogTitle>
        <DialogDescription>
          Agrega el texto de la nueva pregunta. Clickea guardar cuando este listo.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="texto_pregunta" className="text-right">
            Texto de la Pregunta
          </Label>
          <input
            id="texto_pregunta"
            value={textoPregunta}
            onChange={handleInputChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="col-span-2 px-4 py-2 mt-6 font-medium text-white bg-[#016654] rounded hover:bg-[#01AA8D] focus:outline-none focus:ring focus:ring-[#016654]">Guardar Cambios</Button>
      </DialogFooter>
    </form>
  );

  const alertDialogContent = (
    <div>
      <DialogHeader>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogDescription>¿Estás seguro de que quieres eliminar esta pregunta?</DialogDescription>
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
        <DialogTitle>Editar Pregunta</DialogTitle>
        <DialogDescription>Edita el texto de la pregunta y guarda los cambios.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="edit_texto_pregunta" className="text-right">
            Texto de la Pregunta
          </Label>
          <input
            id="edit_texto_pregunta"
            name="texto_pregunta"
            value={preguntaToEdit?.texto_pregunta || ''}
            onChange={handleEditChange}
            className="col-span-3 w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => setIsEditDialogOpen(false)} className="col-span-2 px-4 py-2 mt-6 font-medium">Cancelar</Button>
        <Button type="submit" className="col-span-2 px-4 py-2 mt-6 font-medium text-white bg-[#016654] rounded hover:bg-[#01AA8D] focus:outline-none focus:ring focus:ring-[#016654]">Guardar Cambios</Button>
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
                <CardTitle>Formulario</CardTitle>
                <CardDescription>Lista de preguntas</CardDescription>
              </div>
              <DialogTrigger asChild>
                <Button
                  className="rounded max-w-xs bg-[#016654] hover:bg-[#01AA8D] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Nueva Pregunta
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
                      <TableHead className="hidden sm:table-cell">Texto de la Pregunta</TableHead>
                      <TableHead className="hidden md:table-cell text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preguntasComponent}
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

export default FormularioAdminPage;