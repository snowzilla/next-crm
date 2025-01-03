'use client'

import {useMutation, useQuery} from "@tanstack/react-query";
import {Input, Stack} from "@chakra-ui/react";

import {useEffect, useState} from "react";
import {RiArrowLeftLine} from "react-icons/ri";
import Link from "next/link";

import {Field} from "@/components/ui/field";
import {Button} from "@/components/ui/button";

import usersService from "@/services/users.service";
import authService from "@/services/auth.service";
import {useRouter} from "next/navigation";

export default function profilePage() {
  const [isDisabledForm, toggleDisabledForm] = useState(true)
  const [form, setForm] = useState<{ [key: string]: string }>({
    firstName: '',
    lastName: '',
    age: '',
    email: ''
  })

  const router = useRouter()

  const {data} = useQuery({queryKey: ['me'], queryFn: usersService().getUser})

  const fields: Record<string, string>[] = [
    {
      title: "First Name",
      field: "firstName",
    },
    {
      title: "Last Name",
      field: "lastName",
    },
    {
      title: "Age",
      field: "age",
    },
    {
      title: "Email",
      field: "email",
    }
  ]

  const {mutate} = useMutation({
    mutationKey: ['profile'],
    mutationFn: () => usersService().changeProfile(data.id, form),
    onSuccess() {
      toggleDisabledForm(true)
    }
  })

  const {mutate: exit} = useMutation({
    mutationKey: ['profile'],
    mutationFn: () => authService().logout(),
    onSuccess: () => router.push('/auth')
  })

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        email: data.email
      });
    }
  }, [data])

  if (data) {
    return (
      <Stack gap="10">
        <Stack justifyContent="space-between" direction="row">
          <Link href="/" prefetch={false}>
            <Button>
              <RiArrowLeftLine/>
            </Button>
          </Link>
          <Button onClick={() => exit()}>Logout</Button>
        </Stack>
        <Stack gap="4" w="full">
          {fields.map((field, i) => {
            return (
              <Field label={field.title} key={i}>
                <Input
                  value={form[field.field]}
                  onChange={e => setForm({
                    ...form,
                    [field.field]: e.target.value
                  })}
                  disabled={isDisabledForm}
                />
              </Field>
            )
          })}
        </Stack>
        <Stack justifyContent="flex-end" direction="row">
          {isDisabledForm ?
            <Button onClick={() => toggleDisabledForm(false)}>Change</Button>
            :
            <Button onClick={() => mutate()}>Save</Button>
          }
        </Stack>
      </Stack>
    )
  }
}

