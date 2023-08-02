import { Outlet } from "react-router-dom";

export default function Root() {
  return (    
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Outlet />
        </div>
      </div>
    </div>
    );
  }