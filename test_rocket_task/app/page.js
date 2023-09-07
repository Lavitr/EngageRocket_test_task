"use client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./page.module.css";
import UsersTable from "@/src/UsersTable";
import ButtonsBlock from "@/src/ButtonsBlock";

async function fetchProjects(page = 1) {
  const data = await fetch(`https://reqres.in/api/users?page=${page}`);
  const rez = await data.json();
  return rez;
}

export default function Home() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [fetchedPages, setFetchedPages] = useState([1]);

  const { status, data, error } = useQuery({
    queryKey: ["user", page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.page < data?.total_pages && !fetchedPages[page + 1]) {
      setFetchedPages([...fetchedPages, page + 1]);
      queryClient.prefetchQuery({
        queryKey: ["user", page + 1],
        queryFn: () => fetchProjects(page + 1),
      });
    }
  }, [data, page, queryClient]);

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          <UsersTable data={data} />
        )}
        {data ? (
          <ButtonsBlock
            page={data.page}
            total_pages={data.total_pages}
            setPage={setPage}
          />
        ) : null}
      </div>
    </div>
  );
}
