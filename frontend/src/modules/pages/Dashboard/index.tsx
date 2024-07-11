import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {jwtAxios, setAuthToken} from "../../../jwt-auth";
import {useNavigate} from 'react-router-dom';
import {AxiosError, AxiosResponse} from 'axios';
import {Alert} from "react-bootstrap";
import { LineChart } from '@mui/x-charts/LineChart';

const defaultFormValues = {
    longitude: "",
    latitude: "",
    housing_median_age: "",
    total_rooms: "",
    total_bedrooms: "",
    population: "",
    households: "",
    median_income: "",
    ocean_proximity: ""
}

const Dashboard = () => {
    const [validated, set_Validated] = useState(false);
    const [data, setData] = useState([]);
    const [xAxis,setXAxis] = useState([])
    const [series,setSeries] = useState([])
    const navigate = useNavigate()
    const [form, setFormData] = useState(defaultFormValues);

    const onLogout = () => {
        setAuthToken()
        navigate('/sign-in')
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await jwtAxios
            .get('v1/house-prediction/list/')
            .then((res: AxiosResponse) => {
                setData(res?.data?.data?.list)
                console.log(res?.data?.data?.chart?.created_at,res?.data?.data?.chart?.prediction)
                setXAxis(res?.data?.data?.chart?.created_at)
                setSeries(res?.data?.data?.chart?.prediction)
            }).catch(async (error: AxiosError) => {
                console.log("Error",error)
            });
    }

    const submitForm = async (event: any) => {
        event.preventDefault();
        const form_submit = event.currentTarget;

        if (form_submit.checkValidity() === false) {
            event.stopPropagation();
            set_Validated(true);
            return true
        }

        await jwtAxios
            .post('v1/house-prediction/create/', form)
            .then(async (response: AxiosResponse) => {
                getData()
                set_Validated(false);
                setFormData(defaultFormValues)
            }).catch(async (error: AxiosError) => {
                set_Validated(true);
                console.log("Error",error)
            });

        set_Validated(false);
    }

    const changeField = (event: any) => {
        const {name, value} = event.target;
        setFormData({
            ...form,
            [name]: value,
        });
    };

    return (
        <>
            <br/>
            <Form noValidate validated={validated} onSubmit={submitForm}>
                <Row>
                    <Col md={12}>
                        <Button onClick={() => onLogout()} className={"submitButton"} style={{float: 'right'}}
                                variant="secondary">
                            Logout
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Longitude" name={'longitude'}
                                      value={form.longitude} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.longitude)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Latitude" name={"latitude"}
                                      value={form.latitude} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.latitude)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Housing median age"
                                      name={"housing_median_age"} value={form.housing_median_age} onChange={changeField}
                                      required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.housing_median_age)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Total rooms" name={"total_rooms"}
                                      value={form.total_rooms} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.total_rooms)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Total bedrooms" name={"total_bedrooms"}
                                      value={form.total_bedrooms} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.total_bedrooms)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Population" name={"population"}
                                      value={form.population} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.population)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Households" name={"households"}
                                      value={form.households} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.households)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control type="number" step={0.1} placeholder="Median income" name={"median_income"}
                                      value={form.median_income} onChange={changeField} required
                                      isInvalid={validated && !/[-+][0-9]+\.[0-9]+$/.test(form.median_income)}/>
                    </Col>
                    <Col md={4}>
                        <Form.Control placeholder="Ocean proximity" name={"ocean_proximity"}
                                      value={form.ocean_proximity} onChange={changeField} required
                                      isInvalid={validated && !/^\S+@\S+\.\S+$/.test(form.ocean_proximity)}/>
                    </Col>
                </Row>
                <Button className={"submitButton"} variant="primary" type="submit">
                    Submit new data
                </Button>
                <br/>
                <br/>
                {validated && <Alert key={'danger'} variant={'danger'}>
                    Invalid data
                </Alert>}
            </Form>
            <br/>
            <hr/>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Prediction</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th>Housing median age</th>
                    <th>Total rooms</th>
                    <th>Total bedrooms</th>
                    <th>Population</th>
                    <th>Households</th>
                    <th>Median income</th>
                    <th>Ocean proximity</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                </tr>
                </thead>
                <tbody>
                    {data.map(function (value:any) {
                        return (
                            <tr key={value?.id}>
                                <td ><b><i>{value?.prediction}</i></b></td>
                                <td>{value?.longitude}</td>
                                <td>{value?.latitude}</td>
                                <td>{value?.housing_median_age}</td>
                                <td>{value?.total_rooms}</td>
                                <td>{value?.total_bedrooms}</td>
                                <td>{value?.population}</td>
                                <td>{value?.households}</td>
                                <td>{value?.median_income}</td>
                                <td>{value?.ocean_proximity}</td>
                                <td>{value?.created_at}</td>
                                <td>{value?.updated_at}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <br/>
            <LineChart
                width={1000}
                height={500}
                series={[
                    { data: series, label: 'uv' },
                ]}
                xAxis={[{ scaleType: 'point', data: xAxis }]}
            />
        </>
    )
}
export default Dashboard;