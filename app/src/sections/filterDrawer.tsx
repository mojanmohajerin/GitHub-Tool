import type { ChangeEvent, FC } from "react";
import type { UsersFilterType, UsersSummaryType, UsersType } from "types/types";

import {
  Box,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationMessage from "@untitled-ui/icons-react/build/esm/NotificationMessage";
import { useEffect, useState } from "react";

import { getUsers } from "../api/getUsers";
import { getUsersSummary } from "../api/getUsersSummary";
import { UserReviewSummary } from "../components/userReviewSummary";
import { UsersFilter } from "../components/usersFilter";
import { CustomButton } from "../customComponents/customButton";
import { CustomCheckbox } from "../customComponents/customCheckbox";
import { XCloseButton } from "../customComponents/xCloseButton";
import { colors } from "../styles/colors";

interface FilterDrawerProps {
  openFilterDrawer: boolean;
  setOpenFilterDrawer: any;
  dependabotFilter: boolean;
  setDependabotFilter: any;
  draftFilter: boolean;
  setDraftFilter: any;
  usersFilter: UsersFilterType;
  setUsersFilter: any;
  dependabots: boolean;
}

export const FilterDrawer: FC<FilterDrawerProps> = ({
  openFilterDrawer,
  setOpenFilterDrawer,
  dependabotFilter,
  setDependabotFilter,
  draftFilter,
  setDraftFilter,
  usersFilter,
  setUsersFilter,
  dependabots,
}) => {
  const [users, setUsers] = useState<UsersType | null>(null);
  const [usersSummary, setUsersSummary] = useState<UsersSummaryType | null>(
    null
  );
  const [filterDrawerLoading, setFilterDrawerLoading] = useState(true);
  const [hoverOverUser, setHoverOverUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
      setFilterDrawerLoading(false);
    };
    if (users === null) fetchUsers();
  }, [openFilterDrawer, users]);

  useEffect(() => {
    const fetchUsersSummary = async () => {
      const usersSummaryData = await getUsersSummary();
      setUsersSummary(usersSummaryData);
    };
    if (usersSummary === null) fetchUsersSummary();
  }, [openFilterDrawer, usersSummary]);

  const handleDependabotChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDependabotFilter(event.target.checked);
  };

  const handleDraftChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftFilter(event.target.checked);
  };

  const handleClearFilters = () => {
    setDependabotFilter(false);
    setUsersFilter([]);
    setHoverOverUser("");
  };

  const handleClose = () => {
    setOpenFilterDrawer(false);
  };

  return (
    <Drawer
      open={openFilterDrawer}
      onClose={handleClose}
      sx={{ opacity: 0.95, scrollbarColor: `${colors.chalk} ${colors.dark}` }}
      PaperProps={{
        sx: {
          backgroundColor: colors.dark,
        },
      }}
    >
      <Stack
        direction="column"
        sx={{
          justifyContent: "space-between",
          height: "100vh",
          minWidth: 600,
          paddingX: 2,
          paddingTop: 6,
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", paddingBottom: 2 }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                textTransform: "uppercase",
                paddingLeft: 4,
              }}
            >
              Filter
            </Typography>
            <XCloseButton handleClose={handleClose} />
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Divider />
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              width: "225px",
              alignItems: "center",
              paddingLeft: 2,
              position: "relative",
            }}
          >
            {dependabots && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 147,
                }}
              >
                <Tooltip
                  title="Dependabots are available"
                  placement="top-start"
                  arrow
                >
                  <SvgIcon sx={{ color: colors.lime, height: 12 }}>
                    <NotificationMessage />
                  </SvgIcon>
                </Tooltip>
              </Box>
            )}
            <Typography>Only Dependabots</Typography>
            <CustomCheckbox
              checked={dependabotFilter}
              onChange={handleDependabotChange}
            />
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Divider />
          </Stack>

          <Stack
            direction="row"
            sx={{
              opacity: dependabotFilter ? 0.25 : 1,
              pointerEvents: dependabotFilter ? "none" : "initial",
              justifyContent: "space-between",
              width: "225px",
              alignItems: "center",
              paddingLeft: 2,
            }}
          >
            <Typography>Hide Draft Pull Requests</Typography>
            <CustomCheckbox
              checked={draftFilter}
              onChange={handleDraftChange}
            />
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Divider />
          </Stack>

          <Stack
            direction="column"
            spacing={2}
            sx={{
              opacity: dependabotFilter ? 0.25 : 1,
              pointerEvents: dependabotFilter ? "none" : "initial",
              paddingLeft: 2,
            }}
          >
            <Typography>Filter by user:</Typography>

            <Stack
              direction="row"
              spacing={5.5}
              sx={{
                maxWidth: "86.5%",
                justifyContent: "flex-end",
              }}
            >
              <Typography sx={{ fontSize: 12 }}>Assignee</Typography>
              <Typography sx={{ fontSize: 12 }}>Reviewer</Typography>
            </Stack>

            {!filterDrawerLoading && (
              <UsersFilter
                usersFilter={usersFilter}
                setUsersFilter={setUsersFilter}
                users={users}
                setHoverOverUser={setHoverOverUser}
              />
            )}
            <Stack
              direction="row"
              sx={{ justifyContent: "flex-end", width: "95%" }}
            >
              <Typography sx={{ fontSize: 12 }}>
                * Hover over a user to view a summary of reviews
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack sx={{ marginY: 5 }}>
          <UserReviewSummary
            hoverOverUser={hoverOverUser}
            usersSummary={usersSummary}
            avatarUrl={
              users?.find((user) => user.login === hoverOverUser)?.avatar_url
            }
          />
        </Stack>

        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-end",
            paddingRight: 4,
            paddingBottom: { xs: 2, lg: 6 },
          }}
        >
          <CustomButton text="Clear Filters" handleClick={handleClearFilters} />
        </Stack>
      </Stack>
    </Drawer>
  );
};
