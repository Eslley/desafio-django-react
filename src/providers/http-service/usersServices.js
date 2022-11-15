import { http } from "./http"

export default {

    listar: () => {
        return http.get('usuarios/')
    },

    salvar: (user) => {
        return http.post('usuarios/create/', user)
    }

}