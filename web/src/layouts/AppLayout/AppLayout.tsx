import { Toaster } from '@redwoodjs/web/toast'

import LikesModal from 'src/components/LikesModal/LikesModal'
import NavbarApp from 'src/components/NavbarApp/NavbarApp'
type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <NavbarApp />
      {children}
      <LikesModal />
      <Toaster />
    </>
  )
}

export default AppLayout
