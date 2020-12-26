import { useState } from "react";
import CMS from "../../../cms";
import { useNotify } from "../../../contexts/notification";
import { useSetUser } from "../../../contexts/user";
import Modal from "../../ui/Modal";

const IDENTIFIER = "identifier";
const PASSWORD = "password";

const initialFormValues = {
  [IDENTIFIER]: "",
  [PASSWORD]: "",
};

export default function LoginModal({ close }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const setUser = useSetUser();
  const notify = useNotify();

  function handleChange(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { jwt, user } = await CMS.login(formValues);
      CMS.setJWT(jwt);
      setUser(user);
      close();
    } catch (e) {
      notify({
        type: "error",
        content: e.message,
      });
    }
  }

  return (
    <Modal close={close}>
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <input
          name={IDENTIFIER}
          type="text"
          value={formValues[IDENTIFIER]}
          onChange={handleChange}
        />
        <input
          name={PASSWORD}
          type="password"
          value={formValues[PASSWORD]}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </Modal>
  );
}
