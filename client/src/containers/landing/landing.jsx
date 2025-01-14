import {
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  Card,
  Modal,
  useMediaQuery,
  AppBar,
  MenuItem,
  Menu,
  IconButton,
  Toolbar,
  ButtonGroup,
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MenuIcon from "@material-ui/icons/Menu";
import SecurityIcon from "@material-ui/icons/Security";
import stellarIcon from "./stellar.svg";
import balance from "./balance.svg";
import pic from "./cryptographicsPic.png";
import Faq from "components/faq/faq";
import useStyles from "styles";
import "./landing.css";
import { Link } from "react-scroll";
import { supabase } from "supabase/supabase";
import { useHistory } from "react-router";
import { useState } from "react";
import Register from "components/register/register";
import Login from "components/login/login";
import logoRXC from "./rocketXchange-transparent.png";

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const ourMediaQuery = useMediaQuery("(min-width:730px)");
  const ourMediaQuery2 = useMediaQuery("(min-width:650px)");
  let session = supabase.auth.session();

  const handleRegister = () => {
    setRegisterModal(!registerModal);
  };
  const handleLogin = () => {
    setLoginModal(!loginModal);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rocket = (
    <Link
      activeClass="active"
      to="presentation"
      spy={true}
      smooth={true}
      hashSpy={true}
      offset={50}
      duration={500}
      className="navItems"
    >
      RocketXChange
    </Link>
  );

  const cryptos = (
    <Link
      activeClass="active"
      to="cryptos"
      spy={true}
      smooth={true}
      hashSpy={true}
      offset={50}
      duration={500}
      className="navItems"
    >
      Cryptos
    </Link>
  );
  const about = (
    <Link
      activeClass="active"
      to="rocketFeatures"
      spy={true}
      smooth={true}
      hashSpy={true}
      offset={50}
      duration={500}
      className="navItems"
    >
      About
    </Link>
  );

  const faq = (
    <Link
      activeClass="active"
      to="frequencyQuestion"
      spy={true}
      smooth={true}
      hashSpy={true}
      offset={50}
      duration={500}
      className="navItems"
    >
      FAQ
    </Link>
  );
  const buttons = (
    <ButtonGroup>
      <Button
        color="secundary"
        variant="contained"
        // justifyContent="left"
        onClick={handleRegister}
        style={{ width: "50%" }}
      >
        REGISTER
      </Button>
      <Button
        color="primary"
        variant="contained"
        // justifyContent="left"
        onClick={handleLogin}
        style={{ width: "50%", color: "#000", backgroundColor: "#ffd523" }}
      >
        LOGIN
      </Button>
      <Modal
        open={registerModal}
        onClose={handleRegister}
        style={{ zIndex: "1000", position: "fixed" }}
      >
        <Register back={handleRegister} />
      </Modal>
      <Modal open={loginModal} onClose={handleLogin} style={{ zIndex: "1000" }}>
        <Login back={handleLogin} />
      </Modal>
    </ButtonGroup>
  );

  return (
    <Container className="landing">
      {session ? history.push("/home") : null}
      {ourMediaQuery ? (
        <Grid container className={classes.landingContainers} spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h5">{rocket}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5">{cryptos}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5">{about}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5">{faq}</Typography>
          </Grid>
          <Grid item xs={3} align="right">
            {buttons}
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <AppBar color="transparent" position="static">
            <Toolbar>
              <Grid item xs={2} align="left">
                <Button
                  onClick={handleClick}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  <IconButton>
                    <MenuIcon />
                  </IconButton>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{cryptos}</MenuItem>
                  <MenuItem onClick={handleClose}> {about}</MenuItem>
                  <MenuItem onClick={handleClose}> {faq}</MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={5}>
                {rocket}
              </Grid>
              <Grid item xs={5} align="right">
                {buttons}
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
      )}

      <Divider
        variant="middle"
        style={{ margin: "1%", backgroundColor: "#fdfbfb" }}
      />

      <div className="presentation">
        <Grid container className="titleContainer">
          <Typography item xs={8} variant="h3">
            Make your money work with cryptocurrencies
          </Typography>
          <Box
            item
            xs={4}
            fontSize={22}
            fontStyle="oblique"
            className="titleContainer"
          >
            Bet on the future of finance and save without restrictions
          </Box>
        </Grid>
        <Grid container xs={12} spacing={6} justifyContent="flex-end">
          <Box
            className={classes.presentationBox}
            letterSpacing={4}
            spacing={6}
            alignItems="center"
          >
            <Typography item xs={4} variant="h5" align="right">
              Trades here are peer-to-peer! On RocketXChange you trade directly
              with other traders. There’s no one in the middle. You always have
              sole control of your assets.
            </Typography>
          </Box>
        </Grid>
      </div>

      <div className="register">
        <Grid container className={classes.landingRegister} align="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="rigth"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Don't let time go by, start trading now!
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <img
              className={ourMediaQuery?"logoRxC":"logoRxCResponsive"}
              src={logoRXC}
              alt="rocketXchange-transparent"
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              size="large"
              onClick={handleRegister}
              style={{
                backgroundColor: "#ffd523",
                color: "#131313cc",
                letterSpacing: "4px",
              }}
              variant="contained"
            >
              REGISTER!
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className="cryptos">
        <Grid
          container
          xs={12}
          className={classes.landingContainers}
          style={{ padding: "5%", justifyContent: "center" }}
        >
          <Grid item xs={12}>
            <Typography
              item
              xs={5}
              variant="h4"
              className={classes.landingCard}
            >
              Get in real time the waves of the cryptos with the highest volume
              to make better investments!
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <img
              src={pic}
              alt="cryptographicsRealtimePic"
              className="landingPic"
              style={ourMediaQuery2 ? null : {marginTop: "80%"}}
            />
          </Grid>
        </Grid>
      </div>

      <div className="rocketFeatures">
        <Grid>
          <Typography variant="h4" className="rocketFeaturesTypography">
            {" "}
            What can you do with RocketExChange?{" "}
          </Typography>
        </Grid>
        <Grid
          container
          xs={12}
          justifyContent="space-evenly"
          className="aboutGrid"
        >
          <Card item xs={3} className={classes.landingCards}>
            <MonetizationOnIcon fontSize="large" />
            <Typography>
              The better way to trade directly with other traders. There’s no
              one in the middle!
            </Typography>
          </Card>
          <Card item xs={3} className={classes.landingCards}>
            <SecurityIcon fontSize="large" />
            <Typography> Acquire your cryptocurrencies safely</Typography>
          </Card>
          <Card item xs={3} className={classes.landingCards}>
            <img className="cryptoIcons" src={stellarIcon} alt="no img" />
            <Typography>Deposit and withdraw, fiat and crypto</Typography>
          </Card>
          <Card item xs={3} className={classes.landingCards}>
            <img className="cryptoIcons" src={balance} alt="no img" />
            <Typography>Use our platform to see your balances</Typography>
          </Card>
        </Grid>
      </div>

      <div className="frequencyQuestion">
        <Grid container xs={12} className={classes.landingContainers}>
          <Grid item xs={12}>
            <Faq />
          </Grid>
        </Grid>
      </div>

      <Link
        activeClass="active"
        to="landing"
        spy={true}
        smooth={true}
        hashSpy={true}
        offset={50}
        duration={500}
        className="toTopButton"
      >
        <Button style={{ color: "#131313cc" }}>up!</Button>
      </Link>
    </Container>
  );
};
export default Landing;