import React, {useEffect, useState} from 'react';

import { Map, TileLayer } from 'react-leaflet';

import './App.css';

import MessageMarker from "./MessageMarker";
import MessageFormCard from "./MessageFormCard";

import { schemas } from "./schemas";
import {getLocation, getMessages, sendMessage} from "./API";

function App() {
  const [state, setState] = useState({
    location: {
      lat: 51.505,
      lng: -0.09
    },
    zoom: 2,
    haveUsersLocation: false,
    sendingMessage: false,
    sentMessage: false
  });

  const [messages, setMessages] = useState([]);

  const onSubmit = data => {
    const userMessage = {
      name: data.name,
      message: data.message
    };
    const result = schemas.basicMessage.validate(userMessage);

    if (!result.error && state.haveUsersLocation) {
      setState({
        ...state,
        sendingMessage: true
      });

      const message = {
        ...userMessage,
        latitude: state.location.lat,
        longitude: state.location.lng
      }

      sendMessage(message)
          .then(() => {
            setTimeout(() => {
              setState({
                ...state,
                sendingMessage: false,
                sentMessage: true
              });
            }, 4000);
          });
    }
  }

  useEffect(() => {
    getMessages()
        .then(messages => setMessages(messages));

    getLocation()
        .then(location => {
          setState(prevState => {
            return {
              ...prevState,
              location,
              zoom: 13,
              haveUsersLocation: true
            };
          });
    })
  }, []);

  return (
      <div>
        <Map className="map" center={state.location} zoom={state.zoom}>
          <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            messages.map(message => <MessageMarker key={message._id} message={message}/>)
          }
        </Map>
        <MessageFormCard
            sentMessage={ state.sentMessage }
            sendingMessage={ state.sendingMessage }
            haveUsersLocation={ state.haveUsersLocation }
            onSubmit={ onSubmit }/>
      </div>
  );
}

export default App;
