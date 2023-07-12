import React from 'react'
import Layout from '../components/Layout';

const About = () => {
return (
  <Layout title={"About us - IBake App"}>
    <div style={{display: "flex"}}>
    <img
          src="/images/about.jpg"
          alt="aboutus"
          style={{ height: "70vh", marginRight: "5rem"}}
        />

        <section style={{
            padding: "0",
            color: "black",
            fontSize: "1rem"
        }}>
            <div className='bg-dark' style={{color: "white", textAlign: "center", fontSize: "2rem", padding: "0", width: "100%", marginBottom: "2rem"}}>
        ABOUT US
    </div>


    <p style={{marginLeft: "5px", textAlign: "justify", textJustify: "inter-word"}}>
    Welcome to our Bakery Management System in Nepal!
<br/>
<br/>
At our bakery, we take great pride in providing you with the most delicious and freshly baked goods, combined with a seamless and efficient management system. Our aim is to enhance your bakery experience, whether you are a customer or a bakery owner, by offering innovative solutions tailored to the unique needs of the Nepalese bakery industry.   <br/>
<br/>
As a customer, you can expect a delightful journey through our user-friendly online platform. Browse through our extensive menu of delectable treats, ranging from traditional Nepalese specialties to international favorites. Place your orders effortlessly and conveniently, knowing that our system ensures accurate and timely delivery. We prioritize your satisfaction and strive to create a seamless experience from start to finish.
<br/> 
<br/>
Join us on this exciting journey as we revolutionize the way bakeries operate in Nepal. Experience the convenience, efficiency, and excellence that our Bakery Management System brings. Together, let's elevate the art of baking and take your bakery business to new heights.

    </p>
        </section>
    </div>
    
  </Layout>
 );
};

export default About;


{/* <div className="row contactus ">
      <div className="col-md-6 ">
      
      </div>
      <div className="col-md-4">        
      <p className="text-justify mt-2">      
      <h1 className="bg-dark p-2 text-white text-center">About us</h1>
      </p>
      </div>
    </div> */}