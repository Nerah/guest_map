import {useForm} from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

export default function MessageForm(props) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name: '',
      message: ''
    }
  });

  return <Form onSubmit={handleSubmit(props.onSubmit)}>
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control
          ref={register({required: true, minLength: 3, maxLength: 50})}
          name="name" id="name"
          placeholder="Enter your name"/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Message</Form.Label>
      <Form.Control
          ref={register({required: true, minLength: 1, maxLength: 100})}
          name="message" id="name"
          as="textarea" placeholder="Enter your message"/>
    </Form.Group>
    <Button type="submit" variant="primary"
            disabled={!props.haveUsersLocation || !formState.isValid}>Send</Button>
  </Form>;
}
