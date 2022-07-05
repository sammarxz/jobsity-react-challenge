import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Link to="/calendar" className="flex items-center gap-2">
        <span>Go To Calendar</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default App;
