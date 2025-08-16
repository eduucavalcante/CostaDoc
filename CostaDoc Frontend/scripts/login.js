const API_URL = 'http://localhost:8081/api/v1';

const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const dialog = document.querySelector('dialog');

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    dialog.showModal();

    try {
        const data = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        }

        const response = await axios.post(`${API_URL}/login`, data);
        dialog.close()
        localStorage.setItem("token", response.data.token);
        window.location.replace('/dashboard');
    } catch(error) {
        dialog.close();
        alert("Erro ao fazer login")
        console.log("Erro ao fazer login: ", error);
    }
});