'use client'

import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import postsService from "@/services/posts.service";
import AppTable from "@/components/app/table/Table";
import {useRouter} from "next/navigation";

export default function Posts() {
  const [page, setPage] = useState(1)

  const { push } = useRouter()

  const {data, isLoading} = useQuery({
    queryKey: ['posts', page],
    queryFn: () => postsService().getPosts(5, page)
  })

  const columns = [
    {
      title: 'Title',
      cell: 'title'
    },
    {
      title: 'Body',
      cell: 'body'
    },
    {
      title: 'Views',
      cell: 'views',
    },
  ]

  return (
    <AppTable
      data={data?.posts}
      columns={columns}
      total={data?.total}
      page={page}
      pageSize={5}
      isLoading={isLoading}
      setPage={setPage}
      action={(id: number) => push(`/dashboard/posts/${id}`)}
    />
  )
}

