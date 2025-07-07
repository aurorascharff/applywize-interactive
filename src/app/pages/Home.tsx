import { RequestInfo } from "rwsdk/worker";
import { link } from "../shared/links";

export function Home({ ctx }: RequestInfo) {
  return (
    <div>
      <p>
        {ctx.user?.username
          ? `You are logged in as user ${ctx.user.username}`
          : "You are not logged in"}
      </p>
      Go to{" "}
      <a className="text-primary" href={link("/applications")}>
        Applications
      </a>{" "}
      to see your applications.
    </div>
  );
}
