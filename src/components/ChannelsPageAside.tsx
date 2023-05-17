import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import * as styles from "../styles";

const ChannelsPageAside: React.FC = () => {
  return (
    <Box sx={styles.channelsPageAside.itemsBox}>
      <Typography sx={styles.channelsPageAside.item}>
        Избранные каналы
      </Typography>
      <Divider sx={styles.channelsPageAside.divider} />
      <Typography sx={styles.channelsPageAside.item}>
        Ваши каналы
      </Typography>
      <Typography sx={styles.channelsPageAside.item}>
        Публичные каналы
      </Typography>
    </Box>
  );
}

export default ChannelsPageAside;