'use client'

import Header from "@/components/app/header/Header";

import styles from "./layout.module.css"

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header/>
      <div className={styles.children}>
        {children}
      </div>
    </>
  );
}
