import React from "react";
import NavigationBar from '../component/navigationBar'
import '../styling/history.css'
import Axios from 'axios'
import { Navigate } from 'react-router-dom'
import {
    Accordion,
    Table,
    Image
} from 'react-bootstrap'
import Footer from "../component/footer";
import swal from 'sweetalert'

// const url = 'https://jajan-database.herokuapp.com'
const url = 'https://andres-lapo.onrender.com'


class HistoryAdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: []
        }
    }

    componentDidMount() {
        Axios.get(`${url}/history`)
            .then(res => {
                this.setState({ history: res.data })
            })
    }

    render() {
        let idUserCheck = localStorage.getItem('idUser')
        if(!idUserCheck) {
            return <Navigate to='/login' />
        }
        return (
            <div>
                <NavigationBar />
                <div className='pageCont'>
                    <h1 className='title'>Riwayat Transaksi</h1>
                    <Accordion>
                        {this.state.history.reverse().map((item, index) => {
                            return (
                                <Accordion.Item key={index} eventKey={index}>
                                    <Accordion.Header><strong>{item.username}</strong> - {item.time}</Accordion.Header>
                                    <Accordion.Body>
                                        <Table responsive='sm' striped bordered hover variant="warning">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    {/* <th>Gambar</th> */}
                                                    <th>Produk</th>
                                                    <th>Harga</th>
                                                    <th>Jumlah</th>
                                                    <th>Total Harga</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.products.map((it, id) => {
                                                    return (
                                                        <tr>
                                                            <td>{id + 1}</td>
                                                            {/* <td>
                                                                <Image rounded className='image' src={it.image} />
                                                            </td> */}
                                                            <td>{it.name}</td>
                                                            <td>Rp. {it.price.toLocaleString()}</td>
                                                            <td>{it.qty}</td>
                                                            <td>Rp. {(it.qty * it.price).toLocaleString()}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HistoryAdminPage