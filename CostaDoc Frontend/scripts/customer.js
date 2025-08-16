const API_URL = 'http://localhost:8081/api/v1';

const input = document.querySelectorAll('input');
const form = document.querySelector('form');
const dataInput = document.getElementById('dataNascimento');
const nomeInput = document.getElementById('name');
const civilInput = document.getElementById('estadoCivil');
const profissaoInput = document.getElementById('profession');
const localInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cpfInput = document.getElementById('cpf');
const cepInput = document.getElementById('cep');
const numeroInput = document.getElementById('number');
const ufInput = document.getElementById('uf');

dataInput.addEventListener('input', function () {
  let value = dataInput.value.replace(/\D/g, '');

  if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  if (value.length > 5) {
    value = value.slice(0, 5) + '/' + value.slice(5, 9);
  }
  dataInput.value = value;
});

nomeInput.addEventListener('input', function () {
  this.value = this.value.toUpperCase();
});

localInput.addEventListener('input', function () {
  this.value = this.value.toUpperCase();
});

bairroInput.addEventListener('input', function () {
  this.value = this.value.toUpperCase();
});

cpfInput.addEventListener('input', function () {
  let value = cpfInput.value.replace(/\D/g, ''); // remove tudo que não for número

  if (value.length > 3) {
    value = value.slice(0, 3) + '.' + value.slice(3);
  }
  if (value.length > 7) {
    value = value.slice(0, 7) + '.' + value.slice(7);
  }
  if (value.length > 11) {
    value = value.slice(0, 11) + '-' + value.slice(11, 13);
  }

  cpfInput.value = value.slice(0, 14); // garante que não passe do tamanho máximo
});

cepInput.addEventListener('input', function () {
  let value = cepInput.value.replace(/\D/g, '');

  if (value.length > 2) {
    value = value.slice(0, 2) + '.' + value.slice(2);
  }
  if (value.length > 6) {
    value = value.slice(0, 6) + '-' + value.slice(6, 9);
  }

  cepInput.value = value.slice(0, 10);
});

const semNumeroCheckbox = document.getElementById('semNumero');

semNumeroCheckbox.addEventListener('change', function () {
  if (this.checked) {
    numeroInput.value = 'S/N';
    numeroInput.style.background = "#c0c0c0";
    numeroInput.disabled = true;
  } else {
    numeroInput.value = '';
    numeroInput.style.background = "#f5f5f5";
    numeroInput.disabled = false;
    numeroInput.focus();
  }
});

cepInput.addEventListener('blur', function () {
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length === 0) return;

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('cidade').value = data.localidade.toUpperCase();
          document.getElementById('uf').value = data.uf;
        } else {
          alert('CEP não encontrado.');
          document.getElementById('cidade').value = '';
          document.getElementById('uf').value = '';
        }
      }).catch(() => {
        alert('Erro ao buscar o CEP.');
      });
  } else {
    alert('CEP inválido.');
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const data = {
      nome: nomeInput.value.trim(),
      cpf: cpfInput.value.trim(),
      dataNasc: dataInput.value.trim(),
      estadoCivil: civilInput.value.trim().toLowerCase(),
      profissao: profissaoInput.value.trim().toLowerCase(),
      cep: cepInput.value.trim(),
      logradouro: localInput.value.trim(),
      numero: numeroInput.value.trim(),
      bairro: bairroInput.value.trim(),
      municipio: document.getElementById('cidade').value.trim(),
      uf: ufInput.value.trim()
    };

    const response = await axios.post(`${API_URL}/registerCustomer`, data);

    if (response.status == 201) {
      alert("Cliente cadastrado com sucesso!")
    }

    input.forEach(e => {
      e.value = '';
    });
  } catch(error) {
    alert("Erro ao cadastrar cliente")
    console.log("Erro ao cadastrar cliente. Erro: ", error);
  }
});