import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {

  return (
    <section className="w-full pb-8 md:pb-12 lg:pb-24 xl:pb-28">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <img
          alt="Hero"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="550"
          src="/siglo21.jpeg"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Test Vocacional 21
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              ¡Bienvenido a Test Vocacional 21! ¿Necesitas ayuda para encontrar tu camino profesional?
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 min-[400px]:flex-row">
            <Link
              to="/formulario"
              className="w-full rounded max-w-xs bg-[#016654] hover:bg-[#01AA8D] text-white"
            >
              <Button>Comenzar</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;

