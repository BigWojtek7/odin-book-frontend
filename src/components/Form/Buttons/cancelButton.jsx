import styles from './Buttons.module.css'
function CancelButton({type, name, style}) {
  console.log(name, style)
  return (
    <button className={styles.cancelButton} style={style} type={type}>{name}</button>
  )
}
export default CancelButton