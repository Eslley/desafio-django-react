import { AddCircle, Key, Person } from "@mui/icons-material"
import { Button, Divider, Grid, InputAdornment, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useLoader } from "../../components/loading/LoadingProvider"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import usersServices from "../../providers/http-service/usersServices"
import { useNavigate } from "react-router-dom"

function FormSignIn() {

    const { register, formState: { errors }, handleSubmit, resetField } = useForm({ mode: 'onChange' })

    const { startLoader, stopLoader } = useLoader()
    const { showAlert } = useAlertMessage()

    const navigate = useNavigate()

    function submit(data) {
        startLoader()

        usersServices.login(data)
            .then(res => {
                if(res.status === 200) {
                    showAlert('', 'Login realizado com sucesso!', 'success', 4000)
                    navigate('users')
                }

                stopLoader()
            })
            .catch(err => {
                stopLoader()
                if(err.response.status === 401) {
                    showAlert('', 'Login e/ou senha incorretos!', 'error', 4000)
                    resetField('senha')
                }
            })
    }

    function notWorking() {
        showAlert('', 'Esta funcionalidade não foi implementada ainda!', 'warning', 4000)
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
                        label="Senha"
                        type="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        {...register("senha", { required: true })}
                        helperText={errors.senha ? "A senha é obrigatória" : ""}
                        error={!!errors.senha}
                    />
                </Grid>

                <Grid container item justifyContent="center" mt="0.6em" mb="2em">
                    <Button sx={{ width: "95%", textTransform: "none" }} type="submit" variant="contained">Entrar</Button>
                </Grid>

                <Divider />

                <Grid mt="1.5em" container item justifyContent="space-around">
                    <Grid item>
                        <Button onClick={notWorking} sx={{ textTransform: "none" }} variant="text">Esqueceu a senha</Button>
                    </Grid>

                    <Grid item>
                        <Button onClick={() => navigate('sign-up')} sx={{ textTransform: "none" }} variant="text">Cadastrar Usuário</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default FormSignIn