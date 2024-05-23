import NavbarApp from 'src/components/NavbarApp/NavbarApp'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <NavbarApp />
      {children}
    </>
  )
}

export default AppLayout
