import type { Dispatch, FC, SetStateAction } from "react";
import type { UsersFilterType, UsersType } from "types/types";

import { List, Stack, Typography } from "@mui/material";

import { UserFilterCheckboxes } from "./userFilterCheckboxes";

interface UsersFilterProps {
  usersFilter: UsersFilterType;
  setUsersFilter: (usersFilter: UsersFilterType) => void;
  users: UsersType | null;
  setHoverOverUser: Dispatch<SetStateAction<string>>;
}

export const UsersFilter: FC<UsersFilterProps> = ({
  usersFilter,
  setUsersFilter,
  users,
  setHoverOverUser,
}) => {
  return (
    <List sx={{ paddingLeft: 4, paddingY: 0 }}>
      {users &&
        users.map((user) => {
          return (
            <Stack
              key={user.id}
              direction="row"
              sx={{
                maxWidth: "85%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: 0,
              }}
              onMouseOver={() => setHoverOverUser(user.login)}
            >
              <Stack direction="row" spacing={1}>
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%" }}
                />
                <Typography>{user.login}</Typography>
              </Stack>
              <Stack direction="row" spacing={7}>
                <UserFilterCheckboxes
                  user={user}
                  usersFilter={usersFilter}
                  setUsersFilter={setUsersFilter}
                />
              </Stack>
            </Stack>
          );
        })}
    </List>
  );
};
