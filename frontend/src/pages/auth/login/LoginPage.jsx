// import libraries from react
import { useState } from "react";
import { Link } from "react-router-dom";

// import svg component
import XSvg from "../../../components/svgs/X";

// import style libraries,
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

// import react query library
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Create loginpage
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // create query client
  const queryClient = useQueryClient();

  // destructure useMutation hook -> Manipulate data
  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    // use mutation hook
    mutationFn: async ({ username, password }) => {
      // mutation funciton with callback and try-catch block
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json(); // destructure data

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        // handle error
        throw new Error(error);
      }
    },
    onSuccess: () => {
      // onSuccess data
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  // handle submit function where user will click the button
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData); // login mutation with form data
  };

  // handle input change function with event (e)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // User Interface
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
