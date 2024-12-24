import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
const LoginPage = () => {
  const navigate = useNavigate();
  const { googleSignIn, userLogin, setUser } = useContext(AuthContext);
  const emailRef = useRef();
  const [error, setError] = useState({});
  const location = useLocation();
  const handleGoogleSignIn = () => {
    googleSignIn();

    navigate(location?.state ? location.state : "/");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error(err.message);
      });
  };
  return (
    <div>
      <h1 className="text-center font-bold text-xl md:text-5xl pt-12">
        Login to Your Lingo <br /> Bingo Account
      </h1>
      <div className="md:w-2/4 mx-auto">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-mono">Email</span>
            </label>
            <input
              type="email"
              ref={emailRef}
              name="email"
              placeholder="email"
              className="font-mono input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-mono">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="font-mono input input-bordered"
              required
            />
            {error.login && (
              <label className="label text-sm text-red-600">
                {error.login}
              </label>
            )}

            <label className="label">
              <span
                className="label-text-alt font-mono link link-hover text-xl cursor-pointer"
                onClick={() => {
                  const email = emailRef.current.value;
                  navigate("/forgetPassword", { state: { email } });
                }}
              >
                Forgot password?
              </span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary bg-[#9660ea] text-white text-xl font-mono">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center w-2/4 mx-auto">
        <h1 className="font-mono text-base">
          New to To Do Task?{" "}
          <Link to="/register" className="underline text-[#9660ea]">
            Register Now
          </Link>{" "}
        </h1>
      </div>
      <div className="flex justify-center mt-4">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default LoginPage;
