'use client'

import {useQuery} from "@tanstack/react-query";
import usersService from "@/services/users.service";
import {useParams} from "next/navigation";
import {Input, Skeleton, Stack} from "@chakra-ui/react";
import {Field} from "@/components/ui/field";
import {useEffect, useState} from "react";

export default function User() {
  const [isDisabledForm, toggleDisabledForm] = useState(true)
  const [form, setForm] = useState<{ [key: string]: string }>({
    firstName: '',
    lastName: '',
    age: '',
    email: ''
  })

  const params = useParams<{ id: string }>()

  const {data, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: () => usersService().getUserById(params.id),
    gcTime: 0,
  })

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

  return (
    <Skeleton height="md" loading={isLoading}>
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
    </Skeleton>
  )
}

