import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";
function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagen, setImagen] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === "") return;
      const imagenesPorPagina = 30;
      const apiKEy = "22354956-5a9322e8b6ae2603cf05b06f2";
      const url = `https://pixabay.com/api/?key=${apiKEy}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`; //per_page parametro para pagina, mirar documentacion api

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagen(resultado.hits);
      //calcular el total de paginas (paginacion)
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setTotalpaginas(calcularTotalPaginas);

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarApi();
  }, [busqueda, paginaactual]);
  //definir pagina anteriores
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    setPaginaactual(nuevaPaginaActual);
  };
  //definir pagina siguientes
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;

    setPaginaactual(nuevaPaginaActual);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagen} />

        {paginaactual === 1 ? null : (
          <button className="btn btn-info mr-1" onClick={paginaAnterior}>
            {" "}
            {`<`} Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button className="btn btn-info" onClick={paginaSiguiente}>
            {" "}
            Siguiente {`>`}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
