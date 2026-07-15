import { Link } from 'react-router-dom';

const PageHeader = ({ eyebrow, title, description, action, actionTo }) => (
  <div className="page-heading">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
    {action ? (
      actionTo ? <Link to={actionTo} className="btn btn-primary">{action}</Link> : <div>{action}</div>
    ) : null}
  </div>
);

export default PageHeader;
