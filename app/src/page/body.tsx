import type { Dispatch, FC, SetStateAction } from "react";

import { Box, CircularProgress } from "@mui/material";
import { Suspense, useState } from "react";

import { CustomModal } from "../customComponents/customModal";
import { DisplayRepos } from "../sections/displayRepos";
import { FilterDrawer } from "../sections/filterDrawer";
import { colors } from "../styles/colors";

interface BodyProps {
  openFilterDrawer: boolean;
  setOpenFilterDrawer: Dispatch<SetStateAction<boolean>>;
}

export const Body: FC<BodyProps> = ({
  openFilterDrawer,
  setOpenFilterDrawer,
}) => {
  const [dependabotFilter, setDependabotFilter] = useState<boolean>(false);
  const [draftFilter, setDraftFilter] = useState(false);
  const [usersFilter, setUsersFilter] = useState([]);
  const [dependabots, setDependabots] = useState(false);

  return (
    <Box
      sx={{
        color: colors.charcoal,
        backgroundColor: colors.body,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: "calc(13px + 1vmin",
        padding: 1,
      }}
    >
      <FilterDrawer
        openFilterDrawer={openFilterDrawer}
        setOpenFilterDrawer={setOpenFilterDrawer}
        dependabotFilter={dependabotFilter}
        setDependabotFilter={setDependabotFilter}
        draftFilter={draftFilter}
        setDraftFilter={setDraftFilter}
        usersFilter={usersFilter}
        setUsersFilter={setUsersFilter}
        dependabots={dependabots}
      />
      <CustomModal />
      <Box
        sx={{
          paddingLeft: "20px",
        }}
      >
        <Suspense
          fallback={
            <CircularProgress
              size={80}
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.7,
              }}
            />
          }
        >
          <DisplayRepos
            dependabotFilter={dependabotFilter}
            draftFilter={draftFilter}
            usersFilter={usersFilter}
            setDependabots={setDependabots}
          />
        </Suspense>
      </Box>
    </Box>
  );
};
