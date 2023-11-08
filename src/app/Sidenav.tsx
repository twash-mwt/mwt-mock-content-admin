import Link from "next/link";
import styles from './Sidenav.module.scss';

const Sidenav = () => {
    return <div className={styles.sidenav}>
        <Link href="/">Button</Link>
    </div>
}

export default Sidenav;