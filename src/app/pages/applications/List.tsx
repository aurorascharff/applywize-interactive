import ApplicationsTable from "@/app/components/ApplicationsTable";
import { Button } from "@/app/components/ui/button";
import InteriorLayout from "@/app/layouts/InteriorLayout";
import { db } from "@/db";

export default async function List() {
  const applications = await db.application.findMany();

  return (
    <div>
      <InteriorLayout>
        <>
          <div className="px-page-side flex justify-between items-center">
            <h1 className="page-title">All Applications</h1>
            <div>
              <Button asChild>
                <a href="#">New Application</a>
              </Button>
            </div>
          </div>
          <ApplicationsTable />
          <pre>{JSON.stringify(applications, null, 2)}</pre>
        </>
      </InteriorLayout>
    </div>
  );
}
