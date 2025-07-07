"use client";

import React, { useOptimistic, useTransition } from "react";
import { Button } from "./ui/button";
import { Archive, Loader } from "lucide-react";
import { link } from "../shared/links";

export default function ArchiveButton({ status }: { status: string }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);

  return (
    <Button
      asChild
      variant="secondary"
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          setOptimisticStatus(
            optimisticStatus === "archived" ? "" : "archived"
          );
          window.location.href =
            optimisticStatus === "archived"
              ? link("/applications")
              : `${link("/applications")}?status=archived`;
        });
      }}
    >
      <a
        href={
          optimisticStatus === "archived"
            ? link("/applications")
            : `${link("/applications")}?status=archived`
        }
        className="flex items-center gap-2"
      >
        {isPending ? <Loader /> : <Archive />}
        {optimisticStatus === "archived" ? "Active" : "Archive"}
      </a>
    </Button>
  );
}
