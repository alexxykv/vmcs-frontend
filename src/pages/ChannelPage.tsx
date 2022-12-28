import { Box, Button } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import { ChannelPageProps } from '../interfaces/props';

const ChannelPage: React.FC<ChannelPageProps> = ({ title }) => {
  return (
    <Layout title={title}>
      <Button style={{ width: '100px', backgroundColor: 'white' }}>Создать Meeting</Button>
      <Button style={{ width: '100px', backgroundColor: 'white' }}>Зайти в Meeting</Button>
    </Layout>
  )
}

export default ChannelPage;