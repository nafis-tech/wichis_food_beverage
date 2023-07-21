import React from 'react'
import {
    InputGroup,
    Form,
    Button,
    Modal,
    

} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { register, resetRegErr } from '../redux/actions'
import swal from 'sweetalert'

class RegisPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            visibility2: false,
            usernameErr: false,
            emailErr: false,
            passErr: false,
            registerErr: [false, '']
        }
    }

    userValid = (e) => {
        // let symb = /[!@#$%^&*]/
        // if (symb.test(e.target.value) || e.target.value.length < 6) return this.setState({ usernameErr: true })
        this.setState({ usernameErr: false })
    }

    emailValid = (e) => {
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(e.target.value)) return this.setState({ emailErr: true })
        this.setState({ emailErr: false })
    }

    passValid = (e) => {
        let number = /[0-9]/
        let symb = /[!@#$%^&*]/
        if (!number.test(e.target.value) || !symb.test(e.target.value) || e.target.value.length < 6) return this.setState({ passErr: true })
        this.setState({ passErr: false })
    }

    onRegister = () => {
        // let username = this.refs.username.value
        // let email = this.refs.email.value
        // let password = this.refs.password.value
        let username = this.refs.username.value
        let email = 'emailgenerate@gmail.com'
        let password = username

        // cek apakah semua input sudah terisi & valid
        // if (!username || !password || !email || this.state.usernameErr || this.state.emailErr || this.state.passErr) return this.setState({ registerErr: [true, 'Pastikan semua data sudah terisi & valid'] })

        // cek apakah confrim password = password
        // if (this.refs.confPassword.value !== password) return this.setState({ registerErr: [true, 'Pastikan Confirm Password sama dengan Password yang Anda masukkan'] })

        //siapkan objek utk user baru
        let obj = {
            username,
            email,
            password,
            role: 'user',
            cart: []
        }

        //action utk register
        this.props.register(username, email, obj)
    }

    render() {
        if (this.props.successReg) {
            return 
                // Swal.fire('Hello, Admin! Register Meja Baru Sukses.') 
                swal({
                    title: "Sukses!",
                    text: "Hello, Admin! Register Meja Baru Sukses!",
                    icon: "success",
                    button: "Ok!",
                  });
        
                
            
           

        }

        const { visibility, visibility2 } = this.state

        return (
            <div style={styles.cont}>
                <div style={styles.contForm}>
                    <h2 style={{ color: 'orange' }}>Ingin Jajanan yang Mantap?</h2>
                    <h3 style={{ color: 'orange' }} className='mb-4'>Register Sekarang!!!</h3>
                    <Form.Label style={styles.fontColor}>Masukan Nomer Meja Baru</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-user"></i>
                        </InputGroup.Text>
                        <Form.Control
                            onChange={(e) => this.userValid(e)}
                            ref='username'
                            placeholder="Nomer Meja" />
                    </InputGroup>
                   
                    <div style={styles.contButton}>
                        <Button onClick={this.onRegister} variant="warning">
                            <i style={{ marginRight: '10px' }} className="fa-solid fa-user-plus"></i>
                            Register
                        </Button>
                    </div>
                    {/* <p style={styles.parRegislink}>Sudah punya akun? <Link style={styles.regisLink} to='/login'>Login</Link></p> */}
                    <p style={styles.parRegislink}>Kembali ke <Link style={styles.regisLink} to='/'>Home</Link></p>
                </div>
                {/* <Modal show={this.state.registerErr[0]}> */}
                <Modal show={this.state.registerErr[0]}>
                    <Modal.Header>
                        <Modal.Title>ERROR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.registerErr[1]}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ registerErr: [false, ''] })} variant="warning">OK</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.errorReg[0]}>
                    <Modal.Header>
                        <Modal.Title>ERROR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.errorReg[1]}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.resetRegErr} variant="warning">OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    cont: {
        background: "url(https://images.unsplash.com/photo-1608582037152-adefa9decb70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80) center",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'right'
    },
    contForm: {
        width: '100vh',
        marginTop: 'auto',
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '5%',
        paddingTop: '15px',
        borderRadius: '20px'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '10px'
    },
    fontColor: {
        color: 'white'
    },
    parRegislink: {
        textAlign: 'center',
        color: 'white',
        margin: '0px'
    },
    regisLink: {
        color: 'orange',
    }
}

const mapStateToProps = (state) => {
    return {
        errorReg: state.userReducer.errorRegister,
        successReg: state.userReducer.successRegister
    }
}

export default connect(mapStateToProps, { register, resetRegErr })(RegisPage)