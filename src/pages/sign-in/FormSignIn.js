import { Key, Person } from "@mui/icons-material"
import { Button, Grid, InputAdornment, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useLoader } from "../../components/loading/LoadingProvider"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import usersServices from "../../providers/http-service/usersServices"
import { useNavigate } from "react-router-dom"

function FormSignIn() {

    const { register, formState: { errors, isValid }, handleSubmit, resetField } = useForm({ mode: 'onChange' })

    const { startLoader, stopLoader } = useLoader()
    const { showAlert } = useAlertMessage()

    const navigate = useNavigate()

    function submit(data) {
        startLoader()

        usersServices.login(data)
            .then(res => {
                if(res.status === 200) {
                    showAlert('', 'Login realizado com sucesso!', 'success', 4000)
                    navigate('/users')
                } else if(res.status === 401) {
                    showAlert('', 'Verifique login e/ou senha!', 'error', 4000)
                    resetField('senha')
                }

                stopLoader()
            })
            .catch(err => {
                console.log(err)
                stopLoader()
                resetField('senha')
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

                <Grid container item justifyContent="center" mt="0.6em">
                    <Button type="submit" disabled={!isValid} variant="contained">Entrar</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default FormSignIn