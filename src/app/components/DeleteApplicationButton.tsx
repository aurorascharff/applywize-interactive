"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Check, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { deleteApplication } from "@/app/pages/applications/functions";

export default function DeleteApplicationButton({
  applicationId,
}: {
  applicationId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteApplication(applicationId);
    if (result.success) {
      toast.success("Application deleted successfully");
      window.location.href = "/applications";
    } else {
      console.error(result.error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-destructive fill-current">
          <Trash /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="py-12 px-14">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-destructive text-3xl font-bold mb-2">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            This will permanently delete the application and any related
            companies and contacts. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Nevermind
          </Button>
          <form action={handleDelete}>
            <Button
              variant="destructive"
              role="submit"
              className="fill-current"
            >
              <Check />
              Yes, Delete It
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
