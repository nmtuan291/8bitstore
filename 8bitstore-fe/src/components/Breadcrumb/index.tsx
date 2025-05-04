import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import "./Breadcrumb.scss"

const Breadcrumb: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="breadcrumb-container">
      {breadcrumbs.map(({match, breadcrumb}, index) => {
        return (
          <React.Fragment key={match.pathname}>
            <Link to={match.pathname} className="breadcrumb-link">{breadcrumb}</Link>
            {index < breadcrumbs.length - 1 && " / "}
          </React.Fragment>
        );
      })}
    </div>
  )
}

export default Breadcrumb;