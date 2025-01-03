'use client'

import {Button, Card, Input, Stack} from "@chakra-ui/react"
import {Field} from "@/components/ui/field"

import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {PasswordInput} from "@/components/ui/password-input";
import authService from "@/services/auth.service";
import {useRouter} from "next/navigation";

interface AuthProps {
  goToRegister: () => void
}

export default function Auth(props: AuthProps) {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: () => authService().login(form.userName, form.password),
    onSuccess() {
      push('/')
    }
  })

  const onSubmit = () => {
    mutate()
  }

  return (
    <Card.Root maxW="sm" w="full">
      <Card.Header>
        <Card.Title>Sign in</Card.Title>
        <Card.Description>
          Fill in the form below to sign in
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
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
        <Button variant="plain" onClick={props.goToRegister}>Sign up</Button>
        <Stack justifyContent="flex-end" direction="row" w="full">
          <Button variant="outline">Cancel</Button>
          <Button variant="solid" onClick={onSubmit}>Sign in</Button>
        </Stack>
      </Card.Footer>
    </Card.Root>
  )
}

