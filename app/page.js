"use client";
import Header from "@/Components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  let router = useRouter();
  router.push("/users");
  return (
    <main className="">
      <Header />
    </main>
  );
}
