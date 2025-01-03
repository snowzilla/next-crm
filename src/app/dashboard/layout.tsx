'use client'

import Header from "@/components/app/header/Header";
import Sidebar from "@/components/app/sidebar/Sidebar";

import styles from "./layout.module.css"
import {useParams, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {RiArrowLeftLine} from "react-icons/ri";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const params = useParams()
  const {back} = useRouter()

  return (
    <>
      <Header/>
      <div className={styles.content}>
        <Sidebar/>
        <div className={styles.children}>
          {Object.keys(params).length ? (
            <Button onClick={() => back()} className={styles.back}>
              <RiArrowLeftLine/>
            </Button>
          ) : <></>}
          {children}
        </div>
      </div>
    </>
  );
}
