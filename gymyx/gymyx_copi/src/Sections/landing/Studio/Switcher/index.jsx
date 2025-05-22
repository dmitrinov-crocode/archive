import styles from './Switcher.module.scss'

const Switcher = ({active = false, label, position = null, setActive, id}) => {
  return (
    <button type='button' 
    className={`
      ${styles.switcher} 
      ${active ? styles['switcher--active'] : ''}
      ${position ? styles[`switcher--${position}`] : ''} 
      `}
      onClick={() => setActive(id)}
      >{label}</button>
  )
}

export default Switcher