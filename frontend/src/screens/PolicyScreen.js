import React from 'react'
import Layout from '../components/Layout';

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus " style={{marginBottom: "10rem"}}>
        <div className="col-md-6 ">
          <p>.</p>
          <h2>Privacy Policy</h2>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>IBake (Bakery Management System) operates the 'ibakeapp.com' it's website, which provides the service. This page is used to inform website users regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our service. If you choose to use our service, then you agree to the collection and use of information in relation with this policy. The personal information that we collect are used for providing and improving the service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms of Use, which is accessible at our Terms of Use page, unless otherwise defined in this Privacy Policy.</p>
          <h2>Service Providers</h2>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>We may employ third-party companies and individuals due to the following reasons: To facilitate our service; To provide the service on our behalf; To perform service-related services; or To assist us in analyzing how our service is used. We want to inform our service users that in certain situations, we may need to give access to your Personal Information to these third parties. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
          <h2>Security</h2>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the Internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security</p>
          <h2>Links to Other Sites</h2>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>Our service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that we do not operate these external sites/apps. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites, apps or services</p>
          <h2>Changes to This Privacy Policy</h2>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p>
          <h2>Contact Us</h2>
          <p style={{textAlign: "justify", textJustify: "inter-word"}}>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy