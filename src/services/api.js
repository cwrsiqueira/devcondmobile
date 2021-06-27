import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fulUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch (method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fulUrl += `?${queryString}`;
            break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
            break;
        default:
            break;
    }

    let headers = {'content-type': 'application/json'};
    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fulUrl, { method, headers, body });
    let json = await req.json();
    return json;
}

export default {
    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/validate', {}, token);
        return json;
    },
    login: async (cpf, password) => {
        let json = await request('post', '/auth/login', {cpf, password});
        return json;
    },
    logout: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/logout', {}, token);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('property');
        return json;
    },
    register: async (name, cpf, email, password, password_confirm) => {
        let json = await request('post', '/auth/register', {name, cpf, email, password, password_confirm});
        return json;
    }
}