import InteriorLayout from "@/app/layouts/InteriorLayout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import ApplicationForm from "@/app/components/ApplicationForm";
import { db } from "@/db";
import { RequestInfo } from "rwsdk/worker";
import { link } from "@/app/shared/links";
import Link from "@/app/components/Link";

export default async function New({ ctx }: RequestInfo) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const statuses = await db.applicationStatus.findMany();
  const contacts = await db.contact.findMany({
    where: {
      companyId: null,
      userId: ctx.user?.id || "",
    },
  });

  return (
    <>
      <div className="breadcrumbs">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={link("/applications")}>Applications</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add an Application</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-page-side pb-6 mb-8 border-b-1 border-border">
        <h1 className="page-title">New Application</h1>
        <p className="page-description">Create a new application</p>
      </div>
      <ApplicationForm contacts={contacts} statuses={statuses} />
    </>
  );
}
