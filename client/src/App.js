import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import Joi from 'joi';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './App.css';

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

let userIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

let messageIcon = L.icon({
  iconUrl: 'data:image/png;base64,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',
  iconSize: [41, 41],
  iconAnchor: [20.5, 41],
  popupAnchor: [0, -41]
});

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  message: Joi.string().min(1).max(100).required()
});

// TODO Production url
const API_URL = window.location.hostname === 'localhost' ?
    'http://localhost:5000/api/v1/messages'
    : 'production-url-messages'

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

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name: '',
      message: ''
    }
  });

  const onSubmit = data => {
    setState({
      ...state,
      sendingMessage: true
    });

    const userMessage = {
      name: data.name,
      message: data.message
    };
    const result = schema.validate(userMessage);

    if (!result.error && state.haveUsersLocation) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          ...userMessage,
          latitude: state.location.lat,
          longitude: state.location.lng
        })
      })
          .then(res => res.json())
          .then(message => {
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
    fetch(API_URL)
        .then(res => res.json())
        .then(messages => setMessages(messages));

    navigator.geolocation.getCurrentPosition(function(position) {
      setState({
        ...state,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 13,
        haveUsersLocation: true
      });
    }, () => {
      fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            setState({
              ...state,
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              zoom: 13,
              haveUsersLocation: false
            });
          })
    });
  }, []);

  return (
      <div>
        <Map className="map" center={state.location} zoom={state.zoom}>
          <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            state.haveUsersLocation &&
            <Marker position={state.location} icon={userIcon}/>
          }
          {
            messages.map(message => (
                  <Marker
                      key={message._id}
                      position={[message.latitude, message.longitude]} icon={messageIcon}>
                    <Popup>
                      <em>{message.name}:</em>  {message.message}
                    </Popup>
                  </Marker>
              )
            )
          }
        </Map>
        <Card body className="message-form">
          <Card.Title>Welcome to GuestMap!</Card.Title>
          <Card.Text>Leave a message with your location!</Card.Text>
          <Card.Text>Thanks for stopping by!</Card.Text>
          {
            !state.sentMessage && !state.sendingMessage && state.haveUsersLocation ?
                <Form onSubmit={ handleSubmit(onSubmit) }>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        ref={ register({ required: true, minLength: 3, maxLength: 50 }) }
                        name="name" id="name"
                        placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        ref={ register({ required: true, minLength: 1, maxLength: 100 }) }
                        name="message" id="name"
                        as="textarea" placeholder="Enter your message" />
                  </Form.Group>
                  <Button type="submit" variant="primary"
                          disabled={ !state.haveUsersLocation || !formState.isValid }>Send</Button>
                </Form> :
                state.sendingMessage || !state.haveUsersLocation ?
                    <video autoPlay loop src="https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4"/>
                    : <Card.Text>Thanks for submitting a message!</Card.Text>
          }
        </Card>
      </div>
  );
}

export default App;
