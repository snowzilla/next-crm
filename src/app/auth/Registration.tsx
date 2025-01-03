'use client'

import {Button, Card, Input, Stack} from "@chakra-ui/react"
import {Field} from "@/components/ui/field"

import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {PasswordInput} from "@/components/ui/password-input";
import authService from "@/services/auth.service";

interface IRegistrationProps {
  goToAuth: () => void
}

export default function Registration(props: IRegistrationProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const {mutate} = useMutation({
    mutationKey: ['auth'],
    mutationFn: () => authService().register(
      form.firstName,
      form.lastName,
      form.userName,
      form.password,
    )
  })

  const onSubmit = () => {
    mutate()
  }

  return (
    <Card.Root maxW="sm" w="full">
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
        <Card.Description>
          Fill in the form below to create an account
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field label="First name">
            <Input
              value={form.firstName}
              onChange={e => {
                setForm({
                  ...form,
                  firstName: e.target.value
                });
              }}
            />
          </Field>
          <Field label="Last name">
            <Input
              value={form.lastName}
              onChange={e => {
                setForm({
                  ...form,
                  lastName: e.target.value
                });
              }}
            />
          </Field>
          <Field label="Username">
            <Input
              value={form.userName}
              onChange={e => {
                setForm({
                  ...form,
                  userName: e.target.value
                });
              }}
            />
          </Field>
          <Field label="Password">
            <PasswordInput
              value={form.password}
              onChange={e => {
                setForm({
                  ...form,
                  password: e.target.value
                });
              }}
            />
          </Field>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Button variant="plain" onClick={props.goToAuth}>Sign in</Button>
        <Stack justifyContent="flex-end" direction="row" w="full">
          <Button variant="outline">Cancel</Button>
          <Button variant="solid" onClick={onSubmit}>Sign up</Button>
        </Stack>
      </Card.Footer>
    </Card.Root>
  )
}

