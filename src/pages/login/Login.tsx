import { Button, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [loginedUser, loading] = useAuthState(auth);

  useEffect(() => {
    if (loginedUser) navigate("/");
  }, [loginedUser]);

  return (
    <main className="Login grid grid-cols-2 h-screen">
      <section className="left bg-gradient-to-r from-blue-500"></section>
      <section className="right m-auto space-y-[32px]">
        <Typography variant="h3" fontWeight={600} textAlign="center">
          Login
        </Typography>

        <Button
          variant="outlined"
          startIcon={<FcGoogle />}
          onClick={GoogleLogin}
        >
          Sign in with Google
        </Button>
      </section>
    </main>
  );
};

export default LoginPage;
