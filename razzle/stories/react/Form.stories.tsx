import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import {
  Button,
  Form,
  FormValidation,
  Label,
  TextInput
} from '../../src/client/react/components';

storiesOf('Components|Form', module)
  .addDecorator(StoryRouter())
  .add('with input fields', () => (
    <Form onSubmit={action('Submitted')}>
      <Label htmlFor="name">
        <p>Name</p>
        <TextInput
          id="name"
          placeholder="Name"
          onChange={action('change input')}
        />
      </Label>
      <Label htmlFor="email">
        <p>Email</p>
        <TextInput
          id="email"
          placeholder="Email"
          onChange={action('change input')}
        />
      </Label>
      <Button type="submit">Submit</Button>
    </Form>
  ))
  .add('with errors', () => (
    <Form onSubmit={action('Submitted')}>
      <Label htmlFor="name">
        <FormValidation submit={true} errors={['Required']} valid={false}>
          <p>Name</p>
          <TextInput id="name" onChange={action('change input')} />
        </FormValidation>
      </Label>
      <Label htmlFor="email">
        <FormValidation
          submit={true}
          errors={['Must have domain', 'Must have @ sign']}
          valid={false}
        >
          <p>Email</p>
          <TextInput id="email" onChange={action('change input')} />
        </FormValidation>
      </Label>
      <Button type="submit" disabled>
        Submit
      </Button>
    </Form>
  ))
  .add('with default values', () => (
    <Form onSubmit={action('Submitted')}>
      <Label htmlFor="name">
        <p>Name</p>
        <TextInput
          id="name"
          defaultValue="jDoe"
          onChange={action('change input')}
        />
      </Label>
      <Label htmlFor="email">
        <p>Email</p>
        <TextInput
          id="email"
          defaultValue="jDoe@email.com"
          onChange={action('change input')}
        />
      </Label>
      <Button type="submit">Submit</Button>
    </Form>
  ));
