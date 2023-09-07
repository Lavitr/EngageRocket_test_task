"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./page.module.css";

async function fetchProjects(page = 1) {
  const data = await fetch(`https://reqres.in/api/users?page=${page}`);
  const rez = await data.json();
  return rez;
}

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [fetchedPages, setFetchedPages] = useState([1]);

  // // Queries
  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ["user", page],
    queryFn: () => fetchProjects(page),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  console.log({ status, data, error, isFetching, isPreviousData });

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
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Page {data?.page}</h1>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul>
            {data?.data?.map((user) => (
              <li key={user.id}>
                {user.id} {user.first_name} {user.last_name} {user.email}
              </li>
            ))}
          </ul>
        )}
        <div>
          <div>Current Page: {page}</div>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 0}
          >
            Previous Page
          </button>{" "}
          <button
            onClick={() =>
              setPage((old) => (data?.page < data?.total_pages ? old + 1 : old))
            }
            disabled={!(data?.page < data?.total_pages)}
          >
            Next Page
          </button>
        </div>
      </div>
    </main>
  );
}
