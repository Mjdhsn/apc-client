import React from "react";
import Header from "../../compononts/header";
import css from "./contact.module.scss";
import background from "../../assets/buildings.png";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Twitter from "../../assets/twitter.png";
import removeToken from '../../compononts/useToken'

const ContactUs = () => {
  return (
    <>
      <Header token={removeToken}/>
      <div className={css.wrapper}>
        <div className={css.background}></div>
        <div className={css.container}>
          <div className={css.left}>
            <span>Let's talk about everything!</span>
            <span></span>
            <div className={css.phone}>
              <span>Phone</span>
              <span>+234757958</span>
            </div>
            <div className={css.social}>
              <img src={Facebook} alt="facebook" />
              <img src={Instagram} alt="instagram" />
              <img src={Twitter} alt="twitter" />
            </div>
          </div>
          <div className={css.right}>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Subject" />
            <textarea rows={3}></textarea>
            <button className="button">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
