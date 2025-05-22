import styles from './SectionTitle.module.scss';

const SectionTitle = ({ align = 'center', title, width = 'max' }) => {
  const widthStyle = width === 'content' ? { width: 'max-content' } : {};

  return (
    <p className={`${styles.title} ${align === 'center' && styles['title--center']}`} style={widthStyle}>
      {title}
    </p>
  );
};

export default SectionTitle;
