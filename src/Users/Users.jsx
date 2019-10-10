import React from 'react'
import axios from 'axios'
import Table from "reactstrap/es/Table";
import Button from "reactstrap/es/Button";

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        //TODO: CHANGE THIS WITH THE HEROKU URL
        axios.get('http://localhost:8080/users')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    render() {
        const {users, errorMsg} = this.state

        return (
            <div>
                <h1>Users</h1>

                <Table>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Ciudad</th>
                        <th>Dirección</th>
                        <th>E-Mail</th>
                        <th>Telefono</th>
                        <th>Credito</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.state}</td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.accountCredit}</td>

                            <td>
                                <Button color='success' size='sm' className='mr-2'>
                                    Editar
                                </Button>
                                <Button color='danger' size='sm'>
                                    Borrar
                                </Button>
                            </td>
                            {errorMsg ? <div>{errorMsg}</div> : null}
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>
        )
    }

}

export default Users