import { http } from "./http"

export default {

    listar: () => {
        return http.get('usuarios/')
    },

    salvar: (user) => {
        return http.post('usuarios/create/', user)
    },

    login: (user) => {
        return http.post('usuarios/login/', user)
    },

    deletar: (userId) => {
        return http.delete(`usuarios/delete/${userId}/`)
    },

}