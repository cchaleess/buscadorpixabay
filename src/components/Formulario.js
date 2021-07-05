import React, { useState } from "react";
import Error from "./Error";
const Formulario = ({ setBusqueda }) => {
  const [tema, setTema] = useState("");

  const [error, setError] = useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();
    //validar
    if (tema.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    //enviar el tema de busqueda hacia el componente principal
    setBusqueda(tema);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            onChange={(e) => setTema(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="Es un error" /> : null}
    </form>
  );
};

export default Formulario;