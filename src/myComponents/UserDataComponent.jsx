import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";

const UserDataComponent = ({ universityId, nextSection, setUserData }) => {
  const [ofertas, setOfertas] = useState([]);
  const [userData, setUserDataState] = useState({
    name: '',
    email: '',
    birthday: '',
    gender: '',
    ofertaAcademicaId: '',
    universidadId: universityId
  });

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ofertas/universidad/${universityId}`);
        setOfertas(response.data);
      } catch (error) {
        console.error('Error fetching ofertas:', error);
      }
    };
    fetchOfertas();
  }, [universityId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDataState(prevState => ({
      ...prevState,
      [name]: name === 'ofertaAcademicaId' ? (value ? Number(value) : value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserData(userData);
    nextSection();
  };

  const { name, email, birthday, gender, ofertaAcademicaId } = userData;

  return (
    <div className="flex flex-col items-center justify-center md:h-screen">
      <div className="rounded-xl border border-gray-200 bg-white p-8 w-full max-w-md md:max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-black">
          ¡Estamos casi listos!
        </h2>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Completa estos campos para que puedas conocer tus resultados.
        </h2>
        <form className="flex flex-col md:grid gap-4 md:grid-cols-2 md:gap-6" onSubmit={handleSubmit}>
          {[
            { label: 'Nombre', name: 'name', type: 'text', value: name },
            { label: 'Email', name: 'email', type: 'email', value: email },
            { label: 'Fecha de Nacimiento', name: 'birthday', type: 'date', value: birthday },
          ].map(({ label, name, type, value }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor={name}>
                {label}
              </label>
              <input
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
                id={name}
                placeholder={`Ingresa tu ${label.toLowerCase()}`}
                type={type}
                value={value}
                onChange={handleChange}
                name={name}
              />
            </div>
          ))}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="gender">
              Género
            </label>
            <select
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              id="gender"
              value={gender}
              onChange={handleChange}
              name="gender"
            >
              <option value="">Selecciona género</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="ofertaAcademicaId">
              Tipo de Carrera Deseada
            </label>
            <select
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-[#016654] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              id="ofertaAcademicaId"
              value={ofertaAcademicaId}
              onChange={handleChange}
              name="ofertaAcademicaId"
            >
              <option value="">Selecciona tipo</option>
              {ofertas.map(oferta => (
                <option key={oferta.idOfertaAcademica} value={oferta.idOfertaAcademica}>
                  {oferta.tipoOferta}
                </option>
              ))}
            </select>
          </div>
          <Button
            className="col-span-2 px-4 py-2 mt-6 font-medium text-white bg-[#016654] rounded hover:bg-[#01AA8D] focus:outline-none focus:ring focus:ring-[#016654]"
            type="submit"
            disabled={!name || !email || !birthday || !gender || !ofertaAcademicaId}
          >
            Obtener resultados
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserDataComponent;
