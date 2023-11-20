import React, { useState, useEffect } from "react";
import axios from 'axios';
import Helmet from "../Helmet/Helmet";
import AdminHeader from "./AdminHeader";
import { Container, Row, Col } from "reactstrap";
import { API_BASE_URL } from "../../api/base";

import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

const Dashboard = () => {
    const [totalRevenu, setTotalRevenu] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const token = localStorage.getItem("userToken");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await axios.get(`${API_BASE_URL}/dashboard/totalorder`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const revenueResponse = await axios.get(`${API_BASE_URL}/dashboard/totalrevenue`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                

                const mostOrderedProducts = await axios.get(`${API_BASE_URL}/dashbaord/mostorderedproducts`, {})
                console.log(ordersResponse, revenueResponse);
    
                if (ordersResponse.status >= 200 && ordersResponse.status < 300) {
                    if (ordersResponse.data.payload) {
                        setTotalOrders(parseFloat(ordersResponse.data.payload.toFixed(2)));
                    } else {
                        setTotalOrders(0);
                    }
                } else {
                    console.error("Error fetching data:", ordersResponse.data.msg);
                }
    
                if (revenueResponse.status >= 200 && revenueResponse.status < 300) {
                    if (revenueResponse.data.payload) {
                        setTotalRevenu(parseFloat(revenueResponse.data.payload.toFixed(2)));
                    } else {
                        setTotalRevenu(0);
                    }
                } else {
                    console.error("Error fetching data:", revenueResponse.data.msg);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    
    
    
    useEffect(() => {
        console.log("Updated totalRevenu:", totalRevenu);
        console.log("Updated totalOrders:", totalOrders);
    }, [totalRevenu, totalOrders]);

    console.log(totalRevenu,totalOrders)
    return (
        <Helmet title="Dashboard">
            <AdminHeader />
            <section>
                <Container>
                    <Row className="mt-4 mt-md-5">
                        <Col md={6} lg={4}>
                            <Card style={{ backgroundColor: 'orange' }} variant="solid" color="primary" invertedColors>
                                <CardContent orientation="horizontal">
                                    <CircularProgress size="lg" determinate value={totalRevenu}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                                />
                                            </svg>
                                        </SvgIcon>
                                    </CircularProgress>
                                    <CardContent>
                                        <Typography level="body-md">Gross profit</Typography>
                                        <Typography level="h2">$ {totalRevenu}</Typography>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card style={{ backgroundColor: 'orange' }} variant="solid" color="primary" invertedColors>
                                <CardContent orientation="horizontal">
                                    <CircularProgress size="lg" determinate value={totalRevenu}>
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                                />
                                            </svg>
                                        </SvgIcon>
                                    </CircularProgress>
                                    <CardContent>
                                        <Typography level="body-md">Total orders</Typography>
                                        <Typography level="h2">{totalOrders}</Typography>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Dashboard;
