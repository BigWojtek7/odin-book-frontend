import Button from '../../Form/Button/Button';
import Textarea from '../../Form/Textarea/Textarea';
import styles from '../SettingsSharedCSS.module.css';
function EditAbout({
  aboutState,
  handleEditAbout,
  handleAboutInput,
  aboutFetch,
}) {
  return (
    <div className={styles.editAbout}>
      <h2>Edit About:</h2>
      <form className={styles.form} onSubmit={handleEditAbout}>
        <Textarea
          name="about"
          style={{ height: '6em', backgroundColor: 'var(--nav-bg)' }}
          value={aboutState.about}
          onChange={handleAboutInput}
          error={aboutState.errors.about}
        />
        <Button type="submit">Submit</Button>
        {aboutFetch &&
          aboutFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
      </form>
    </div>
  );
}
export default EditAbout;
