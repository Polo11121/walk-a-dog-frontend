import { useState } from "react";
import { Formik } from "formik";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";
import { newPasswordSchema } from "./newPasswordSchema";
import "./NewPassword.scss";
import { useNavigate } from "react-router-dom";

export const NewPassword = () => {
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const switchToLogin = () => navigate("/login");

  return (
    <div className="new-password">
      <div className="new-password__container">
        <Formik
          onSubmit={(values) => {
            setIsOpen(true);
          }}
          validationSchema={newPasswordSchema}
          validateOnMount
          initialValues={{
            newPassword: "",
            oldPassword: "",
            repeatNewPassword: "",
          }}
        >
          {(props) => (
            <>
              <div className="new-password__title">Zmiana hasła</div>
              <Input
                type="password"
                isError={error}
                formikProps={props}
                inputName="oldPassword"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Stare hasło"
              />
              <Input
                isError={error}
                type="password"
                inputName="newPassword"
                formikProps={props}
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Nowe hasło"
              />
              <Input
                type="password"
                isError={error}
                formikProps={props}
                inputName="repeatNewPassword"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Powtórz nowe hasło"
              />
              <Button
                onClick={() => {
                  setError(
                    Boolean(
                      props.errors.oldPassword ||
                        props.errors.repeatNewPassword ||
                        props.errors.newPassword
                    )
                  );
                  props.handleSubmit();
                }}
                title="Zmień hasło"
                type="primary"
                size="L"
              />
            </>
          )}
        </Formik>
      </div>
      {isOpen && (
        <div className="new-password__modal">
          <div className="new-password__modal-content">
            Pomyślnie zmieniono hasło
            <Button
              styles={{ margin: "20px auto 0", width: "80%" }}
              onClick={switchToLogin}
              title="Zaloguj"
              type="primary"
              size="L"
            />
          </div>
        </div>
      )}
    </div>
  );
};