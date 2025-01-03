import Link from "next/link";

import styles from "./sidebar.module.css"
import {usePathname} from "next/navigation";


export default function Sidebar() {
  const pathname = usePathname()

  const routers = [
    {
      id: 1,
      path: "/dashboard/users",
      name: "Users",
    },
    {
      id: 2,
      path: "/dashboard/products",
      name: "Products",
    },
    {
      id: 3,
      path: "/dashboard/posts",
      name: "Posts",
    }
  ]

  return(
    <div className={styles.wrapper}>
      {routers.map((item) => (
        <Link
          href={item.path}
          key={item.id}
          className={`${styles.link} ${pathname.includes(item.path) ? styles.active : ''}`}
          prefetch={false}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
