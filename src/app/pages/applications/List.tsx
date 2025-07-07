import ApplicationsTable from "@/app/components/ApplicationsTable";
import Skeleton from "@/app/components/Skeleton";
import { Button } from "@/app/components/ui/button";
import { link } from "@/app/shared/links";
import { db, Prisma } from "@/db";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import ArchiveButton from "@/app/components/ArchiveButton";

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

  return (
    <div className="px-page-side">
      <div className="flex justify-between items-center mb-5">
        <h1 className="page-title">All Applications</h1>
        <div>
          <NewApplicationButton />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="text-center text-sm text-muted-foreground mb-8">
            Loading applications...
          </div>
        }
      >
        <ListContent status={status || ""} />
      </Suspense>
      <div className="flex justify-between items-center mb-10">
        <ArchiveButton status={status || ""} />
        <NewApplicationButton />
      </div>
    </div>
  );
}

async function ListContent({ status }: { status: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
    <div className="mb-8">
      {applications.length > 0 ? (
        <ApplicationsTable applications={applications} />
      ) : (
        <div className="text-center text-sm text-muted-foreground">
          No applications found
        </div>
      )}
    </div>
  );
}

const NewApplicationButton = () => {
  return (
    <Button asChild>
      <a href={link("/applications/new")}>
        <Plus />
        New Application
      </a>
    </Button>
  );
};
