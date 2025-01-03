'use client'

import {HStack, Heading, Stack, Table} from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

export default function Home() {
  const [pageSize] = useState(10)
  const [page, setPage] = useState(1)

  const incrementPage = () => {
    setPage(page + 1)
  }

  const decrementPage = () => {
    setPage(page - 1)
  }

  const getUsers = async () => {
    const res = await fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${page}`)
    return res.json()
  }

  const {data, isLoading} = useQuery({ queryKey: ['users', page, pageSize], queryFn: getUsers })



  if (isLoading) {
    return <div>is loading</div>
  }

  if (!isLoading && data) {
    return (
      <Stack gap="5">
        <Heading size="xl">Users</Heading>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Username</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Phone</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.users.map((item: {
              id: number,
              username: string,
              email: string,
              phone: string,
            }) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <PaginationRoot count={data.total} pageSize={pageSize} page={page}>
          <HStack wrap="wrap">
            <PaginationPrevTrigger onClick={decrementPage}/>
            <PaginationItems/>
            <PaginationNextTrigger onClick={incrementPage}/>
          </HStack>
        </PaginationRoot>
      </Stack>
    )
  }

  return <div>no data</div>
}

