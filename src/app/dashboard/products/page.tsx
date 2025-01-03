'use client'

import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import productsService from "@/services/products.service";
import AppTable from "@/components/app/table/Table";
import {useRouter} from "next/navigation";

export default function Products() {
  const [page, setPage] = useState(1)

  const { push } = useRouter()

  const {data, isLoading} = useQuery({
    queryKey: ['products', page],
    queryFn: () => productsService().getProducts(5, page)
  })

  const columns = [
    {
      title: 'Title',
      cell: 'title'
    },
    {
      title: 'Category',
      cell: 'category'
    },
    {
      title: 'Rating',
      cell: 'rating'
    },
    {
      title: 'Price',
      cell: 'price'
    }
  ]

  return (
    <AppTable
      data={data?.products}
      columns={columns}
      total={data?.total}
      page={page}
      pageSize={5}
      isLoading={isLoading}
      setPage={setPage}
      action={(id: number) => push(`/dashboard/products/${id}`)}
    />
  )
}

