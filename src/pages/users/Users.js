import { Block, Groups } from "@mui/icons-material"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import PageTitle from "../../components/layout/PageTitle"
import { useLoader } from "../../components/loading/LoadingProvider"
import usersServices from "../../providers/http-service/usersServices"

function Users() {

  const [users, setUsers] = useState([])

  const { startLoader, stopLoader } = useLoader()
  const { showAlert } = useAlertMessage()

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
      <PageTitle title="Usuários" icon={<Groups />} />

      {users.length > 0 ?
        <TableContainer sx={{ overflowX: 'hidden' }} component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Login</TableCell>
                <TableCell align="center">Senha</TableCell>
                <TableCell align="center">Dt. Nascimento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">
                    {user.id}
                  </TableCell>
                  <TableCell align="center">
                    {user.login}
                  </TableCell>
                  <TableCell align="center">
                    {user.senha}
                  </TableCell>
                  <TableCell align="center">
                    {user.dt_nascimento}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> :
        <Box sx={{ fontSize: '20px' }} textAlign="center" color="white">
          <Block sx={{ fontSize: '90px' }} />
          <p>Não há usuários cadastrados!</p>
        </Box>
      }
    </>
  )
}

export default Users