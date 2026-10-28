const API = "https://rickandmortyapi.com/api";
const filtros = { pagina: 1, nombre: "", estado: "" };
let totalPaginas = 42;

function construirURL() {
  const params = new URLSearchParams({ page: filtros.pagina });
  if (filtros.nombre) params.set("name", filtros.nombre);
  if (filtros.estado) params.set("status", filtros.estado);

  return `${API}/character?${params}`;
}

async function obtenerPersonajes() {
  const url = construirURL();
  console.log(url);

  const res = await fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => datos.results);

  return res;
}

async function actualizar() {
  const numPagina = document.getElementById("pagina");
  numPagina.textContent = filtros.pagina + " / " + totalPaginas;

  const anteriorBtn = (document.getElementById("anterior").disabled =
    filtros.pagina <= 1);
  const siguienteBtn = (document.getElementById("siguiente").disabled =
    filtros.pagina >= totalPaginas);

  render(await obtenerPersonajes());
}

function asignarListeners() {
  const numPagina = document.getElementById("pagina");
  document.getElementById("anterior").addEventListener("click", () => {
    filtros.pagina--;
    actualizar();
    console.log("Click anterior");
  });

  document.getElementById("siguiente").addEventListener("click", () => {
    filtros.pagina++;
    actualizar();
    console.log("Click siguiente");
  });

  document.getElementById("estadoFiltro").addEventListener("change", (e) => {
    filtros.estado = e.target.value;
    filtros.pagina = 1;
    actualizar();
    console.log("Click filtro");
  });

  document.getElementById("buscador").addEventListener("input", (e) => {
    filtros.nombre = e.target.value.trim();
    filtros.pagina = 1;
    actualizar();
    console.log("Buscador");
  });
}

async function obtenerPersonaje(id) {
  const res = await fetch(`${API}/character/${id}`)
    .then((respuesta) => respuesta.json())
    .then((datos) => datos);

  return res;
}

function crearTarjeta({ name, image, status, species, location }) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", image);
  img.setAttribute("alt", name);

  const p = document.createElement("p");
  p.textContent = `${name} · ${status} · ${species} · ${location.name}`;
  div.append(img, p);

  return div;
}

function render(personajes) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  personajes.forEach((p) => grid.append(crearTarjeta(p)));
}

render(await obtenerPersonajes());
actualizar();
asignarListeners();

/* async function obtenerJSON(url) {
  const res = await fetch(url)
    .then((resultado) => {
      if (!resultado.ok) {
        throw new E();
      } else {
        return resultado.json();
      }
    })
    .then((datos) => datos);

  return res;
} */
