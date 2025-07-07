import { Contact } from "@generated/prisma";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Mail } from "lucide-react";

export default function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="flex items-center gap-4 mb-6">
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
