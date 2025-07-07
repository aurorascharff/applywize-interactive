"use client";

import { Contact } from "@generated/prisma";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";
import { deleteContact } from "../pages/applications/functions";

export default function ContactCard({
  contact,
  isEditable = true,
}: {
  contact: Contact;
  isEditable?: boolean;
}) {
  const handleDelete = async () => {
    const result = await deleteContact(contact.id);
    if (result.error) {
      toast.error("Yikes! Couldn't delete.");
    } else {
      toast.success("Contact deleted");
    }
  };

  return (
    <div className="relative flex items-center gap-4 mb-6 group/card">
      {isEditable && (
        <div className="absolute top-2 -left-[37px] pr-5">
          <button
            formAction={handleDelete}
            role="button"
            className="hidden group-hover/card:block text-white fill-current rounded-full bg-destructive p-1 hover:bg-black cursor-pointer"
          >
            <X className="size-4 " />
          </button>
        </div>
      )}
      <div>
        <Avatar className="size-10">
          <AvatarFallback>{contact.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {contact.firstName} {contact.lastName}
        </p>
        <p className="text-sm text-zinc-500">{contact.role}</p>
      </div>
      <div>
        <a href={`mailto:${contact.email}`}>
          <Mail className="size-4" />
        </a>
      </div>
    </div>
  );
}
