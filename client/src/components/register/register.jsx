import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { supabase } from "supabase/supabase";
import { validate } from "./validate";
import useStyles from 'styles';

import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  Grid,
  Card
} from "@material-ui/core";

export const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const [error, setError] = useState({
    email: "",
    password: "",
    passwordValidate: "",
    isError: true,
  });
  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    passwordValidate: "",
  });

  function handleOnChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...data,
        [event.target.name]: event.target.value,
      })
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.password === data.passwordValidate) {
      supabase.auth
        .signUp({
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          const { error } = response;

          if (error) return alert(error.message);

          alert("congratulations your account has been created");
          return history.push("/");
        })
        .catch((err) => err);
    } else {
      alert("Error in Password");
    }
  };

  const back = () => {
    history.push("/");
  };
  useEffect(() => {
    if (error.isError) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }, [error]);

  return (
    <Container maxWidth="sm" className={classes.loginContainer}>
      <Card elevation={3} className={classes.loginCard}>
        <Grid container alignContent="center">
          <Grid item xs={12} >
            <Typography variant="h3" gutterBottom className={classes.loginGridItem}>REGISTER</Typography>
            <form onSubmit={handleSubmit} className={classes.loginForm}>
              <FormControl>
                  <TextField
                    label={error.email === "" ? "Email" : error.email}
                    name="email"
                    type="text"
                    value={data.email}
                    onChange={handleOnChange}
                    color={error.email === "" ? "primary" : "secondary"}
                  />
                  <TextField
                    label={error.password === "" ? "Password" : error.password}
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleOnChange}
                    color={error.password === "" ? "primary" : "secondary"}
                  />
                  <TextField
                    required
                    label={
                      error.passwordValidate === ""
                        ? "Repeat password"
                        : error.passwordValidate
                    }
                    name="passwordValidate"
                    type="password"
                    value={data.passwordValidate}
                    onChange={handleOnChange}
                    color={error.passwordValidate === "" ? "primary" : "secondary"}
                  />
                  <ButtonGroup className={classes.loginGridItem}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={!submit}
                    >
                      Sing up
                    </Button>
                    <Button onClick={back} variant="outlined" color="secondary">
                      Back
                    </Button>
                  </ButtonGroup>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};