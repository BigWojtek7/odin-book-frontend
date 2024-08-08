import styles from './Loader.module.css'
function Loader(){
  return(
    <div className={styles.loader}>
    <p>Data is loading...</p>
    <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader