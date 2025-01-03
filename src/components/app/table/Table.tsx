import {HStack, IconButton, Skeleton, Stack, Table} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot
} from "@/components/ui/pagination";

import styles from './table.module.css'
import {AiOutlineEye} from "react-icons/ai";

export default function AppTable({data, columns, total, page, pageSize, isLoading, setPage, action}: {
  data: Record<string, any>[],
  columns: Record<string, string>[],
  total: number,
  page: number,
  pageSize: number
  isLoading: boolean
  setPage: (page: number) => void
  action?: (...arg: any) => void
}) {
  return (
    <Skeleton height="md" loading={isLoading}>
      {data && (
        <Stack gap="5">
          <Table.Root
            size="md"
            variant="outline"
            showColumnBorder
          >
            <Table.Header>
              <Table.Row>
                {
                  columns.map((column) => (
                    <Table.ColumnHeader key={column.title}>{column.title}</Table.ColumnHeader>
                  ))
                }
                {!!action && <Table.ColumnHeader/>}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(item => (
                <Table.Row key={item.id}>
                  {columns.map((column) => (
                    <Table.Cell key={column.cell}>
                      <div className={styles.ellipsis}>
                        {item[column.cell]}
                      </div>
                    </Table.Cell>
                  ))}
                  {!!action && (
                    <Table.Cell>
                      <IconButton variant="ghost" className={styles.action} onClick={() => action(item.id)}>
                        <AiOutlineEye size={25}/>
                      </IconButton>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <PaginationRoot
            count={total}
            pageSize={pageSize}
            page={page}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack wrap="wrap">
              <PaginationPrevTrigger/>
              <PaginationItems/>
              <PaginationNextTrigger/>
            </HStack>
          </PaginationRoot>
        </Stack>
      )}
    </Skeleton>
  )
}
