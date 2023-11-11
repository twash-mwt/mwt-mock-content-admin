import '../app/globals.css'
import Sidenav from './Sidenav'
import styles from './layout.module.css'

const Container = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      {children}
    </Container>
  )
}
