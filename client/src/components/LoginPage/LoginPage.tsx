import { baseBackendUrl, baseBackendUrlV2 } from "@/secrets/env";
import { webPass, webUser } from "@/secrets/webAuth";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const defaultTheme = createTheme();

  // const handleLogin = () => {
  //   if (username === webUser && password === webPass) {
  //     onLogin(true);
  //   } else {
  //     setError('Invalid username or password');
  //   }
  // };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseBackendUrlV2}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Username or password does not match");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.reload();
    } catch (error) {
      setError("Username or password does not match");
      console.error(error);
    }
  };

  const handleDemoLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseBackendUrlV2}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "demoUser",
          password: "oliverSydney!",
        }),
      });
      if (!response.ok) {
        throw new Error("Username or password does not match");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.reload();
    } catch (error) {
      setError("Username or password does not match");
      console.error(error);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Box
            component="form"
            onSubmit={handleDemoLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              color="warning"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              demo user login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
