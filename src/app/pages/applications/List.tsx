import { db } from "@/db";

export default async function List() {
  const applications = await db.application.findMany();

  return (
    <div>
      <pre>{JSON.stringify(applications, null, 2)}</pre>
    </div>
  );
}
