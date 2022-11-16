import { People } from "@mui/icons-material"
import { Grid } from "@mui/material"
import CardForm from "../../components/layout/Card"
import PageTitle from "../../components/layout/PageTitle"
import FormSignUp from "./FormSignUp"

function SignUp() {
  return (
    <>
      <PageTitle icon={<People />} title="Cadastrar Usuário" />

      <Grid container justifyContent="center">

        <Grid item xs={12} sm={8} md={6} lg={4}>
          <CardForm title="Novo Usuário" content={<FormSignUp />} />
        </Grid>

      </Grid>
    </>
  )
}

export default SignUp