import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../utils/useAuth.jsx';
import { appRoutes, apiRoutes } from '../routes.js';
import ChannelsBox from '../components/ChannelBox.jsx';
import MessagesBox from '../components/MessagesBox.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import ModalComponent from '../components/Modals/index.jsx';

const getAuthHeader = (currentUser) => {
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

const RootPage = () => {
  const auth = useAuth();
  const headers = getAuthHeader(auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(apiRoutes.dataPath(), { headers });
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(channelsActions.changeChannel(data.currentChannelId));
        dispatch(messagesActions.addMessages(data.messages));
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          auth.logOut();
          return;
        }
        throw error;
      }
    };
    fetchData();
  }, [dispatch, auth, headers]);

  return (
    auth.user
      ? (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 flex-md-row bg-white">
            <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
              <ChannelsBox />
            </Col>
            <Col className="p-0 h-100">
              <MessagesBox />
            </Col>
          </Row>
          <ModalComponent />
        </Container>
      ) : (
        <Navigate to={appRoutes.loginForm} replace />
      )
  );
};

export default RootPage;
