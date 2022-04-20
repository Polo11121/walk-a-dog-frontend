import { useState } from "react";
import { Formik } from "formik";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { Button } from "../../Components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "../../Components/Input/Input";
import { manageDogProfileSchema } from "./manageDogProfilSchema";
import "./ManageDogProfile.scss";

export const ManageDogProfile = () => {
  const [error, setError] = useState(false);
  const [image, setImage] = useState<ImageType[]>([]);

  const onChange = (imageList: ImageListType) => {
    if (imageList) {
      setImage(imageList);
    }
  };

  const avatar = image[0]?.data_url;

  return (
    <div className="manage-dog-profile">
      <Formik
        validationSchema={manageDogProfileSchema}
        onSubmit={(values) => {
          alert("elo");
        }}
        validateOnMount
        initialValues={{
          dogName: "",
          race: "",
          age: "",
          weight: "",
        }}
      >
        {(props) => (
          <>
            <div className="manage-dog-profile__title">Stwórz profil psa</div>
            <div className="manage-dog-profile__choose-photo">
              <ImageUploading
                value={image}
                onChange={onChange}
                dataURLKey="data_url"
              >
                {({ onImageUpload }) => (
                  <>
                    <div
                      onClick={onImageUpload}
                      className="manage-dog-profile__choose-photo-container"
                    >
                      {avatar ? (
                        <img
                          className="manage-dog-profile__choose-photo-container"
                          src={avatar}
                          alt="avatar"
                        />
                      ) : (
                        <AddIcon fontSize="large" />
                      )}
                    </div>
                    <div
                      onClick={onImageUpload}
                      className="manage-dog-profile__choose-photo-text"
                    >
                      Dodaj Zdjęcie
                    </div>
                  </>
                )}
              </ImageUploading>
            </div>
            <div className="manage-dog-profile__container">
              <Input
                isError={error}
                formikProps={props}
                inputName="dogName"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Nazwa psa"
              />
              <Input
                isError={error}
                formikProps={props}
                inputName="race"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Rasa"
              />
              <Input
                isError={error}
                inputName="age"
                formikProps={props}
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Wiek (lata)"
              />
              <Input
                isError={error}
                formikProps={props}
                inputName="weight"
                styles={{ marginBottom: "1.5rem" }}
                placeholder="Waga (kg)"
              />
            </div>
            <div className="dog-profile__buttons">
              <Button
                styles={{ width: "140px" }}
                size="S"
                title="Dodaj zalecenia"
                type="default"
              />
              <Button
                styles={{ width: "140px" }}
                onClick={() => {
                  setError(
                    Boolean(
                      props.errors.dogName ||
                        props.errors.weight ||
                        props.errors.age ||
                        props.errors.race
                    )
                  );
                  props.handleSubmit();
                }}
                size="S"
                title="Zapisz"
                type="default"
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};