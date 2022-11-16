import { Delete } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import { useLoader } from "../../components/loading/LoadingProvider"
import { useAlertMessage } from "../../components/alert/AlertMessageProvider"
import usersServices from "../../providers/http-service/usersServices"

function UsersTable({ users, setUsers }) {

    const [open, setOpen] = useState(false)

    const [ user, setUser ] = useState({})

    const { startLoader, stopLoader } = useLoader()
    const { showAlert } = useAlertMessage()

    const handleClose = () => {
        setOpen(false);
        setUser({})
    }

    function openDialog(user) {
        setUser(user)
        setOpen(true)
    }

    function deleteUser() {
        startLoader()
        handleClose()

        usersServices.deletar(user.id)
            .then(res => {
                if(res.status === 200) {
                    stopLoader()
                    showAlert('', 'Usuário deletado com sucesso!', 'success', 4000)

                    const auxUsers = users.filter(e => {
                        return e !== user
                    })

                    setUsers(auxUsers)
                } 

                stopLoader()

            })
            .catch(err => {
                stopLoader()
                showAlert('', 'Erro ao deletar usuário!', 'error', 4000)
            })
        console.log(user)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Login</TableCell>
                            <TableCell align="center">Senha</TableCell>
                            <TableCell align="center">Dt. Nascimento</TableCell>
                            <TableCell align="center">Opções</TableCell>
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
                                <TableCell align="center">
                                    <IconButton onClick={() => openDialog(user)} aria-label="delete" color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Excluir Usuário
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja realmente excluir esse usuário?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Não</Button>
                    <Button onClick={() => deleteUser()} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UsersTable