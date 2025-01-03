'use client'

import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {Input, Skeleton, Stack} from "@chakra-ui/react";
import {Field} from "@/components/ui/field";
import {useEffect, useState} from "react";
import productsService from "@/services/products.service";

export default function User() {
  const [isDisabledForm, toggleDisabledForm] = useState(true)
  const [form, setForm] = useState<{ [key: string]: string }>({
    title: '',
    description: '',
    category: '',
    price: ''
  })

  const params = useParams<{ id: string }>()

  const {data, isLoading} = useQuery({
    queryKey: ['product'],
    queryFn: () => productsService().getProductById(params.id),
    gcTime: 0,
  })

  const fields: Record<string, string>[] = [
    {
      title: 'Title',
      field: 'title'
    },
    {
      title: 'Description',
      field: 'description'
    },
    {
      title: 'Category',
      field: 'category'
    },
    {
      title: 'Price',
      field: 'price'
    }
  ]

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price
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

