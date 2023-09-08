import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Steps, ButtonGroup, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Management() {
    const [filterCart, setFilterCart] = useState([]);
    const username = Cookies.get('jwt');

    const HandleRenderOrder = async () => {
        const response = await axios.get(`http://localhost:3001/carts`);
        const filterCart = response.data;
        setFilterCart(filterCart);
    };

    useEffect(() => {
        HandleRenderOrder();
    }, []);

    const handlePushServer = async (cartId, newStatus) => {
        const response = await axios.get(`http://localhost:3001/carts/${cartId}`);
        const cart = response.data;
        cart.status = newStatus;
        await axios.put(`http://localhost:3001/carts/${cartId}`, cart);
        HandleRenderOrder(); // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
        console.log(`data`, newStatus);
    };

    const onNext = (cartId) => {
        const cart = filterCart.find((item) => item.id === cartId);
        console.log(cart);
        if (cart) {
            const currentStatus = cart.status;
            if (currentStatus < 3) {
                const newStatus = currentStatus + 1;
                handlePushServer(cartId, newStatus);
            }
        }
    };

    const onPrevious = (cartId) => {
        const cart = filterCart.find((item) => item.id === cartId);
        if (cart) {
            const currentStatus = cart.status;
            if (currentStatus > 0) {
                const newStatus = currentStatus - 1;
                handlePushServer(cartId, newStatus);
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ marginTop: 50, marginLeft: 500 }}>Đơn hàng của bạn</h2>
            {filterCart.map((cart) => (
                <div key={cart.id} style={{ border: '1px solid', padding: 15, margin: '50px 0px 0px 500px' }}>
                    <h3>Người mua: {cart.username}</h3>
                    {cart.product.map((item) => (
                        <div key={item.id}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <div>Tên sản phẩm: {item.name}</div>
                                <div>SL: {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Steps current={cart.status}>
                            <Steps.Item title="Chờ xác nhận" />
                            <Steps.Item title="Đặt hàng thành công" />
                            <Steps.Item title="Chờ giao hàng" />
                            <Steps.Item title="Giao hàng thành công" />
                        </Steps>
                        <ButtonGroup>
                            <Button onClick={() => onPrevious(cart.id)} disabled={cart.status === 0}>
                                Previous
                            </Button>
                            <Button onClick={() => onNext(cart.id)} disabled={cart.status === 3}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Management;
