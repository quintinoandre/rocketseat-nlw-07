import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';

import { AuthContext } from '../../contexts';
import styles from './styles.module.scss';

function LoginBox() {
	const { signInUrl } = useContext(AuthContext);

	return (
		<div className={styles.loginBoxWrapper}>
			<strong>Enter and share your message</strong>
			<a href={signInUrl} className={styles.signInWithGithub}>
				<VscGithubInverted size={24} />
				Enter with github
			</a>
		</div>
	);
}

export { LoginBox };
