import React from 'react';
import { render } from 'react-dom';

import Navigation from './Navigation';
import Categories from './Categories';
import ShoppingCart from './ShoppingCart';

import '../style/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'category',
      cart: []
    }
  }

  handleAppViewChange = view => {
    this.setState({view});
  }

  addToCart = variant => {
    const id = variant.id;
    let duplicateFound = false;

    //Updates variant quantity when duplicate is added to cart
    const cart = this.state.cart.map(variant => {
      if (id === variant.id) {
        duplicateFound = true;
        const updatedQuantity = variant.quantity + 1;
        return { ...variant, quantity: updatedQuantity};
      }
      return variant;
    });

    if (!duplicateFound) {
      cart.push(variant);
    }

    this.setState({
      cart
    });
  }

  render() {
    const view = this.state.view === 'category' ? <Categories handleAppViewChange={this.handleAppViewChange} addToCart={this.addToCart}/> : <ShoppingCart cart={this.state.cart} handleAppViewChange={this.handleAppViewChange}/>
    return (
      <div>
        <Navigation handleAppViewChange={this.handleAppViewChange}/>
        {view}
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app'),
);
