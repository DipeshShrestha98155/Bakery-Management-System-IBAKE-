import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'IBake Shop',
  description: 'Providing the best baking products at the best prices',
  keywords:
    'baking, baking products, baking ingredients, baking tools, cakes, cookies, breads',
};

export default Meta;
