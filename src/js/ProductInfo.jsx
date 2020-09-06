import React from 'react';
import { Card, Modal, Button } from 'react-bootstrap';

const ProductInfo = props => {
  
  const handleClick = variant => {
    props.handleAppViewChange('cart');
    props.addToCart(variant);
  };

  return (
    <Modal
      show={props.open}
      onHide={() => props.setShow(false)}
      keyboard={false}
      centered
    >
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>{props.variant.name}</Card.Title>
            <Card.Text>{props.variant.description}</Card.Text>
            <Card.Text>Manufacturer: {props.variant.manufacturer.name}</Card.Text>
            <Card.Text>Location: {props.variant.manufacturer.location}</Card.Text>
            <div className="text-center">
              <Button variant="primary" onClick={() => handleClick(props.cartVariant)}>Add To Cart</Button>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default ProductInfo;