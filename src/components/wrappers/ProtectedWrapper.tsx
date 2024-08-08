import React from "react";
import { UserRoles } from "../../models";
import { useAppSelector } from "../../state/hooks";

interface IProtectedWrapperProps {
  children: React.ReactNode;
  roles: UserRoles[];
}

const ProtectedWrapper: React.FC<IProtectedWrapperProps> = ({ children, roles }) => {
  const user = useAppSelector((state) => state.global.user);

  if (!user || !roles.includes(user?.role)) return;

  return <>{children}</>;
};

export default ProtectedWrapper;
