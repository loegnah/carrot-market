import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const Forms: NextPage = () => {
  const { register, handleSubmit } = useForm();

  const onValid = () => {
    console.log("is valid");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", { required: true })}
        type="text"
        placeholder="Username"
        minLength={5}
      />
      <input
        {...(register("email"), { required: true })}
        type="email"
        placeholder="Email"
      />
      <input
        {...(register("password"), { required: true })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
};

export default Forms;
