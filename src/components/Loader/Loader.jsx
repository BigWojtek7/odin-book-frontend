import styles from './Loader.module.css'
function Loader(){
  return(
    <div className={styles.loader}>
    <p className={styles.loading}>Data is loading...</p>
    <p className={styles.info}>Loading the first time may take longer - the server is waking up</p>
    <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader