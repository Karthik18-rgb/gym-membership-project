const StatCard = ({ label, value, note, icon: Icon, accent }) => (
  <div className={`stat-card stat-card--${accent}`}>
    <div className="stat-card__body">
      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
        <small className="stat-card__note">{note}</small>
      </div>
      <div className="stat-card__icon">
        <Icon />
      </div>
    </div>
  </div>
);

export default StatCard;
