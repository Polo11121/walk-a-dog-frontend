import axios from "axios";
import { useQuery } from "react-query";
import { UserType } from "types/User.types";

type UseGetUserType = {
  user: UserType;
  isLoading: boolean;
};

export const useGetUser = (userId?: string | null): UseGetUserType => {
  const getUser = () =>
    axios
      .get(`http://127.0.0.1:8000/api/user/${userId}/`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery(["user", `${userId}`], getUser, {
    enabled: Boolean(userId),
  });

  return { user: data, isLoading };
};
