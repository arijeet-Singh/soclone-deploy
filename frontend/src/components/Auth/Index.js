import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import GoogleIcon from "@mui/icons-material/Google";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
function Index() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      history.push("/");
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://stackoverflowclone-7c3d3-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({
          displayName: username,
          email: email,
        }),
      }
    );
    console.log(res);
    handleRegister();
  };

  const handleRegister = () => {
    setError("");
    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError("REQUIRED FIELD IS MISSING");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          history.push("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("REQUIRED FIELD IS MISSING");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          history.push("/");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.code);
          setError(err.code);
          setLoading(false);
        });
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="sign-options">
          <div onClick={handleSignInGoogle} className="single-option">
            <GoogleIcon />
            <p>Login with Google</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={createUser}
                  style={{
                    marginTop: "10px",
                  }}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSignIn}
                  style={{
                    marginTop: "10px",
                  }}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Login"}
                </button>
              </>
            )}
            <p
              onClick={() => setRegister(!register)}
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#0095ff",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {register ? "Login" : "Register?"}
            </p>
          </div>
        </div>
        {error !== "" && (
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default Index;
