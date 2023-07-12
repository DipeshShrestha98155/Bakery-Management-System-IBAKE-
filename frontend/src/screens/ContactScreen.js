import React from 'react'
import Layout from '../components/Layout';
import { BiMailSend, BiPhoneCall, BiSupport, BiStore } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.png"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
           Here we served variety of delicious cookies and for detail and info about product please contact us
          </p>
          <p className="mt-3">
            <BiMailSend /> : shresthadipesh45@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +977-9845028194
          <p className="mt-3"> 
          <BiPhoneCall />: +977-9815531032</p>
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-8866-2058 (toll free)
          </p>
          <p className="mt-3">
            <BiStore /> : Baneshwor, Kathmandu , Nepal
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact