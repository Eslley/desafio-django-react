import { Login } from "@mui/icons-material"
import { Grid} from "@mui/material"
import CardForm from "../../components/layout/Card"
import PageTitle from "../../components/layout/PageTitle"
import FormSignIn from "./FormSignIn"

function SignIn() {
    return (
        <>
            <PageTitle icon={<Login />} title="Login" />

            <Grid container justifyContent="center">

                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <CardForm title="Entrar no Sistema" content={<FormSignIn />} />
                </Grid>

            </Grid>
        </>
    )
}

export default SignIn