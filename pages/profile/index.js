import { useState } from "react";
import CMS from "../../CMS";
import { useNotify } from "../../contexts/notification";
import { useLoginUser, useUser } from "../../contexts/user";

const INPUTS = [
  { type: "text", name: "phone" },
  { type: "text", name: "zip_code" },
  { type: "text", name: "street" },
  { type: "text", name: "city" },
];

export default function Profile() {
  const user = useUser();
  const notify = useNotify();
  const loginUser = useLoginUser();
  const [formValues, setFormValues] = useState({
    phone: user?.phone || "",
    zip_code: user?.zip_code || "",
    street: user?.street || "",
    city: user?.city || "",
  });

  function handleChange(e) {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const updatedUser = await CMS.updateUser(user.id, formValues);
      loginUser(updatedUser);

      notify({
        type: "success",
        content: "Successfully updated",
      });
    } catch ({ message }) {
      notify({
        type: "error",
        content: message,
      });
    }
  }

  return (
    <main>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <form onSubmit={onSubmit}>
        {INPUTS.map((props) => (
          <input
            {...props}
            value={formValues[props.name]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
