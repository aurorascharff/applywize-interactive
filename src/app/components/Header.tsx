import { link } from "@/app/shared/links";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "./Link";

const Header = () => {
  return (
    <header className="py-5 px-page-side h-20 flex justify-between items-center border-b-1 border-border mb-12">
      {/* left side */}
      <div className="flex items-center gap-8">
        <Link
          href={link("/")}
          className="flex items-center gap-3 font-display font-bold text-3xl"
        >
          <img src="/images/logo.svg" alt="Apply Wize" className="pt-5 -mb-3" />
          <span>Apply Wize</span>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href={link("/applications")}>Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* right side */}
      <nav>
        <ul className="flex items-center gap-7">
          <li>
            <Link href="#">Settings</Link>
          </li>
          <li>
            <a href={link("/user/logout")}>Logout</a>
          </li>
          <li>
            <Avatar>
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
