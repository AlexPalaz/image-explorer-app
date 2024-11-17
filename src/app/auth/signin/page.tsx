import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Form from "next/form";
import FormMessage from "@/components/FormMessage/FormMessage";
import { signIn } from "./actions";

export default function SignIn() {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center">
      <div className="bg-amber-100 p-4 rounded max-w-[320px]">
        <h2 className="font-semibold text-center">
          Sign in
        </h2>
        <Form
          className="flex flex-col gap-4 mt-4 justify-center items-center"
          action={signIn}
        >
          <input
            type="email"
            name="email"
            className="rounded shadow py-2 px-4 text-xs"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            className="rounded shadow py-2 text-xs px-4"
            placeholder="Password"
            required
          />
          <SubmitButton label="Sign in" />
          <FormMessage type="error" />
        </Form>
      </div>
    </div>
  );
}
