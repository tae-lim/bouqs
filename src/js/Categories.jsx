import React from 'react';
import { Dropdown, Card } from 'react-bootstrap';


import Products from './Products';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      filterOptions: [],
      products: []
    }
  }

  componentDidMount() {
    this.fetchCategories('http://localhost:8081/api/categories/');
    this.fetchCategory('http://localhost:8081/api/categories/?slug=', this.state.category);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.fetchCategory('http://localhost:8081/api/categories/?slug=', this.state.category);
    }
  }

  fetchCategories(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const filterOptions = this.createFilterOptions(data);
        this.setState({filterOptions});
      })
      .catch(err => console.log(err));
  }

  fetchCategory(url, category) {
    fetch(`${url}${category}`)
      .then(res => res.json())
      .then(data => this.setState({products: data[0].products}))
      .catch(err => console.log(err));
  }

  createFilterOptions(categories) {
    const filterOptions = categories.reduce((acc, category) => {
      if (category.name) {
        acc.add(category.name);
      }
      return acc;
    }, new Set());
    return [...filterOptions];
  }

  handleChange = category => {
    const slug = category.split(' ').join('-').toLowerCase();
    this.setState({category: slug});
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <div className="category-sub-header">   
            <Card.Title>Categories</Card.Title>
            <div className="drop-down">
              <Dropdown>
                <Dropdown.Toggle size="sm" variant="success" id="dropdown-categories">
                  Flowers
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.filterOptions.map(category => {
                    return <Dropdown.Item key={category} onClick={() => this.handleChange(category)}>{category}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Products products={this.state.products} handleAppViewChange={this.props.handleAppViewChange} addToCart={this.props.addToCart}/>
        </Card.Body>
      </Card>
    );
  }
}

export default Categories;