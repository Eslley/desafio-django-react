import { Block, Download, Groups, Search } from "@mui/icons-material"
import { Fab, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import PageTitle from "../../components/layout/PageTitle"
import { useLoader } from "../../components/loading/LoadingProvider"
import usersServices from "../../providers/http-service/usersServices"
import UsersTable from "./UsersTable"

function Users() {

  const [users, setUsers] = useState([])

  const { startLoader, stopLoader } = useLoader()
  const { showAlert } = useAlertMessage()

  const navigate = useNavigate()

  useEffect(() => {
    startLoader()

    usersServices.listar()
      .then(res => {

        if (res.status === 200) {
          res.data.map(user => {
            user.dt_nascimento = user.dt_nascimento.split('-').reverse().join('/');
          })

          setUsers(res.data)
        }

        stopLoader()
      })
      .catch(err => {
        console.log(err)
        stopLoader()
        showAlert('', 'Erro ao consultar usuários!', 'error', 4000)
      })
  }, [])

  return (
    <>
      <PageTitle handleBack={() => navigate('/')} title="Usuários" icon={<Groups />} />

      {users.length > 0 ? (
        <>
          <UsersTable users={users} />

          <Grid container justifyContent="center">
            <Grid item container justifyContent="center" xs={5} sm={3} md={2}>
              <Box sx={{ mt: '2em' }}>
                <Fab href="https://desafio-tech.herokuapp.com/usuarios/?format=json" download="users_json.json" color="primary" variant="extended" aria-label="add">
                  <Search />
                  JSON
                </Fab>
              </Box>
            </Grid>

            <Grid item container justifyContent="center" xs={5} sm={3} md={2}>
              <Box sx={{ mt: '2em' }}>
                <Fab href="https://desafio-tech.herokuapp.com/usuarios/?format=csv" download="users_csv.csv" color="primary" variant="extended" aria-label="add">
                  <Download />
                  CSV
                </Fab>
              </Box>
            </Grid>

            <Grid item container justifyContent="center" xs={12}>
              <Box sx={{ mt: '1em' }}>
                <Fab href="https://desafio-tech.herokuapp.com/usuarios/?format=xlsx" download="users_xlsx.xlsx" color="primary" variant="extended" aria-label="add">
                  <Download />
                  XLSX
                </Fab>
              </Box>
            </Grid>
          </Grid>
        </>
      ) :
        <Box sx={{ fontSize: '20px' }} textAlign="center" color="white">
          <Block sx={{ fontSize: '90px' }} />
          <p>Não há usuários cadastrados!</p>
        </Box>
      }
    </>
  )
}

export default Users