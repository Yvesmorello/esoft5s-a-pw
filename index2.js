function formatarData(data) {
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(data);
}

function atualizarContadorDataExibir() {
  let visitorsCounter = 0;
  let lastVisit = "Nunca acessado";

  const savedCount = localStorage.getItem('visitorsCounter');
  
  if (savedCount) {
    const dados = JSON.parse(savedCount);
    visitorsCounter = dados.count;
    lastVisit = dados.lastVisit;
  }

  visitorsCounter++;
  lastVisit = formatarData(new Date());

  const dados = {
    count: visitorsCounter,
    lastVisit: lastVisit,
  };

  localStorage.setItem('visitorsCounter', JSON.stringify(dados));

  document.getElementById('footerCounter').innerHTML = "Esta página foi visitada " + visitorsCounter + " vezes. A última visita foi: " + lastVisit;
}