import type { FC } from "react";
import type { ReviewsType } from "types/types";

import {
  Divider,
  Drawer,
  Link,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import MessageXSquare from "@untitled-ui/icons-react/build/esm/MessageXSquare";

import { ReactComponent as GreenTick } from "../assets/githubIcons/greenTick.svg";
import { ReactComponent as RequestedChanges } from "../assets/githubIcons/requestedChanges.svg";
import { ReactComponent as ReviewComments } from "../assets/githubIcons/reviewComments.svg";
import { XCloseButton } from "../customComponents/xCloseButton";
import { colors } from "../styles/colors";

interface ReviewCommentDrawerProps {
  openReviewCommentsDrawer: boolean;
  setOpenReviewCommentsDrawer: any;
  reviews: ReviewsType;
}

export const ReviewCommentDrawer: FC<ReviewCommentDrawerProps> = ({
  openReviewCommentsDrawer,
  setOpenReviewCommentsDrawer,
  reviews,
}) => {
  const handleClose = () => {
    setOpenReviewCommentsDrawer(false);
  };

  return (
    <Drawer
      open={openReviewCommentsDrawer}
      onClose={handleClose}
      anchor="right"
      sx={{ opacity: 0.95 }}
      PaperProps={{
        sx: {
          backgroundColor: colors.dark,
          width: 700,
        },
      }}
    >
      <Stack
        direction="column"
        sx={{
          paddingX: 2,
          paddingY: 6,
          overflowY: "auto",
          maxHeight: "100vh",
          justifyContent: "space-between",
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
              Review Comments
            </Typography>
            <XCloseButton handleClose={handleClose} />
          </Stack>
          <Stack
            direction="row"
            sx={{ justifyContent: "center", paddingBottom: 4 }}
          >
            <Divider />
          </Stack>

          <Stack direction="column" spacing={2}>
            {!reviews.length && (
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  width: "70%",
                  paddingLeft: 2,
                }}
              >
                <Typography sx={{ paddingLeft: 2 }}>
                  No review comments found.
                </Typography>
              </Stack>
            )}

            {reviews.map((review) => {
              const date = new Date(review.submitted_at).toDateString();

              return (
                <Stack
                  key={review.id}
                  direction="column"
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingX: 3,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      width: "100%",
                      justifyContent: "flex-start",
                      alignItems: "flex-end",
                      paddingLeft: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 11, color: colors.grey.light }}>
                      {date}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    {review.state === "APPROVED" ? (
                      <Tooltip title="Approved" placement="left-start" arrow>
                        <Stack sx={{ minWidth: 16, paddingTop: 0.5 }}>
                          <SvgIcon component={GreenTick} />
                        </Stack>
                      </Tooltip>
                    ) : review.state === "CHANGES_REQUESTED" ? (
                      <Tooltip
                        title="Changes requested"
                        placement="left-start"
                        arrow
                      >
                        <Stack sx={{ minWidth: 16, paddingTop: 0.5 }}>
                          <SvgIcon component={RequestedChanges} />
                        </Stack>
                      </Tooltip>
                    ) : review.state === "COMMENTED" ? (
                      <Tooltip title="Commented" placement="left-start" arrow>
                        <Stack sx={{ minWidth: 16, paddingTop: 0.5 }}>
                          <SvgIcon component={ReviewComments} />
                        </Stack>
                      </Tooltip>
                    ) : review.state === "DISMISSED" ? (
                      <Tooltip title="Dismissed" placement="left-start" arrow>
                        <Stack sx={{ minWidth: 16, paddingTop: 0.5 }}>
                          <SvgIcon
                            sx={{
                              color: colors.grey.light,
                              width: 16,
                              height: 16,
                            }}
                          >
                            <MessageXSquare />
                          </SvgIcon>
                        </Stack>
                      </Tooltip>
                    ) : null}
                    <Typography>
                      <Link
                        href={review.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color={colors.blue}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          {review.user.login}
                        </span>
                      </Link>{" "}
                      {review.body ? `commented: ${review.body}` : ""}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};
