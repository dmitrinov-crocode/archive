import styles from './PackagesTagItem.module.scss'

const PackagesTagItem = ({isOnly, id, name, isActive = false, handlerClick}) => {
  return (
    <button 
    type='button' 
    className={`
      ${styles['packages-tag-item']} 
      ${isActive && isOnly ? styles['packages-tag-item--active-only'] : ''}
      ${isActive && !isOnly ? styles['packages-tag-item--active-default'] : ''}`}
    onClick={() => handlerClick(id)}
    >
      {name}
    </button>
  )
}

export default PackagesTagItem