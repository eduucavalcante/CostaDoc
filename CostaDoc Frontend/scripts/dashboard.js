const API_URL = 'http://localhost:8081/api/v1';

const defaultContainer = document.querySelector('.default');
const dataContainer = document.querySelector('#listagem-dados');
const contractContainer = document.querySelector('#contratos');
const clienteTab = document.querySelector('#clientesBtn');
const imoveisTab = document.querySelector('#imoveisBtn');
const contratosTab = document.querySelector('#contratoBtn');
const dataTable = document.querySelector('.dataTable');
const selectFiltro = document.querySelector('#filter');
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
const clearInput = document.querySelector('.clearInput');
const customerView = document.querySelector('.customerView');
const propertyView = document.querySelector('.propertyView');
const customerForm = document.querySelector('.customerForm');
const propertyForm = document.querySelector('.propertyForm');
const contractForm = document.querySelector('.contractForm');
const contractInput = document.querySelectorAll('.contractInput');
const selectTipo = document.querySelector("#tipo");
let tab = '';

const authToken = localStorage.getItem('token');
if(!authToken) {
    alert("Você precisa estar logado para acessar essa página.")
    window.location.href = '/index.html';
}else{
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

async function getCustomers() {
    clearTable(dataTable);
    document.querySelector('.cpf-header').classList.remove('hidden');
    tab = 'clientes';

    let busca = searchInput.value.trim().toUpperCase();

    let cpfApenasNumeros = busca.replace(/\D/g, '');

    if (cpfApenasNumeros.length === 11) {
        if (cpfApenasNumeros.length > 3) {
            cpfApenasNumeros = cpfApenasNumeros.slice(0, 3) + '.' + cpfApenasNumeros.slice(3);
        }
        if (cpfApenasNumeros.length > 7) {
            cpfApenasNumeros = cpfApenasNumeros.slice(0, 7) + '.' + cpfApenasNumeros.slice(7);
        }
        if (cpfApenasNumeros.length > 11) {
            cpfApenasNumeros = cpfApenasNumeros.slice(0, 11) + '-' + cpfApenasNumeros.slice(11, 13);
        }

        busca = cpfApenasNumeros;
    }

    try {
        let clientes;
        let response;

        const filterData = {
            filtro: selectFiltro.value.trim(),
            busca: busca
        }

        if (busca !== '') {
            response = await axios.get(`${API_URL}/customerSearch`, {
                params: filterData
            });
            clientes = response.data.clientes;
        } else {
            response = await axios.get(`${API_URL}/customers`, {
                params: filterData
            });
            clientes = response.data.clientes;
        }

        if (response.data.empty && busca === '') {
            dataContainer.innerHTML = "<p>Ainda não há clientes cadastrados.</p>"
            return;
        }

        if (response.data.empty === 0 && busca !== '') {
            alert("Não foram encontrados clientes com essa busca.");
            return;
        }

        clientes.forEach(cliente => {
            const clienteElement = document.createElement('tr');
            clienteElement.classList.add('clienteItem');
            clienteElement.innerHTML = `
                <td>${cliente.nomeCliente}</td>
                <td class="cpf-cell" style="text-align: center;">${cliente.cpf}</td>
                <td class="actions" style="text-align: center;">
                    <button class="actionButton" id="view" onclick="viewCustomer(${cliente.id})" title="Visualizar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>
                    </button>
                    <button class="actionButton" id="edit" onclick="editCustomer(${cliente.id})" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                    <button class="actionButton" id="delete" onclick="deleteCustomer(${cliente.id})" title="Remover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button>
                </td>
            `;
            dataTable.appendChild(clienteElement);
        });
    } catch(error) {
        dataContainer.innerHTML = "<p>Erro ao carregar clientes</p>";
        console.log("Erro ao carregar clientes: ", error);
    }
}

selectFiltro.addEventListener('change', () => {
    if(tab === 'clientes') getCustomers();
    if(tab === 'imoveis') getProperties();
;})

async function getProperties() {
    clearTable(dataTable);
    document.querySelector('.cpf-header').classList.add('hidden');
    tab = 'imoveis';

    let busca = searchInput.value.trim().toUpperCase();

    try {
        let imoveis;
        let response;

        const filterData = {
            filtro: selectFiltro.value.trim(),
            busca: busca
        }

        if (busca !== '') {
            response = await axios.get(`${API_URL}/propertySearch`, {
                params: filterData
            });
            imoveis = response.data.imoveis;
        } else {
            response = await axios.get(`${API_URL}/properties`, {
                params: filterData
            });
            imoveis = response.data.imoveis;
        }

        if (imoveis.length === 0) {
            dataContainer.innerHTML = "<p>Ainda não há imóveis cadastrados.</p>"
            return;
        }

        imoveis.forEach(imovel => {
            const imovelElement = document.createElement('tr');
            imovelElement.classList.add('imovelItem');
            imovelElement.innerHTML = `
                <td>${imovel.nomeProp}</td>
                <td class="cpf-cell hidden"></td>
                <td class="actions" style="text-align: center;">
                    <button class="actionButton" id="view" onclick="viewProperty(${imovel.id})" title="Visualizar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>
                    </button>
                    <button class="actionButton" id="edit" onclick="editProperty(${imovel.id})" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                    <button class="actionButton" id="delete" onclick="deleteProperty(${imovel.id})" title="Remover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button>
                </td>
            `;
            dataTable.appendChild(imovelElement);
        });
    } catch(error) {
        dataContainer.innerHTML = "<p>Erro ao carregar imóveis</p>";
        console.log("Erro ao carregar imóveis: ", error);
    }
}

async function viewCustomer(id) {
    customerView.showModal();

    document.querySelector("#estadoCivil").disabled = true;

    document.querySelectorAll('.customerInput').forEach(input => {
        input.setAttribute("disabled", true);
        input.classList.add("readonly");
        input.style.width = "90%";
    });

    document.querySelector("#saveBtn").style.display = "none";
    
    try {
        const response = await axios.get(`${API_URL}/customer`, {
            params: {
                id: id
            }
        });

        const cliente = response.data.cliente;

        document.querySelectorAll('.customerInput').forEach(input => {
            const key = input.name;
            if (cliente[key] !== undefined) input.value = cliente[key];
        });
    } catch(error) {
        alert("Erro ao carregar informações do cliente.")
        console.log("Erro ao carregar informações do cliente.")
        console.error("Erro: ", error);
        customerView.close();
    }
}

async function editCustomer(id) {
    viewCustomer(id);

    customerForm.setAttribute("data-id", id);

    document.querySelector("#estadoCivil").disabled = false;

    document.querySelectorAll('.customerInput').forEach(input => {
        input.removeAttribute("disabled");
        input.classList.remove("readonly");
    });

    document.querySelector("#saveBtn").style.display = "block";
}

async function deleteCustomer(id) {
    try {
        await axios.delete(`${API_URL}/customer/${id}`);

        alert("Cliente removido com sucesso!");
        getCustomers();
    } catch(error) {
        alert("Erro ao remover cliente.");
        console.log("Erro ao remover cliente: ", error);
    }
}

async function viewProperty(id) {
    propertyView.showModal();

    document.querySelectorAll('.propertyInput').forEach(input => {
        input.setAttribute("disabled", true);
        input.classList.add("readonly");
        input.style.width = "90%";
    });

    document.querySelector("#saveBtn2").style.display = "none";
    
    try {
        const response = await axios.get(`${API_URL}/property`, {
            params: {
                id: id
            }
        });

        const imovel = response.data.imovel;

        document.querySelectorAll('.propertyInput').forEach(input => {
            const key = input.name;
            if (imovel[key] !== undefined) input.value = imovel[key];
        });
    } catch(error) {
        alert("Erro ao carregar informações do imóvel.")
        console.log("Erro ao carregar informações do imóvel.")
        console.error("Erro: ", error);
        propertyView.close();
    }
}

async function editProperty(id) {
    viewProperty(id);

    propertyForm.setAttribute("data-id", id);

    document.querySelectorAll('.propertyInput').forEach(input => {
        input.removeAttribute("disabled");
        input.classList.remove("readonly");
    });

    document.querySelector("#saveBtn2").style.display = "block";
}

async function deleteProperty(id) {
    try {
        await axios.delete(`${API_URL}/property/${id}`);

        alert("Imóvel removido com sucesso!");
        getProperties();
    } catch(error) {
        alert("Erro ao remover imóvel.");
        console.log("Erro ao remover imóvel: ", error);
    }
}

async function logout() {
    localStorage.removeItem("token");
    window.location.replace('/');
}

function customerTab() {
    defaultContainer.style.display = 'none';
    contractContainer.style.display = 'none';
    dataContainer.style.display = 'block';
    searchInput.setAttribute("placeholder", "Pesquisar por nome ou CPF");

    getCustomers();
    clienteTab.style.background = "#d2d2d2";
    imoveisTab.style.background = "transparent";
    contratosTab.style.background = "transparent";
}

function propertyTab() {
    defaultContainer.style.display = 'none';
    contractContainer.style.display = 'none';
    dataContainer.style.display = 'block';
    searchInput.setAttribute("placeholder", "Pesquisar por nome do proprietário");

    getProperties();
    clienteTab.style.background = "transparent";
    imoveisTab.style.background = "#d2d2d2";
    contratosTab.style.background = "transparent";
}

function contractTab() {
    defaultContainer.style.display = 'none';
    contractContainer.style.display = 'block';
    dataContainer.style.display = 'none';

    clienteTab.style.background = "transparent";
    imoveisTab.style.background = "transparent";
    contratosTab.style.background = "#d2d2d2";
}

selectTipo.addEventListener("change", () => {
    if (selectTipo.value == "locacao") {
        document.querySelector(".aluguelInfo").style.display = "flex";
        document.querySelectorAll(".aluguelInfo input").forEach(input => {
            input.setAttribute("required", true);
            input.removeAttribute("disabled");
        });
    } else {
        document.querySelector(".aluguelInfo").style.display = "none";
        document.querySelectorAll(".aluguelInfo input").forEach(input => {
            input.removeAttribute("required");
            input.setAttribute("disabled", true);
        });
    }
});

function clearTable(table) {
    const rows = table.getElementsByTagName("tr");

    for (let i = rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

customerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = customerForm.getAttribute("data-id");

    const customerData = {};

    document.querySelectorAll('.customerInput').forEach(input => {
        customerData[input.name] = input.value;
    });

    try {
        const response = await axios.put(`${API_URL}/customer/${id}`, customerData);
        alert("Cliente atualizado com sucesso!");
        customerView.close();
        getCustomers();
    } catch (error) {
        console.error("Erro ao atualizar cliente: ", error);
        alert("Erro ao atualizar cliente.");
    }
});

propertyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = propertyForm.getAttribute("data-id");

    const propertyData = {};

    document.querySelectorAll('.propertyInput').forEach(input => {
        propertyData[input.name] = input.value;
    });

    try {
        const response = await axios.put(`${API_URL}/property/${id}`, propertyData);
        alert("Imóvel atualizado com sucesso!");
        propertyView.close();
        getProperties();
    } catch (error) {
        console.error("Erro ao atualizar imóvel: ", error);
        alert("Erro ao atualizar imóvel.");
    }
});

contractForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

searchBtn.addEventListener("click", () => {
    if (tab === "clientes") getCustomers();
    if (tab === "imoveis") getProperties();
});

clearInput.addEventListener("click", () => {
    searchInput.value = '';
});

document.querySelector("#closeBtn").addEventListener("click", (event) => {
    event.preventDefault();
    customerView.close();
});

document.querySelector("#closeBtn2").addEventListener("click", (event) => {
    event.preventDefault();
    propertyView.close();
});

let dadosSelecionados = {
    cliente1: {},
    cliente2: {},
    imovel: {}
};

contractInput.forEach(input => {
    input.addEventListener("input", async () => {
        const name = input.name;
        const rota = name === "imovel" ? "propertySearch" : "customerSearch";
        const resultId = name === "imovel" ? "#resultadosImovel" : `#resultados${name.replace("nome", "")}`;
        
        const busca = input.value;

        if (busca.length <= 2) {
            document.querySelector(resultId).innerHTML = "";
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/${rota}`, {
                params: {
                    busca: busca
                }
            });

            const itens = name === "imovel" ? response.data.imoveis : response.data.clientes;

            document.querySelector(resultId).innerHTML = "";

            itens.forEach(item => {
                const div = document.createElement("div");
                div.textContent = name === "imovel" ? item.nomeProp : `${item.nomeCliente} (${item.cpf})`;
                div.classList.add("autocomplete-item")
                div.addEventListener("click", () => {
                    input.value = div.textContent;
                    if(name === "nomeCliente1") dadosSelecionados.cliente1 = item;
                    if(name === "nomeCliente2") dadosSelecionados.cliente2 = item;
                    if(name === "imovel") dadosSelecionados.imovel = item;
                    document.querySelector(resultId).innerHTML = "";
                });
                document.querySelector(resultId).appendChild(div);
            });
        } catch(error) {
            console.log("Erro ao buscar informação: ", error);
            alert("Erro ao buscar informação.");
        }
    });
});

contractForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const cliente1 = dadosSelecionados.cliente1;
        const cliente2 = dadosSelecionados.cliente2;
        const imovel = dadosSelecionados.imovel;
        let tipo = "compra"

        imovel.dataContrato = document.querySelector('#dataContrato').value.trim();

        if(selectTipo.value === "locacao") {
            tipo = "locacao";
            imovel.prazo = document.querySelector("#prazo").value.trim();
            imovel.dataInicio = document.querySelector("#dataInicio").value.trim();
            imovel.diaPagamento = document.querySelector("#diaPagamento").value.trim();
            imovel.valorAluguel = document.querySelector("#valorAluguel").value.trim();
        }

        console.log({
            cliente1,
            cliente2,
            imovel
        });
        const res = await axios.post(`${API_URL}/generateContract`, { cliente1, cliente2, imovel, tipo });

        const fileName = res.data.file;
        window.open(`${API_URL}/download/${fileName}`, '_blank');
        contractForm.reset();
    } catch (err) {
        console.error("Erro ao gerar documento:", err);
        alert("Erro ao gerar documento");
    }
});
