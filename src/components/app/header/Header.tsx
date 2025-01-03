'use client'

import {Heading} from "@chakra-ui/react";
import styles from "./header.module.css"
import {Button} from "@/components/ui/button";
import {Avatar} from "@/components/ui/avatar"
import Link from "next/link";
import usersService from "@/services/users.service";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/components/ui/skeleton";

export default function Header() {

  const {data, isLoading} = useQuery({queryKey: ['me'], queryFn: usersService().getUser})

  return (
    <div className={styles.wrapper}>
      <Heading size="4xl">
        <Link href="/" prefetch={false}>
          NextCRM
        </Link>
      </Heading>
      <Skeleton height="10" loading={isLoading}>
        {data ? (
          <div className={styles.right}>
            <Link href="/profile" prefetch={false} className={styles.avatar}>
              <div>{data.firstName} {data.lastName}</div>
              <Avatar name={`${data.firstName} ${data.lastName}`} src={data.image}/>
            </Link>
          </div>
        ) : (
          <div className={styles.right}>
            <Link href="/auth" prefetch={false}>
              <Button colorPalette="green">Sign Up</Button>
            </Link>
            <Button>Sign In</Button>
          </div>
        )}
      </Skeleton>
    </div>
  )
}
