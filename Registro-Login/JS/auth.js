import { APIKEY, BASE_URL } from "./config.js"

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputName = document.getElementById("name");

// Btn de login
const btnLogin = document.getElementById("login");
if(btnLogin) {
    btnLogin.addEventListener("click", login)
}

// Btn registro
const btnRegister = document.getElementById("register");  
if(btnRegister) {
    btnRegister.addEventListener("click", register)
}


async function login() {

    const requestOptions = {
        method: "POST",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": inputEmail.value,
            "password": inputPassword.value
        }),
    };

    const response = await fetch(`${BASE_URL}/auth/v1/token?grant_type=password`, requestOptions) 
    if(!response.ok) {
        alert("Error al iniciar sesión")
    }

    const result = await response.json()
 
    localStorage.setItem("token", result.access_token)
    localStorage.setItem("userId", result.user.id)

    window.location.href = "./dashboard.html"
}

async function register() {

    const requestOptions = {
        method: "POST",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": inputName.value,
            "email": inputEmail.value,
            "password": inputPassword.value
        }),
    };

    const response = await fetch(`${BASE_URL}/auth/v1/signup`, requestOptions) 
    if(!response.ok) {
        alert("Error en el registro")
    }

    const result = await response.json()
 
    localStorage.setItem("token", result.access_token)
    localStorage.setItem("userId", result.user.id)

    window.location.href = "./dashboard.html"

    configurarBlog(result.user.id)
}

export async function isUserLogged(access_token, userId) {

    const requestOptions = {
        method: "GET",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    };

    const response = await fetch(`${BASE_URL}/auth/v1/user`, requestOptions) 
    if(!response.ok) {
        alert("Error al loggear")
        return false
    }

    const result = await response.json()

    if(result.id == userId) {
        return true
    }
 
    return false
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")

    window.location.href = "../bienvenida.html"
}

export function getToken() {
    return localStorage.getItem("token")
}

export function getUserId() {
    return localStorage.getItem("userId")
}

const btnLogout = document.getElementById("logout");
if (btnLogout) {
  btnLogout.addEventListener("click", logout);
}


export async function getUserRole() {

    const access_token = getToken()
    const userId = getUserId()

    if(!access_token || !userId ) {
        return null
    }

    const requestOptions = {
        method: "GET",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    };

    const response = await fetch(`${BASE_URL}/rest/v1/roles?user_id=eq.${userId}`, requestOptions) 
    if(!response.ok) {
        return null
    }

    const result = await response.json()
    if(result[0].role) {
        return result[0].role
    }
 
    return null
}