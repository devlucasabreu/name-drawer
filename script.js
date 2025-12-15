const nameInput = document.getElementById('nameInput');
const btnAdd = document.getElementById('btnAdd');
const btnSortear = document.getElementById('btnSortear');
const btnClear = document.getElementById('btnClear');
const namesList = document.getElementById('namesList');
const result = document.getElementById('result');
const resultName = document.getElementById('resultName');
const error = document.getElementById('error');
const counter = document.getElementById('counter');

let names = [];

function showError(message) {
  error.textContent = message;
  error.classList.add('show');
  setTimeout(() => {
    error.classList.remove('show');
  }, 3000);
}

function updateCounter() {
  counter.textContent = `${names.length} ${names.length === 1 ? 'nome adicionado' : 'nomes adicionados'}`;
  btnSortear.disabled = names.length === 0;
}

function renderNames() {
  if (names.length === 0) {
    namesList.innerHTML = '<p class="empty-state">Nenhum nome adicionado ainda</p>';
  } else {
    namesList.innerHTML = names.map((name, index) => `
                    <div class="name-item">
                        <span class="name-text">${name}</span>
                        <button class="btn-remove" onclick="removeName(${index})">Remover</button>
                    </div>
                `).join('');
  }
  updateCounter();
}

function addName() {
  const name = nameInput.value.trim();

  if (!name) {
    showError('Digite um nome para adicionar');
    return;
  }

  if (names.includes(name)) {
    showError('Este nome já foi adicionado');
    return;
  }

  names.push(name);
  nameInput.value = '';
  renderNames();
  result.classList.remove('show');
}

function removeName(index) {
  names.splice(index, 1);
  renderNames();
}

function sortearNome() {
  if (names.length === 0) return;

  btnSortear.disabled = true;
  btnSortear.textContent = 'Sorteando...';

  let counter = 0;
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    resultName.textContent = names[randomIndex];
    result.classList.add('show');
    counter++;

    if (counter >= 20) {
      clearInterval(interval);
      const finalIndex = Math.floor(Math.random() * names.length);
      resultName.textContent = names[finalIndex];
      btnSortear.disabled = false;
      btnSortear.textContent = 'Sortear Nome';
    }
  }, 100);
}

function clearAll() {
  if (names.length === 0) return;

  if (confirm('Deseja realmente limpar todos os nomes?')) {
    names = [];
    renderNames();
    result.classList.remove('show');
  }
}

btnAdd.addEventListener('click', addName);
btnSortear.addEventListener('click', sortearNome);
btnClear.addEventListener('click', clearAll);

nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addName();
  }
});

renderNames();