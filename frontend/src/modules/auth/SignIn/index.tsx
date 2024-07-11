import React , {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from "react-router-dom";
import {jwtAxios, setAuthToken} from "../../../jwt-auth";
import {AxiosError, AxiosResponse} from "axios";
import {Alert} from "react-bootstrap";

const SignIn = () => {
    const [validated, set_Validated] = useState(false);
    const [form, setFormData] = useState({
        password: "",
        username: "",
    });

    const submitForm = async (event:any) => {
        event.preventDefault();
        const form_submit = event.currentTarget;
        if (form_submit.checkValidity() === false) {
            event.stopPropagation();
            set_Validated(true);
        }
        await jwtAxios
            .post('token/',form)
            .then((response: AxiosResponse) => {
                setAuthToken(response?.data?.access);
                navigate("/");
            }).catch((error: AxiosError) => {
                set_Validated(true);
            });

    };

    const changeField = (event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...form,
            [name]: value,
        });
    };


    const navigate = useNavigate();
    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <Form  onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="username"
                            placeholder="Enter email" onChange={changeField} required isInvalid={validated && !/^\S+@\S+\.\S+$/.test(form.username)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Password"
                                      name="password"
                            //value={form.password}
                                      onChange={changeField}
                                      required
                                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </Form>
                <br/>
                <a href={"/sign-up"}>Chick here to sign up</a>
                <br/>
                {validated && <Alert key={'danger'} variant={'danger'}>
                    No active account found with the given credentials.
                </Alert>}
            </Col>
        </Row>
    )
}
export default SignIn;