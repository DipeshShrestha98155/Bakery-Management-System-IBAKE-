import React from 'react';
import { Button } from 'react-bootstrap';
import KhaltiCheckout from 'khalti-checkout-web';

const Khalti = () => {
  let checkout = new KhaltiCheckout();

  return (
    <div>
      <Button variant="primary">Pay via Khalti</Button>{' '}
    </div>
  );
};

export default Khalti;
