import ApplicationsTable from "@/app/components/ApplicationsTable";
import Link from "@/app/components/Link";
import { Button } from "@/app/components/ui/button";
import { link } from "@/app/shared/links";
import { db, Prisma } from "@/db";
import { Archive, Plus } from "lucide-react";

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

export default async function List({ request }: { request: Request }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  const applications = await db.application.findMany({
    include: {
      company: {
        include: {
          contacts: true,
        },
      },
      status: true,
    },
    where: {
      archived: status === "archived" ? true : false,
    },
  });

  return (
    <div className="px-page-side">
      <div className="flex justify-between items-center mb-5">
        <h1 className="page-title">All Applications</h1>
        <div>
          <Button asChild>
            <Link href={link("/applications/new")}>
              <Plus />
              New Application
            </Link>
          </Button>
        </div>
      </div>
      <div className="mb-8">
        {applications.length > 0 ? (
          <ApplicationsTable applications={applications} />
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No applications found
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-10">
        <Button asChild variant="secondary">
          {status === "archived" ? (
            <Link href={`${link("/applications")}`}>
              <Archive />
              Active
            </Link>
          ) : (
            <Link href={`${link("/applications")}?status=archived`}>
              <Archive />
              Archive
            </Link>
          )}
        </Button>
        <Button asChild>
          <Link href={link("/applications/new")}>
            <Plus />
            New Application
          </Link>
        </Button>
      </div>
    </div>
  );
}
