// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
// import Rating from './Rating';

// const Product = ({ product }) => {
//   return (
//     <Card className="my-3 p-3 rounded">
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} variant="top" />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as="div">
//           <Rating
//             value={product.rating}
//             text={`${product.numReviews} reviews`}
//           />
//         </Card.Text>

//         <Card.Text as="h3">Rs {product.price}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Product;

import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  const cardStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: "#ebebeb"
  };

  const imageStyle = {
    maxHeight: '200px',
    objectFit: 'contain',
  };

  return (
    <Card className="my-3 p-3 rounded" style={cardStyle}>
      <Link to={`/product/${product._id}`}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card.Img src={product.image} variant="top" style={imageStyle} />
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">Rs {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
