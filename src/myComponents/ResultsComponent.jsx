import React from "react";
import { Button } from "@/components/ui/button";

const ResultsComponent = ({ results }) => {
  return (
    <section className="w-full pb-12 md:pb-24 lg:pb-32 text-start">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Carreras que seguro te gustarán
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Explora las carreras que mas se alinean con tus intereses y aptitudes.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {results.map(result => (
            <div key={result.id_carrera} className="rounded-xl border border-gray-200 bg-white p-6 hover:bg-gray-50">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{result.nombre_carrera}</h3>
                <p className="text-gray-500">
                  Duración de la carrera: {result.duracion_carrera}
                </p>
                <a
                  href={result.link_web_carrera}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded max-w-xs bg-[#016654] hover:bg-[#01AA8D] text-white px-4 py-2 text-center inline-block"
                >
                  Aprende más
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsComponent;
