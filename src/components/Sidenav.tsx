// import Link from "next/link";
import styles from './Sidenav.module.scss';

export interface NavItem { 
    id: string;
    name: string;
}

export interface SidenavProps {
    navItems: NavItem[];
    onNavItemClick: Function;
}

const Sidenav = ({ navItems, children, onNavItemClick }: React.PropsWithChildren<SidenavProps>) => {
    return <div className={styles.sidenav}>
        <div>{children}</div>
       { navItems && 
            <div className={styles.navItems}>
                {navItems.map((navItem, index) => <button key={`navItem-${index}`} onClick={() => onNavItemClick(navItem.id)}>{navItem.name}</button>) }
            </div> 
        }
    </div>
}

export default Sidenav;