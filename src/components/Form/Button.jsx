import styles from './Form.module.css'
function Button({type, name}) {
  return (
    <button className={styles.button} type={type}>{name}</button>
  )
}
export default Button