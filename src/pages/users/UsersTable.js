import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

function UsersTable({ users }) {
    return (
        <TableContainer component={Paper}>
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
        </TableContainer>
    )
}

export default UsersTable