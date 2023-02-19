import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { useUserAuth } from "src/context";
import Alert from "@mui/material/Alert";
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserInfo } = useStore(
    (state) => ({
      setUserInfo: state?.setUserInfo,
    }),
    shallow
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await logIn(email, password);
      if (email === "abubakarringim@gmail.com") {
        setUserInfo(true);
      } else {
        setUserInfo(false);
      }
      navigate("/", { replace: true });
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setError("")}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );
}
