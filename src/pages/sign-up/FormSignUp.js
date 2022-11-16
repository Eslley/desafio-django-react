import { CalendarMonth, Key, Person } from "@mui/icons-material"
import { Button, Grid, InputAdornment, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import { useLoader } from "../../components/loading/LoadingProvider"
import usersServices from "../../providers/http-service/usersServices"

function FormSignUp() {

    const { register, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' })

    const { startLoader, stopLoader } = useLoader()
    const { showAlert } = useAlertMessage()

    const navigate = useNavigate()

    function submit(data) {
        startLoader()

        usersServices.salvar(data)
            .then(res => {
                if(res.status === 201) {
                    navigate('/')

                    if(res.data.senha !== data.senha){
                        showAlert('', `Sua senha é: ${res.data.senha}`, 'success', 7000)
                        console.log(res.data.senha)
                    } else    
                        showAlert('', 'Usuário cadastrado com sucesso!', 'success', 4000)
                }

                stopLoader()
            })
            .catch(err => {
                if('login' in err.response.data)
                    showAlert('', 'Erro ao cadastrar login!', 'error', 4000)
                console.log(err)
                stopLoader()
            })
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Grid container direction="column" textAlign="center">
                <Grid item>
                    <TextField
                        margin='normal'
                        sx={{ width: "95%" }}
                        label="Login"
                        type="text"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    {...register("login", { required: true })}
                    helperText={errors.login ? "O login é obrigatório" : ""}
                    error={!!errors.login}
                    />
                </Grid>

                <Grid item>
                <TextField
                        margin='normal'
                        sx={{ width: "95%" }}
                        label="Data Nascimento"
                        type="date"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarMonth color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    {...register("dt_nascimento", { required: true })}
                    helperText={errors.dt_nascimento ? "A data de nascimento é obrigatória" : ""}
                    error={!!errors.dt_nascimento}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        margin='normal'
                        sx={{ width: "95%" }}
                        label="Senha"
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    {...register("senha")}
                    />
                </Grid>

                <Grid container item justifyContent="center" mt="0.6em">
                    <Button sx={{ width: "95%", textTransform: "none" }} type="submit" variant="contained">Cadastrar</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default FormSignUp