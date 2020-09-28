import {Marker, Popup} from "react-leaflet";
import {icons} from "./icons";
import React from "react";

export default function MessageMarker(props) {
  return <Marker
      key={props.message._id}
      position={[props.message.latitude, props.message.longitude]} icon={icons.messageIcon}>
    <Popup className="popup" maxHeight={150}>
      <h5><a target="_blank" rel="noopener noreferrer"
             href={"https://www.google.com/search?q=" + props.message.locality_name}>{props.message.locality_name}</a></h5>
      <div className="messages">
        <p><em>{props.message.name}:</em> {props.message.message}</p>
        {
          props.message.otherMessages ? props.message.otherMessages.map(message =>
            <p key={message._id}><em>{message.name}:</em> {message.message}</p>)
            :
            ''
        }
      </div>
    </Popup>
  </Marker>;
}
