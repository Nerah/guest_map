import Card from "react-bootstrap/Card";
import React from "react";
import MessageForm from "./MessageForm";
import Loader from "./Loader";

export default function MessageFormCard(props) {
  return (
      <Card body className="message-form">
        <Card.Title>Welcome to GuestMap!</Card.Title>
        <Card.Text>Leave a message with your location!</Card.Text>
        <Card.Text>Thanks for stopping by!</Card.Text>
        {
          !props.sentMessage && !props.sendingMessage && props.haveUsersLocation ?
              <MessageForm onSubmit={props.onSubmit} haveUsersLocation={props.haveUsersLocation}/>
              :
              props.sendingMessage || !props.haveUsersLocation ?
                  <Loader/>
                  :
                  <Card.Text>Thanks for submitting a message!</Card.Text>
        }
      </Card>
  );
}
