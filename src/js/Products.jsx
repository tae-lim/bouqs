import React, {useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import ProductInfo from './ProductInfo';

const Products = props => {
  // Realized I need state for modal dialog so instead of converting functional component to class component, used Hooks
  const [show, setShow] = useState(false);
  const [v, handleVariantChange] = useState({description: '', manufacturer: {name: '', location: ''}});
  const [cartVariant, handleCartVariantChange] = useState({id: '', name: '', img: '', quantity: 0, price: ''});

  const determineLowestPriceVariant = variants => {
    return variants.reduce((acc, variant) => {
      if (Number(variant.prices.regular) < Number(acc.prices.regular)) {
        acc = variant;
      }
      return acc;
    }, {prices: {"regular": Infinity}})
  };

  const determineNearestDollarAmt = amount => {
    // Regular prices are either strings or numbers. We need to process any numbers to strings.
    let [dollar, cents] = ('' + amount).split('.');
    return Number(cents) < 50 ? `$${dollar}` : `$${Number(dollar) + 1}`
  };

  // Find matching image for either "Original", "Deluxe", or "Grand".
  // API may have multiple image objects for any of the options. Method returns the first found matching option.
  const findMatchingImage = (images, name) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].option === name) {
        return images[i];
      }
    }
  };

  const openProductInfo = (variant, cartVariant) => {
    handleVariantChange(variant);
    handleCartVariantChange(cartVariant);
    setShow(true);
  };

  return (
    <Container>
      <Row xs={1} sm={3} lg={4}>
        {props.products.map(product => {
          const variant = determineLowestPriceVariant(product.variants);
          const image = findMatchingImage(product.images, variant.name);

          // If no matching image for variant has been found, just use the first image.
          // Ex. Lowest regular price variant is Original, but there's no image for it. Then use the first image whether it's Deluxe or Grand.
          const imageURL = image ? image.url : product.images[0].url;

          const price = determineNearestDollarAmt(variant.prices.regular);
          const cartVariant = {
            id: variant.id,
            name: product.name,
            img: imageURL,
            quantity: 1,
            price: price
          };

          return (
            <Col className="variant-card-wrapper" key={variant.id} sm={8} md={6} lg={4}>
              <Card as="a" href="#" onClick={() => openProductInfo(product, cartVariant)}>
                <Card.Img variant="top" src={imageURL} alt={product.image_alt_tags} />
                <Card.Body>
                  <Card.Text>{product.name}</Card.Text>
                  <Card.Text>{price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <ProductInfo variant={v} open={show} setShow={setShow} handleAppViewChange={props.handleAppViewChange} addToCart={props.addToCart} cartVariant={cartVariant}/>
    </Container>
  );
}

export default Products;

//Considerations: I did not handle the purchaseable or active properties from variants because instructions made no indiction to do so. I assumed all variants are purchasable.