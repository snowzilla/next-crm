'use client'

import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import usersService from "@/services/users.service";
import AppTable from "@/components/app/table/Table";
import {useRouter} from "next/navigation";

export default function Users() {
  const [page, setPage] = useState(1)

  const { push } = useRouter()

  const {data, isLoading} = useQuery({
    queryKey: ['users', page],
    queryFn: () => usersService().getUsers(5, page)
  })

  const columns = [
    {
      title: 'Username',
      cell: 'username'
    },
    {
      title: 'Email',
      cell: 'email'
    },
    {
      title: 'Phone',
      cell: 'phone'
    },
  ]

  return (
    <AppTable
      data={data?.users}
      columns={columns}
      total={data?.total}
      page={page}
      pageSize={5}
      isLoading={isLoading}
      setPage={setPage}
      action={(id: number) => push(`/dashboard/users/${id}`)}
    />
  )
}

