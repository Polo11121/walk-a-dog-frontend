import EditIcon from "@mui/icons-material/Edit";
import { Card, Button } from "Components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDogs } from "api/useGetUserDogs";
import { useOwner } from "hooks/useOwner";
import { useGetUser } from "api/useGetUser";
import "./DogProfiles.scss";

export const DogProfiles = () => {
  const { id } = useParams();
  const { user } = useGetUser(id);
  const { dogs } = useGetUserDogs(id);
  const isOwner = useOwner();
  const navigate = useNavigate();

  const switchToAddDog = () => navigate("/add-dog");

  return (
    <div className="dog-profiles">
      <div className="dog-profiles__title">
        {isOwner ? "Moje Psie profile" : `Psie profile ${user.username}`}
      </div>
      <div className="dog-profiles__list">
        {dogs?.map(({ name, breed, avatar, id, owner }) => (
          <Card
            ownerId={owner}
            id={id}
            key={id}
            name={name}
            subTitle={breed}
            imageSrc={avatar}
          />
        ))}
      </div>
      {isOwner && (
        <div className="dog-profiles__add-button">
          <Button
            styles={{
              marginLeft: "auto",
              marginBottom: "40px",
            }}
            onClick={switchToAddDog}
            Icon={<EditIcon />}
            size="M"
            title="Dodaj profil"
            type="default"
          />
        </div>
      )}
    </div>
  );
};
