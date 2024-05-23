import { create } from 'zustand'

type UserLikesModal = {
  onOpen: (id: number) => void
  isOpen: boolean
  onClose: () => void
  id: number | null
}

const useUserLikesModal = create<UserLikesModal>()((set) => ({
  isOpen: false,
  id: null,
  onOpen: (id: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: null }),
}))

export default useUserLikesModal
