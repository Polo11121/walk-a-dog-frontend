import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import dogAvatar from "assets/logo.png";
import Menu from "@mui/material/Menu";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import { DogType } from "types/Dog.types";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAddDogToSlot } from "api/useAddDogToSlot";
import { useCustomToast } from "hooks/useCustomToast";
import { isInThePast } from "helpers/helpers";
import "./WalkInfoDog.scss";

type WalkInfoDogType = {
  index: number;
  openRemoveDogHandler: (index: number, dogName: string) => void;
  date: Date;
  isOwner: boolean;
  dogInfo: {
    id: string;
    name: string;
    avatar: string;
    isAdded: boolean;
    owner: string;
  };
  dogsInfo: {
    id: string;
    name: string;
    avatar: string;
    isAdded: boolean;
    owner: string;
  }[];
  isAddingBlocked: boolean;
  dogs: DogType[];
  setDogsInfo: Dispatch<
    SetStateAction<
      | {
          id: string;
          name: string;
          avatar: string;
          isAdded: boolean;
          owner: string;
        }[]
      | undefined
    >
  >;
};

const WalkInfoDog = ({
  dogInfo,
  dogs,
  isOwner,
  date,
  openRemoveDogHandler,
  setDogsInfo,
  isAddingBlocked,
  dogsInfo,
  index,
}: WalkInfoDogType) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToDogProfile = () =>
    navigate(`/dog-profile/${dogInfo.owner}/${dogInfo.id}`);

  const handleDogClick = (event: MouseEvent<HTMLDivElement>) => {
    if (dogInfo.isAdded) {
      return goToDogProfile();
    } else if (dogInfo.id && !isInThePast(date)) {
      return handleClose();
    } else if (isAddingBlocked || isInThePast(date)) {
      return null;
    }
    return handleClick(event);
  };

  const onSuccess = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Pies pomyślnie zapisany na spacer !");
    queryClient.invalidateQueries(["slot", id]);
  };

  const { mutate } = useAddDogToSlot(onSuccess);

  const addDogToSlot = () => mutate({ slotId: id, dogId: dogInfo.id, index });

  const removeDogHandler = () => openRemoveDogHandler(index, dogInfo.name);

  return (
    <div className="walk-info-dog">
      <div className="walk-info-dog" onClick={handleDogClick}>
        {dogInfo.id ? (
          <img
            className="walk-info__avatar"
            src={dogInfo.avatar || dogAvatar}
            alt={dogInfo.name}
          />
        ) : (
          <button
            className={
              isAddingBlocked || isInThePast(date)
                ? "walk-info-dog__empty-slot"
                : "walk-info-dog__add-button"
            }
          >
            {isAddingBlocked || isInThePast(date) ? (
              "Wolne miejsce"
            ) : (
              <AddIcon />
            )}
          </button>
        )}
        {(isAddingBlocked && !dogInfo.isAdded) ||
        (isInThePast(date) && !dogInfo.id) ? (
          "Wolne miejsce"
        ) : dogInfo.id ? (
          <>
            {dogInfo.name}
            {!dogInfo.isAdded && (
              <>
                <CheckIcon
                  onClick={addDogToSlot}
                  fontSize="large"
                  color="success"
                />
                <CloseIcon
                  onClick={() =>
                    setDogsInfo([
                      ...dogsInfo.slice(0, index),
                      {
                        id: "",
                        name: "",
                        avatar: "",
                        isAdded: false,
                        owner: "",
                      },
                      ...dogsInfo.slice(index + 1),
                    ])
                  }
                  fontSize="large"
                  color="error"
                />
              </>
            )}
          </>
        ) : (
          "Dodaj psa"
        )}
      </div>
      {dogInfo.isAdded && isOwner && (
        <CloseIcon
          onClick={removeDogHandler}
          fontSize="large"
          color="error"
          style={{ marginBottom: "8px" }}
        />
      )}
      <Menu
        style={{ height: "300px" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {dogs.map(({ name, avatar, id, owner }) => {
          const handleClick = () => {
            setDogsInfo([
              ...dogsInfo.slice(0, index),
              { id: `${id}`, name, avatar, isAdded: false, owner: `${owner}` },
              ...dogsInfo.slice(index + 1),
            ]);
            handleClose();
          };

          return (
            <MenuItem
              key={id}
              style={{ fontSize: "1.5rem" }}
              onClick={handleClick}
            >
              <img
                className="walk-info__menu-avatar"
                src={avatar || dogAvatar}
                alt={name}
              />
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default WalkInfoDog;