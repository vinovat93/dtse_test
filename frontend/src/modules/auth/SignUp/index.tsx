import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {jwtAxios} from "../../../jwt-auth";
import { useNavigate } from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import {Alert} from "react-bootstrap";

const SignUp = () => {
    const [validated, set_Validated] = useState(false);
    const [form, setFormData] = useState({
        password: "",
        confirmation_password: "",
        email: "",
    });
    const navigate = useNavigate();

    const submitForm = async (event:any) => {
        event.preventDefault();
        const form_submit = event.currentTarget;
        if (form_submit.checkValidity() === false) {
            event.stopPropagation();
            set_Validated(true);
        }
        await jwtAxios
            .post('v1/account/create/',{...form,...{'username':form?.email}})
            .then(async (response: AxiosResponse) => {
                navigate("/sign-in");
            }).catch(async (error: AxiosError) => {
                //alert(error?.response?.data?.detail);
                set_Validated(true);
            });

    };

    const changeField = (event:any) => {
        const { name, value } = event.target;
        setFormData({
            ...form,
            [name]: value,
        });
    };

    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                <Form noValidate validated={validated} onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            //value={form.email}
                            onChange={changeField}
                            required
                            isInvalid={
                                validated &&
                                !/^\S+@\S+\.\S+$/.test(form.email)
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                      placeholder="Password"
                                      name="password"
                                      //value={form.password}
                                      onChange={changeField}
                                      minLength={6}
                                      required
                                      isInvalid={
                                          validated && form.password.length < 6
                                      }/>
                        <Form.Control.Feedback type="invalid">
                            Password must be at least 6 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name={"confirmation_password"}
                            placeholder="Confirmation password"
                            //value={form.confirmation_password}
                            onChange={changeField}
                            minLength={6}
                            required
                            pattern={form.password}
                            isInvalid={
                                validated &&
                                form.confirmation_password !== form.password
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
                <br/>
                {validated && <Alert key={'danger'} variant={'danger'}>
                   Invalid data
                </Alert>}
            </Col>
        </Row>
    )
}
export default SignUp;