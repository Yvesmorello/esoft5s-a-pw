var link = location.search;

var titulo = new URLSearchParams(link);

var r = titulo.get("evolucao")

document.title="Página do " + r;

fetch("https://pokeapi.co/api/v2/pokemon/squirtle").
    then()
