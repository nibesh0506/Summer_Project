import React from "react";
import Slider from "react-slick";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSeller";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import tclgif from "../image/tcl.gif";
import tcl1 from "../image/tcl1.jpg";
import crompton from "../image/Crompton.jpg";
import godrej from "../image/Godrej.jpg";
import midea from "../image/Midea.jpg";
import {Menu } from "antd";
import "./Home.css"; // Import the CSS file

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Home = () => {
  return (
    <>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          <div>
            <img src={tcl1} alt="tcl1" className="center-image" />
          </div>
          <div>
            <img src={crompton} alt="crompton" className="center-image" />
          </div>
          <div>
            <img src={godrej} alt="godrej" className="center-image" />
          </div>
          <div>
            <img src={midea} alt="midea" className="center-image" />
          </div>
        </Slider>
      </div>

      <img
        src={tclgif}
        alt="tclgif"
        style={{ marginTop: "70px" }}
        className="center-image1"
      />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          maxWidth: "1200px", // Adjust the maximum width as needed
          margin: "0 auto", // Center the box horizontally
          marginTop: "33px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        }}
      >
        <h1
          style={{ marginTop: "-10px", fontSize: "24px" }}
          className="text-center"
        >
          Discover what's new, discover what's next.
          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#4169E1", // Dark color
            }}
          />
        </h1>
        <NewArrivals />
      </div>

      <br />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          maxWidth: "1200px", // Adjust the maximum width as needed
          margin: "0 auto", // Center the box horizontally
          marginTop: "33px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        }}
      >
        <h1
          style={{ marginTop: "-10px", fontSize: "24px" }}
          className="text-center"
        >
          Top Selling Products List : You might be interested in
          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#4169E1", // Dark color
            }}
          />
        </h1>
        <BestSellers />
      </div>
      <br />
      <br />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          maxWidth: "1200px", // Adjust the maximum width as needed
          margin: "0 auto", // Center the box horizontally
          marginTop: "33px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        }}
      >
        <h1
          style={{ marginTop: "-10px", fontSize: "24px" }}
          className="text-center"
        >
          You can browse through the categories!
          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#4169E1", // Dark color
            }}
          />
        </h1>
        <CategoryList />
      </div>
      <br />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          maxWidth: "1200px", // Adjust the maximum width as needed
          margin: "0 auto", // Center the box horizontally
          marginTop: "33px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        }}
      >
        <h1
          style={{ marginTop: "-10px", fontSize: "24px" }}
          className="text-center"
        >
          Introducing Your Ultimate All Time Essential !
          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#4169E1", // Dark color
            }}
          />
        </h1>
        <SubList />
      </div>
      <Menu theme="dark">
        <div
          style={{
            marginLeft: "50px",
            marginTop: "20px",
            fontFamily: "cursive",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            Subhekshya Trade and Suppliers
          </div>
          <div
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "40px" }}
          >
            Contact: 9848421017
          </div>
          <div
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "40px" }}
          >
            Address: Dhangadhi-1,Kailali
          </div>
          <div style={{ marginTop: "10px" }}>
            <a href="https://www.facebook.com/subhekshyatrade">
              <FacebookOutlined className="float-right h2 p-2" />
            </a>
            <a href="https://www.instagram.com/n.i.b.e.s.h/">
              <InstagramOutlined className="float-right h2 p-2" />
            </a>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default Home;
