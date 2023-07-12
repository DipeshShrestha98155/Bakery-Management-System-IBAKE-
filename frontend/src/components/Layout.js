import React from 'react';
import Footer from './Footer';
import {Helmet} from "react-helmet";


const Layout = ({ children,title,description,keywords,author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
         <meta name="description" content="{description}" />
         <meta name="keywords" content="{keywords}" />
        <meta name="author" content="{author}" />
        <title>{title}</title>
      </Helmet>
      
        <main style={{ minHeight: "100vh"}}>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "IBake App - order now",
  description: "Bakery Management System",
  keywords: "mern,react,node,mongodb",
  author: "Dipesh Shrestha",
};
export default Layout;