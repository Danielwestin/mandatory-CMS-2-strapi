import { useRouter } from "next/router";
import { useState } from "react";
import CMS from "../../cms";
import { useNotify } from "../../contexts/notification";
import { useLoginUser } from "../../contexts/user";

const inputs = [
  { name: "username", type: "text", required: true, label: "Username" },
  { name: "email", type: "email", required: true, label: "Email" },
  { name: "password", type: "password", required: true, label: "Password" },
  { name: "street", type: "text", required: false, label: "Street" },
  { name: "zip_code", type: "text", required: false, label: "Zip Code" },
  { name: "city", type: "text", required: false, label: "City" },
  { name: "phone", type: "text", required: false, label: "Phone No." },
];

const initialFormValues = inputs.reduce((acc, { name }) => {
  acc[name] = "";
  return acc;
}, {});

export default function Registration() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const loginUser = useLoginUser();
  const notify = useNotify();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formValues);

    try {
      const { jwt, user } = await CMS.register(formValues);

      CMS.setJWT(jwt);
      loginUser(user);

      notify({ type: "success", content: "Account successfully created." });
      router.push("/");
    } catch (e) {
      notify({ type: "error", content: e.message });
    }
  }

  function handleChange(e) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <main>
      <h1>register new account</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map(({ name, type, required, label }) => (
          <label htmlFor={name} key={name}>
            {label}
            <input
              id={name}
              type={type}
              required={required}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
