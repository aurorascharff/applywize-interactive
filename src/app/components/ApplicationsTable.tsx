import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function ApplicationsTable() {
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
        <TableRow>
          <TableCell>
            <TableCell>
              <Badge variant="new">New</Badge>
            </TableCell>
          </TableCell>
          <TableCell>April 15, 2025</TableCell>
          <TableCell>Software Engineer</TableCell>
          <TableCell>RedwoodJS</TableCell>
          <TableCell className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            John Doe
          </TableCell>
          <TableCell>$150,000-$250,000</TableCell>
          <TableCell>
            <a href="#">View</a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
