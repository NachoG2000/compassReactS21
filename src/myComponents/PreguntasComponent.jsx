import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "@/components/ui/button";

const PreguntasComponent = ({ universityId, setSurveyData, nextSection }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/preguntas/${universityId}`);
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error fetching preguntas:', error);
      }
    };
    fetchPreguntas();
  }, [universityId]);

  const handleRespuestaChange = (id_pregunta, valor) => {
    setRespuestas(prevRespuestas => ({
      ...prevRespuestas,
      [id_pregunta]: valor
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSurveyData(respuestas);
    nextSection();
  };

  const allPreguntasAnswered = preguntas.length > 0 && Object.keys(respuestas).length === preguntas.length;

  return (
    <section className="w-full md:max-w-2xl lg:max-w-4xl mx-auto mb-20">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Descubre Tu Vocación Ideal</h2>
        <p className="text-gray-500 text-center">
          Responde según lo que más disfrutas y lo que menos te gusta hacer. No hay respuestas correctas o incorrectas, tus respuestas nos ayudarán a reflejar tu perfil en los resultados!
        </p>
        <div className="space-y-8">
          {preguntas.length > 0 ? (
            preguntas.map((pregunta) => (
              <div key={pregunta.id_pregunta} className="rounded-xl border border-gray-200 bg-white p-6 ">
                <h2 className="text-lg font-semibold">{pregunta.texto_pregunta}</h2>
                <div className="flex md:justify-between flex-wrap mt-4 gap-4">
                  {[1, 2, 3, 4, 5].map((valor) => (
                    <Button
                      key={valor}
                      className={respuestas[pregunta.id_pregunta] === valor ? 
                        'bg-[#016654]/10 rounded border-2 border-[#016654] text-[#016654] hover:bg-[#016654]/10 hover:border-2 hover:border-[#016654]' : 
                        'rounded border-2 border-[#016654] text-[#016654] hover:text-[#016654] hover:bg-[#016654]/10'}
                      onClick={() => handleRespuestaChange(pregunta.id_pregunta, valor)}
                    >
                      {valor === 1 ? 'Totalmente en desacuerdo' : 
                       valor === 2 ? 'En desacuerdo' : 
                       valor === 3 ? 'Neutral' : 
                       valor === 4 ? 'De acuerdo' : 
                       'Totalmente de acuerdo'}
                    </Button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <h1>Cargando preguntas...</h1>
          )}
          <div className="flex justify-center">
            <Button 
              className="w-full rounded max-w-xs bg-[#016654] hover:bg-[#01AA8D] text-white" 
              type="submit" 
              disabled={!allPreguntasAnswered}
              onClick={handleSubmit}
            >
              Obtener resultados
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreguntasComponent;
