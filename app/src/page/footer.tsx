import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";

import hoverImage from "../assets/hover-image.png";
import image from "../assets/profile-pic.png";
import { FacebookIcon } from "../assets/socialIcons/facebookIcon";
import { InstaIcon } from "../assets/socialIcons/instaIcon";
import { LinkedInIcon } from "../assets/socialIcons/linkedInIcon";
import { YoutubeIcon } from "../assets/socialIcons/youtubeIcon";
import { colors } from "../styles/colors";

export const Footer = () => {
  return (
    <Stack
      direction="column"
      spacing={7}
      sx={{
        backgroundColor: colors.dark,
        justifyContent: "center",
        alignItems: "center",
        paddingX: { xs: 2, lg: 15 },
        paddingTop: { xs: 5, lg: 10 },
        paddingBottom: 5,
        minHeight: "200px",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 1, lg: 10 }}
        sx={{
          alignItems: "center",
          justifyContent: { xs: "flex-start", lg: "center" },
          width: "100%",
          height: { xs: "fit-content", lg: 140 },
          paddingLeft: 5,
        }}
      >
        <Stack
          direction="column"
          spacing={3}
          sx={{ justifyContent: "flex-end", height: "100%", width: "100%" }}
        >
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Stack
              sx={{ position: "relative", height: "100px", width: "100px" }}
            >
              <Box
                component="img"
                alt="Anime Mo"
                src={image}
                sx={{
                  border: `1px solid ${colors.chalk}`,
                  borderRadius: "10px",
                  height: "100px",
                  opacity: 1,
                  position: "absolute",
                  "&:hover": {
                    opacity: 0,
                  },
                }}
              />
              <Box
                component="img"
                alt="Non-Anime Mo"
                src={hoverImage}
                sx={{
                  border: `1px solid ${colors.chalk}`,
                  borderRadius: "10px",
                  height: "100px",
                  transition: "1.5s ease-in-out",
                  opacity: 0,
                  position: "absolute",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Stack>

            <Stack
              direction="column"
              spacing={1}
              sx={{ height: "100%", justifyContent: "space-between" }}
            >
              <Stack
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingTop: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    transition: "color 0.5s ease-in-out",
                    "&:hover": { color: colors.lime },
                  }}
                >
                  Mo was here
                </Typography>
              </Stack>
              <Stack
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  paddingBottom: 1,
                }}
              >
                <Typography variant="body2" noWrap>
                  Just so you have to see my cartoon face every time you use
                  this app (
                  <Tooltip title="lol" placement="top">
                    <span>笑</span>
                  </Tooltip>
                  ).
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.75}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 0.5,
                height: 17,
              }}
            >
              <Divider />
            </Stack>
            <FacebookIcon />
            <LinkedInIcon />
            <InstaIcon />
            <YoutubeIcon />
            <Stack
              direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 0.5,
                height: 17,
              }}
            >
              <Divider />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          sx={{
            height: "100%",
          }}
        >
          <Divider orientation="vertical" variant="middle" flexItem />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "flex-end", height: "80%", width: "100%" }}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{ alignItems: "flex-start", width: "100%", paddingTop: 1 }}
          >
            <Stack>
              <Typography variant="body2" sx={{ fontSize: 15 }} noWrap>
                <a
                  href="https://open.spotify.com/track/68OYaxreTGmAuD9cAztr2p"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "text",
                  }}
                >
                  貴方しか 貴方の傷はわからないんだ 口を開けて歌い出す 今
                  貴方は風を食む
                </a>
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 15 }} noWrap>
                <a
                  href="https://open.spotify.com/track/7HIfg6iQgXkVEUMHAAXW2d"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "text",
                  }}
                >
                  ずっと叶えたかった夢が貴方を縛っていないだろうか?
                  それを諦めていいと言える勇気が少しでもあったら
                </a>
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 15 }} noWrap>
                <a
                  href="https://open.spotify.com/track/3PPiVAQnUOQ2w0EcpxJhIK"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "text",
                  }}
                >
                  僕は貴方の思い出に ただの記憶に 今、左様なら 僕は都落ち
                </a>
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 15 }} noWrap>
                <a
                  href="https://open.spotify.com/track/5eY7692tmgHB9dbmq6wa2M"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "text",
                  }}
                >
                  晴れに晴れ 花よ咲け 咲いて春のせい あの雲も越えてゆけ
                  遠くまだ遠くまで
                </a>
              </Typography>
              <Stack
                direction="row"
                sx={{ justifyContent: "flex-end", width: "100%" }}
              >
                <Typography variant="body2" sx={{ fontSize: 15 }}>
                  - ヨルシカ
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
              <Typography variant="body2" sx={{ fontSize: 10 }}>
                FakeBranding © 2024
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="row">
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Designed by{" "}
          <a
            href="https://open.spotify.com/track/5yZCsL6wNFtUNAomeWTQJZ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "none",
              cursor: "text",
            }}
          >
            Mo
          </a>{" "}
          ｜ Built for{" "}
          <a
            href="https://squarekicker.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.lime }}
          >
            SquareKicker
          </a>
        </Typography>
      </Stack>
    </Stack>
  );
};
