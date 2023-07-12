import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import KhaltiCheckout from 'khalti-checkout-web';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let khaltiCheckout; // Declare the variable outside the scope

  axios
    .get('/api/config/khalti')
    .then((res) => {
      const publicKey = res.data;
      console.log('khalti is working');

      var khaltiCheckoutConfig = {
        publicKey,
        productIdentity: '1234567890',
        productName: 'IBake',
        productUrl: 'http://ibake.com.np/',
        paymentPreference: [
          'KHALTI',
          'EBANKING',
          'MOBILE_BANKING',
          'CONNECT_IPS',
          'SCT',
        ],
        maxAmount: 500000,
        eventHandler: {
          onSuccess(payload) {
            console.log('payload', payload);
            // hit merchant api for initiating verfication
            const mappedPayload = {
              id: payload.idx,
              status: 'paid',
              update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              email_address: 'ibake@gmail.com',
            };
            successPaymentHandler(mappedPayload);
          },
          onError(error) {
            console.log(error);
          },
          onClose() {
            console.log('widget is closing');
          },
        },
      };
      khaltiCheckout = new KhaltiCheckout(khaltiCheckoutConfig); // Assign to the global variable
    })
    .catch((err) => {
      console.log('khalti sdk failed to load');
      console.log(err);
    });

  const handleButtonClick = (amount) => {
    if (khaltiCheckout) {
      khaltiCheckout.show({ amount: 1000 });
    }
  };

  const addKhaltiScript = async () => {
    window.khalti = true;
    setSdkReady(true);
  };

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (order.paymentMethod === 'PayPal') {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      } else if (order.paymentMethod === 'Khalti') {
        if (!window.khalti) {
          addKhaltiScript();
        } else {
          setSdkReady(true);
        }
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Contact: </strong>
                {order.shippingAddress.phoneNumber}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.street}, {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}{' '}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{' '}
                  {moment(order.deliveredAt).format('h:mm:ss a, MMMM Do YYYY')}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on{' '}
                  {moment(order.paidAt).format('h:mm:ss a, MMMM Do YYYY')}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs {item.price} = Rs{' '}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery Charge</Col>
                  <Col>Rs {order.deliveryCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <>
                      {order && order.paymentMethod === 'PayPal' ? (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      ) : order.paymentMethod === 'Khalti' ? (
                        <Button
                          variant="purple"
                          style={{
                            backgroundColor: 'purple',
                            borderColor: 'purple',
                            color: 'white',
                            borderRadius: '4px',
                            width: '100%',
                          }}
                          // convert bg color on hover to light purple
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#963baf';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'purple';
                          }}
                          onClick={() => {
                            handleButtonClick(order.totalPrice);
                          }}
                        >
                          Pay via Khalti
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="green"
                            style={{
                              backgroundColor: 'green',
                              borderColor: 'green',
                              color: 'white',
                              borderRadius: '4px',
                              width: '100%',
                            }}
                            disabled={true}
                            // convert bg color on hover to light green
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#4caf50';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = 'green';
                            }}
                          >
                            Cash On Delivery
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                (order.isPaid || order.paymentMethod === 'Cash On Delivery') &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                      style={{
                        borderRadius: '4px',
                      }}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
