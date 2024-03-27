import { useForm } from "react-hook-form";

const Register = () => {
  const { register, watch, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-3 px-2 font-normal"
            {...register("firstName", { required: "This feild is required" })}
          />
        </label>

        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-3 px-2 font-normal"
            {...register("lastName", { required: "This feild is required" })}
          />
        </label>
      </div>

      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-3 px-2 font-normal"
          {...register("email", { required: "This feild is required" })}
        />
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-3 px-2 font-normal"
          {...register("password", {
            required: "This feild is required",
            minLength: {
              value: 6,
              message: "Password must me at least 6 characters",
            },
          })}
        />
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-3 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
      </label>

      <span className="">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-sm"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
