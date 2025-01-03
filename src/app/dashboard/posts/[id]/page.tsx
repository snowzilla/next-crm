'use client'

import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {Input, Skeleton, Stack} from "@chakra-ui/react";
import {Field} from "@/components/ui/field";
import {useEffect, useState} from "react";
import postsService from "@/services/posts.service";

export default function User() {
  const [isDisabledForm, toggleDisabledForm] = useState(true)
  const [form, setForm] = useState<{ [key: string]: string }>({
    title: '',
    body: '',
  })

  const params = useParams<{id: string}>()

  const {data, isLoading} = useQuery({
    queryKey: ['post'],
    queryFn: () => postsService().getPostById(params.id),
    gcTime: 0,
  })

  const fields: Record<string, string>[] = [
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Body",
      field: "body",
    },
  ]

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        body: data.body,
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

