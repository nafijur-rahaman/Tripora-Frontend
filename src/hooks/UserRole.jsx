import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useApi } from "./UseApi";

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { get } = useApi();

  const { data: role = "customer", isLoading: roleLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email, // only fetch if user exists
    queryFn: async () => {
      const res = await get(`/user-info?email=${user.email}`);
      return res?.data?.role || "customer";
    },
    staleTime: 1000 * 60 * 5, // 5 min
    cacheTime: 1000 * 60 * 10, // 10 min
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
