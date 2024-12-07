import Button from '../../Form/Button/Button';
import styles from './RequestForm.module.css';

function RequestForm({
  onSubmit,
  buttonText,
  buttonBorderRadius = '0 0 0 10px',
  isCancel = false,
}) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Button
        cancelButton={isCancel ? true : false}
        type="submit"
        style={{
          width: '100%',
          fontSize: '0.6rem',
          borderRadius: buttonBorderRadius,
        }}
      >
        {buttonText}
      </Button>
    </form>
  );
}
export default RequestForm;
