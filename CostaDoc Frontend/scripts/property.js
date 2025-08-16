const API_URL = 'http://localhost:8081/api/v1';

const nomeInput = document.getElementById('name');
const cepInput = document.getElementById('cep');
const localInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const municipioInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const numeroInput = document.getElementById('number');
const semNumeroCheckbox = document.getElementById('semNumero');
const objetoInput = document.getElementById('objeto');
const frenteInput = document.getElementById('frente');
const medNorte = document.getElementById('norte');
const confinanteNorte = document.getElementById('conf_norte');
const medSul = document.getElementById('sul');
const confinanteSul = document.getElementById('conf_sul');
const medLeste = document.getElementById('leste');
const confinanteLeste = document.getElementById('conf_leste');
const medOeste = document.getElementById('oeste');
const confinanteOeste = document.getElementById('conf_oeste');
const localizacaoInput = document.getElementById('local');
const valorInput = document.getElementById('valor');
const form = document.querySelector('form');
const input = document.querySelectorAll('input');

nomeInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

localInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

bairroInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

municipioInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

ufInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
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
      cep: cepInput.value.trim(),
      logradouro: localInput.value.trim(),
      numero: numeroInput.value.trim(),
      bairro: bairroInput.value.trim(),
      municipio: municipioInput.value.trim(),
      uf: ufInput.value.trim(),
      objeto: objetoInput.value.trim() || "Não informado",
      frente: frenteInput.value.trim() || "Não informado",
      medNorte: medNorte.value.trim() || "Não informado",
      confinanteNorte: confinanteNorte.value.trim() || "Não informado",
      medSul: medSul.value.trim() || "Não informado",
      confinanteSul: confinanteSul.value.trim() || "Não informado",
      medLeste: medLeste.value.trim() || "Não informado",
      confinanteLeste: confinanteLeste.value.trim() || "Não informado",
      medOeste: medOeste.value.trim() || "Não informado",
      confinanteOeste: confinanteOeste.value.trim() || "Não informado",
      localizacao: localizacaoInput.value.trim() || "Não informado",
      valorImovel: valorInput.value.trim() || "Não informado"
    };

    const response = await axios.post(`${API_URL}/registerProperty`, data);

    if (response.status == 201) {
      alert("Imóvel cadastrado com sucesso!")
    }

    input.forEach(e => {
      e.value = '';
    });

    semNumeroCheckbox.checked = false;
  } catch(error) {
    alert("Erro ao cadastrar imóvel")
    console.log("Erro ao cadastrar imóvel. Erro: ", error);
  }
});