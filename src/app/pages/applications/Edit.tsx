import InteriorLayout from "@/app/layouts/InteriorLayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { db } from "@/db";
import { RequestInfo } from "rwsdk/worker";
import { link } from "@/app/shared/links";
import EditApplicationForm from "@/app/components/EditApplicationForm";

export default async function New({ params, ctx }: RequestInfo) {
  const application = await db.application.findUnique({
    where: {
      id: params.id,
    },
    include: {
      status: true,
      company: {
        include: {
          contacts: true,
        },
      },
    },
  });
  const statuses = await db.applicationStatus.findMany();

  if (!application) {
    throw new Error("Application not found");
  }

  return (
    <InteriorLayout>
      <div className="breadcrumbs">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={link("/applications/:id", { id: application?.id ?? "" })}
              >
                {application?.jobTitle} at {application?.company?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Application</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-page-side pb-6 mb-8 border-b-1 border-border">
        <h1 className="page-title">Edit {application?.jobTitle}</h1>
        <p className="page-description">
          Edit the details of this job application.
        </p>
      </div>
      <EditApplicationForm application={application} statuses={statuses} />
    </InteriorLayout>
  );
}
