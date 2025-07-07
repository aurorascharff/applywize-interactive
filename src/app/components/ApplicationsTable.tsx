import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { Badge, badgeVariants } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Prisma } from "@generated/prisma";
import { VariantProps } from "class-variance-authority";
import { link } from "../shared/links";

export type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    status: true;
    company: {
      include: {
        contacts: true;
      };
    };
  };
}>;

export default function ApplicationsTable({
  applications,
}: {
  applications: ApplicationWithRelations[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Salary Range</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>
              <TableCell>
                <Badge
                  variant={
                    application.status.status.toLowerCase() as VariantProps<
                      typeof badgeVariants
                    >["variant"]
                  }
                >
                  {application.status.status}
                </Badge>
              </TableCell>
            </TableCell>
            <TableCell>
              {application.dateApplied?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>{application.jobTitle}</TableCell>
            <TableCell>{application.company.name}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {application.company.contacts[0].firstName
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {application.company.contacts[0].firstName}
              {application.company.contacts[0].lastName}
            </TableCell>
            <TableCell>
              {application.salaryMin}-{application.salaryMax}
            </TableCell>
            <TableCell>
              <a href={link("/applications/:id", { id: application.id })}>
                View
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
