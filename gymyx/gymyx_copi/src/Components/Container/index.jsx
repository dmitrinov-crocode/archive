import styles from "./Container.module.scss"

const Container = ({ size = "", children, classTitle = '' }) => {
  return (
    <div className={`${styles[`container${size.toUpperCase()}`]} ${classTitle}`}>
      {children}
    </div>
  )
}

export default Container
