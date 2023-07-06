import React from "react";
import "./services.css";
import Fade from 'react-reveal/Fade';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  servicesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  service: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '45%',
      margin: theme.spacing(2),
    },
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: theme.spacing(2),
  },
}));

const ServicesPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="services-page">
      <div className="main-container">
        <Fade bottom>
          <h1 className="title"> Hyperce FullStack Developer Internship </h1>
        </Fade>
        <div className="attribution">
          <Fade bottom delay={200}>
            <p className="highlight bold">
              Design and Developed by - {" "}
              <a href="https://www.instagram.com/jeen_mhrzn/" target="_blank" rel="noopener noreferrer">Jeen Maharjan</a>
            </p>
          </Fade>
        </div>
        <Fade bottom>
          <p className="description">
            Some added features:
          </p>
          <ul className="functionality-list">
            <li><span className="highlight">Fully mobile responsive:</span> The website is designed to be responsive and adapt to different screen sizes.</li>
            <li><span className="highlight">Multiple order options:</span> Users can choose between Cash on Delivery (COD) and other payment methods for placing an order.</li>
            <li><span className="highlight">Firebase authentication:</span> Only users with valid email addresses are allowed to access certain features of the website.</li>
            <li><span className="highlight">Automatic quantity update:</span> When a book is purchased, the quantity is automatically adjusted to reflect the purchase.</li>
             <li><span className="highlight">Rating System</span> User can leave a rating on a book and you can also search according to rating</li>
          </ul>
        </Fade>
      </div>
    </div>
  );
};

export default ServicesPage;
