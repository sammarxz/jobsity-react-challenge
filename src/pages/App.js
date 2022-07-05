import { Link } from "react-router-dom";

import { ArrowRightIcon } from "@heroicons/react/solid";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link to="/calendar" className="flex items-center gap-2">
        <span>Go To Calendar</span>
        <ArrowRightIcon className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default App;
