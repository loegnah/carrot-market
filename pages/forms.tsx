import type { NextPage } from "next";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type LoginForm = {
  username: string;
  password: string;
  email: string;
};

const Forms: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const onValid: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };

  const onInValid: SubmitErrorHandler<LoginForm> = (errors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            value: 5,
            message: "The username should me longer than 5",
          },
        })}
        type="text"
        placeholder="Username"
        className={errors.username && "border-orange-500"}
      />
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Do not use gmail",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Forms;
