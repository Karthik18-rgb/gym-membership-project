import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';

const StatCard = ({ label, value, note, icon: Icon, accent }) => (
  <motion.div whileHover={{ y: -4, scale: 1.01 }} className={`stat-card ${accent}`}>
    <div>
      <p>{label}</p>
      <h2>{value}</h2>
      <small>{note}</small>
    </div>
    <div className="stat-card__icon">
      {Icon ? <Icon /> : <FiTrendingUp />}
    </div>
  </motion.div>
);

export default StatCard;
