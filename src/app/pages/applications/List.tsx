import ApplicationsTable from "@/app/components/ApplicationsTable";
import { Button } from "@/app/components/ui/button";
import InteriorLayout from "@/app/layouts/InteriorLayout";
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
            <a href={link("/applications/new")}>
              <Plus />
              New Application
            </a>
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
            <a href={`${link("/applications")}`}>
              <Archive />
              Active
            </a>
          ) : (
            <a href={`${link("/applications")}?status=archived`}>
              <Archive />
              Archive
            </a>
          )}
        </Button>
        <Button asChild>
          <a href={link("/applications/new")}>
            <Plus />
            New Application
          </a>
        </Button>
      </div>
    </div>
  );
}
