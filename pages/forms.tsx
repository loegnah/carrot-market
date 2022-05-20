import type { NextPage } from "next";
import type {
  SubmitErrorHandler,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { useForm } from "react-hook-form";

type LoginForm = {
  username: string;
  password: string;
  email: string;
};

const Forms: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onValid: SubmitHandler<LoginForm> = (data, event) => {
    console.log(data);
    console.log(event);
  };

  const onInValid: SubmitErrorHandler<LoginForm> = (errors, event) => {
    console.log(errors);
    console.log(event);
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
      />
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Forms;
