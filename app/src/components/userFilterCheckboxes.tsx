import type { ChangeEvent, FC } from "react";
import type { UsersFilterType } from "types/types";

import { CustomCheckbox } from "../customComponents/customCheckbox";

interface UserFilterCheckboxesProps {
  user: { login: string };
  usersFilter: UsersFilterType;
  setUsersFilter: (usersFilter: UsersFilterType) => void;
}

export const UserFilterCheckboxes: FC<UserFilterCheckboxesProps> = ({
  user,
  usersFilter,
  setUsersFilter,
}) => {
  const handleUserChange = (
    event: ChangeEvent<HTMLInputElement>,
    user: { login: string }
  ) => {
    if ((event.target as HTMLInputElement).checked) {
      setUsersFilter([
        ...usersFilter,
        { name: user.login, assignee: true, reviewer: true },
      ]);
    }
    if (!(event.target as HTMLInputElement).checked) {
      setUsersFilter(
        usersFilter.filter((filteredUser) => filteredUser.name !== user.login)
      );
    }
  };

  const toggleAssignee = (user: { login: string }) => {
    if (usersFilter.some((filteredUser) => filteredUser.name === user.login)) {
      if (
        !usersFilter.find((filteredUser) => filteredUser.name === user.login)
          ?.reviewer
      ) {
        setUsersFilter(
          usersFilter.filter((filteredUser) => filteredUser.name !== user.login)
        );
      } else {
        setUsersFilter(
          usersFilter.map((filteredUser) => {
            if (filteredUser.name === user.login) {
              return {
                name: user.login,
                assignee: !filteredUser.assignee,
                reviewer: filteredUser.reviewer,
              };
            }
            return filteredUser;
          })
        );
      }
    } else {
      setUsersFilter([
        ...usersFilter,
        { name: user.login, assignee: true, reviewer: false },
      ]);
    }
  };

  const toggleReviewer = (user: { login: string }) => {
    if (usersFilter.some((filteredUser) => filteredUser.name === user.login)) {
      if (
        !usersFilter.find((filteredUser) => filteredUser.name === user.login)
          ?.assignee
      ) {
        setUsersFilter(
          usersFilter.filter((filteredUser) => filteredUser.name !== user.login)
        );
      } else {
        setUsersFilter(
          usersFilter.map((filteredUser) => {
            if (filteredUser.name === user.login) {
              return {
                name: user.login,
                assignee: filteredUser.assignee,
                reviewer: !filteredUser.reviewer,
              };
            }
            return filteredUser;
          })
        );
      }
    } else {
      setUsersFilter([
        ...usersFilter,
        { name: user.login, assignee: false, reviewer: true },
      ]);
    }
  };

  return (
    <>
      <CustomCheckbox
        checked={usersFilter.some(
          (filteredUser) =>
            filteredUser.name === user.login &&
            filteredUser.assignee &&
            filteredUser.reviewer
        )}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleUserChange(event, user)
        }
        height={24}
      />
      <CustomCheckbox
        checked={usersFilter.some(
          (filteredUser) =>
            filteredUser.name === user.login && filteredUser.assignee
        )}
        onChange={() => toggleAssignee(user)}
        height={20}
      />
      <CustomCheckbox
        checked={usersFilter.some(
          (filteredUser) =>
            filteredUser.name === user.login && filteredUser.reviewer
        )}
        onChange={() => toggleReviewer(user)}
        height={20}
      />
    </>
  );
};
