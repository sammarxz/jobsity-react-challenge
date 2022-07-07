import { Link } from "react-router-dom";

import { BellRing } from "lucide-react";

import { Avatar } from "./";

function Header() {
  return (
    <header className="my-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-1.5">
        <BellRing className="w-8 h-8 text-blue-500" />
        <h1 className="text-xl font-bold">RemindMe</h1>
      </Link>
      <Avatar size={10} name="Samuel" />
    </header>
  );
}

export { Header };
