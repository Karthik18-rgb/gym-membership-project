const Loader = ({ message = 'Loading...' }) => <div className="skeleton-loader" role="status" aria-label={message}><div className="loader-orbit"><span /><span /><span /></div><p>{message}</p><div className="skeleton-lines"><i /><i /><i /></div></div>;
export default Loader;
