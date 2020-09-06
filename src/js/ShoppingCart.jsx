import React from 'react';
import { Card, Table } from 'react-bootstrap';

class ShoppingCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: props.cart
    }
  }

  calculateSubTotal(variant) {
    return Number(variant.price.slice(1)) * variant.quantity;
  }

  calculateTotal(cart) {
    return cart.reduce((total, variant) => {
      total += this.calculateSubTotal(variant);
      return total;
    }, 0);
  }

  render() {
    const total = this.calculateTotal(this.state.cart);

    if (this.state.cart.length === 0) {
      return (
        <Card>
          <Card.Body>
            <div>Shopping Cart is empty</div>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card>
        <Card.Body>
          <Card.Title>Shopping Cart</Card.Title>
          <Table bordered>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cart.map(variant => {
                return (
                  <tr>
                    <td className="shopping-cart-product-info">
                      <img src={variant.img}></img>
                      <span>{variant.name}</span>
                    </td>
                    <td>{variant.price}</td>
                    <td>{variant.quantity}</td>
                    <td>{`$${this.calculateSubTotal(variant)}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="text-right">
            <h6><strong>{`Total: $${total}`}</strong></h6>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default ShoppingCart;

//Considerations: I did not use the sale price for any of the variants because instructions made no indiction. 
//In real life, I would clarify here on how to handle regular/sale discrepancies.
