import { useEffect, useState } from 'react';
import axios from 'axios';
import { Steps, ButtonGroup, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Management() {
    const [filterCart, setFilterCart] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

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
        HandleRenderOrder();
    };

    const onNext = (cartId) => {
        const cart = filterCart.find((item) => item.id === cartId);
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

    const handleUserClick = (username) => {
        setSelectedUser(username);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ marginTop: 50, marginLeft: 500 }}>Quản lí các đơn đặt hàng</h2>
            <div style={{ marginLeft: '500px' }}>
                {filterCart.map((cart) => (
                    <div key={cart.id} style={{ border: '1px solid', padding: 15, margin: '20px 0px' }}>
                        <button style={{ fontSize: 25 }} onClick={() => handleUserClick(cart.username)}>Người mua: {cart.username}</button>
                        <h3 style={{ fontSize: `20px` }}>Địa chỉ: {cart.address}</h3>
                        <h3 style={{ fontSize: `20px` }}>Số điện thoại người nhận: {cart.phone}</h3>
                        {selectedUser === cart.username && (
                            <>
                                {cart.product.map((item) => (
                                    <div key={item.id}>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <div style={{ fontSize: `17px`, marginBottom: 10 }}>Tên sản phẩm: {item.name}</div>
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
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Management;
