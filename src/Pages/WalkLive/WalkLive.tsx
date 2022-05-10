import { useEffect, useState } from "react";
import userAvatar from "assets/user-avatar.png";
import map from "assets/map.png";
import { useGoBack } from "hooks/useGoBack";
import { useGetSlot } from "api/useGetSlot";
import { useNavigate, useParams } from "react-router-dom";
import dogAvatar from "assets/logo.png";
import { useGetUser } from "api/useGetUser";
import { useGetDogs } from "api/useGetDogs";
import { useQueryClient } from "react-query";
import useAuthContext from "hooks/context/AuthContext";
import { DogType } from "types/Dog.types";
import { getFormattedHour } from "helpers/helpers";
import { Button } from "Components";
import { useCustomToast } from "hooks/useCustomToast";
import { useChangeSlotStatus } from "api/useChangeSlotStatus";
import "./WalkLive.scss";

export const WalkLive = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { userId } = useAuthContext();
  const { slot } = useGetSlot(id);
  const { user } = useGetUser(`${slot?.trainer}`);
  const { dogs } = useGetDogs();
  const [dogsInfo, setDogsInfo] = useState<
    {
      id: string;
      name: string;
      avatar: string;
      isAdded: boolean;
      owner: string;
    }[]
  >();

  const goBack = useGoBack();

  const getFilteredDog = (filteredDog: DogType | undefined) =>
    filteredDog
      ? {
          id: `${filteredDog.id}`,
          avatar: filteredDog.avatar,
          name: filteredDog.name,
          isAdded: true,
          owner: `${filteredDog.owner}`,
        }
      : {
          id: "",
          avatar: "",
          name: "",
          isAdded: false,
          owner: "",
        };

  useEffect(() => {
    if (dogs && slot) {
      const filteredDog1 = dogs.find(({ id }) => id === slot.dog1);

      const filteredDog2 = dogs.find(({ id }) => id === slot.dog2);

      const filteredDog3 = dogs.find(({ id }) => id === slot.dog3);

      setDogsInfo([
        getFilteredDog(filteredDog1),
        getFilteredDog(filteredDog2),
        getFilteredDog(filteredDog3),
      ]);
    }
  }, [dogs, slot]);

  const onSuccessChangeSlotStatus = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomToast("Zakończono spacer!");
    queryClient.invalidateQueries(["slot", id]);
    navigate(`/trainer-info/${slot?.trainer}/walks`);
  };

  const { mutate: changeSlotStatus } = useChangeSlotStatus(
    onSuccessChangeSlotStatus
  );

  const endWalkHandler = () =>
    changeSlotStatus({ id: `${slot?.id}`, status: "zakończony" });

  const goToTrainer = () => navigate(`/user-profile/${slot?.trainer}`);

  const goToDog1 = () =>
    dogsInfo &&
    navigate(`/dog-profile/${dogsInfo[0].owner}/${dogsInfo[0].owner}`);
  const goToDog2 = () =>
    dogsInfo &&
    navigate(`/dog-profile/${dogsInfo[1].owner}/${dogsInfo[1].owner}`);
  const goToDog3 = () =>
    dogsInfo &&
    navigate(`/dog-profile/${dogsInfo[2].owner}/${dogsInfo[2].owner}`);

  return (
    <div className="walk-live">
      <div className="walk-live__title">Podgląd</div>
      <div
        onClick={goToTrainer}
        style={{ marginBottom: "10px" }}
        className="walk-live__box"
      >
        <img
          className="walk-live__avatar"
          src={user?.avatar || userAvatar}
          alt={user?.username}
        />
        <span>{user?.username}</span>
      </div>
      <div className="walk-live__avatars">
        {dogsInfo && dogsInfo[0]?.id && (
          <div onClick={goToDog1} className="walk-live__box">
            <img
              className="walk-live__avatar"
              src={(dogsInfo && dogsInfo[0]?.avatar) || dogAvatar}
              alt={dogsInfo && dogsInfo[0]?.name}
            />
            <span>{dogsInfo[0]?.name}</span>
          </div>
        )}
        {dogsInfo && dogsInfo[1]?.id && (
          <div onClick={goToDog2} className="walk-live__box">
            <img
              className="walk-live__avatar"
              src={(dogsInfo && dogsInfo[1]?.avatar) || dogAvatar}
              alt={dogsInfo && dogsInfo[1]?.name}
            />
            <span>{dogsInfo[1]?.name}</span>
          </div>
        )}
        {dogsInfo && dogsInfo[2]?.id && (
          <div onClick={goToDog3} className="walk-live__box">
            <img
              className="walk-live__avatar"
              src={(dogsInfo && dogsInfo[2]?.avatar) || dogAvatar}
              alt={dogsInfo && dogsInfo[2]?.name}
            />
            <span>{dogsInfo[2]?.name}</span>
          </div>
        )}
      </div>
      <div className="walk-live__time">
        W trakcie: {slot?.time_from && getFormattedHour(slot?.time_from)} -{" "}
        {slot?.time_to && getFormattedHour(slot?.time_to)}
      </div>
      <div className="walk-live__map">
        <div className="walk-live__map-content">
          <img className="walk-live__map-icon" src={map} alt="" />
          <h1 className="walk-live__map-text">Mapa</h1>
        </div>
      </div>
      {userId === (slot?.trainer as unknown as string) && (
        <Button
          styles={{ margin: " 0  auto 40px" }}
          onClick={endWalkHandler}
          size="XL"
          title="Zakończ"
          type="primary"
        />
      )}

      <div style={{ width: "90%" }}>
        <Button
          styles={{ marginLeft: "auto", marginBottom: "40px" }}
          size="M"
          onClick={goBack}
          title="Powrót"
          type="default"
        />
      </div>
    </div>
  );
};