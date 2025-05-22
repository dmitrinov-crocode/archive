import styles from './Switcher.module.scss'

const Switcher = ({data, handlerClick, activeId = 0}) => {
  return (
    <div className={styles['switcher']}>
      {data.map((el, i) => (
        <button type='button' 
          className={`
            ${styles['switcher__item']} 
            ${i == 0 ? styles['switcher__item--left'] : ''}
            ${i == data.length-1 ? styles['switcher__item--right'] : ''} 
            ${activeId == i ? styles['switcher__item--active'] : ""}`} 
          onClick={() => handlerClick(i)}
          key={i}
        >
          {el.title}
        </button>
      ))}
    </div>
  )
}

export default Switcher