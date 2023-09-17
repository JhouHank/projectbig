import Transition from '../Transition';
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import {motion, useMotionValue, useTransform, animate}  from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, faCartShopping, faArrowTrendDown, faReceipt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    // 抓訂單及商品資料
    useEffect(() => {
        // 訂單
        const fetchOrderData = async () => {
            try {
                const response = await axios.post("/order",
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                // console.log(response.data.length);
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        // 商品
        const fetchProductData = async () => {
            try {
                const response = await axios.post("/products",
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                // console.log(response.data.length);
                setProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        // 抓資料
        fetchOrderData();
        fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    // 計算營收(每筆訂單的total_price加總)
    const totalPrices = orders.reduce((total, order) => {
        // 將total_price轉換為浮點數並加到 total 中
        return total + parseFloat(order.total_price || 0);
    }, 0); // 0 是初始的 total 值

    // 計算已付款
    const isPaid = orders.filter((order) => order.is_paid === 1).length;

    // 計算庫存 少於20
    const lowInStock = products.filter((product) => product.countInStock < 20).length;

    // 計算已付款的所有訂單的總金額
    const totalPaidAmount = orders.filter((order) => order.is_paid === 1).reduce((total, order) => {
        return total += parseFloat(order.total_price);
    }, 0); // 0 是初始的 total 值

    // 數字動畫(已經包裝成組件了)
    const Counter = ({ from, to, duration }) => {
        const count = useMotionValue(from);
        const rounded = useTransform(count, (latest) => Math.round(latest));
        useEffect(() => {
            const controls = animate(count, to, { duration: duration });
            return controls.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return <motion.h2>{rounded}</motion.h2>;
    };

    return (
        <Transition>
            <div className="p-3 bg-light">
                <section className="contanier-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
                            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm rounded-3 shadow">
                                <FontAwesomeIcon icon={faSackDollar} className='fs-1 text-success'/>
                                <div className='text-center'>
                                    <p>營收</p>
                                    <Counter from={0} to={totalPaidAmount} duration={1.5} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
                            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm rounded-3 shadow">
                                <FontAwesomeIcon icon={faCartShopping} className='fs-1 text-info'/>
                                <div className='text-center'>
                                    <p>已付款</p>
                                    <Counter from={0} to={isPaid} duration={1.5} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
                            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm rounded-3 shadow">
                                <FontAwesomeIcon icon={faArrowTrendDown} className='fs-1 text-danger'/>
                                <div className='text-center'>
                                    <p>庫存低於20</p>
                                    <Counter from={0} to={lowInStock} duration={1.5} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
                            <div className="d-flex justify-content-around p-4 align-items-center bg-white border border-secondary shadow-sm rounded-3 shadow">
                                <FontAwesomeIcon icon={faReceipt} className='fs-1 text-warning'/>
                                <div className='text-center'>
                                    <p>訂單總價</p>
                                    <Counter from={0} to={totalPrices} duration={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-8 p-3">
                            <LineChart/>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <PieChart/>
                        </div>
                    </div>
                </section>
            </div>
        </Transition>
    )
}

export default  Home;
