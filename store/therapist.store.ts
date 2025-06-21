import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type TherapistAuthStore = {
  token: string | null
  email: string | null
  hasHydrated: boolean | null
  setToken: (token: string) => void
  setEmail: (email: string) => void
  setHasHydrated: () => void
  clearToken: () => void
}

const useTherapistAuthStore = create<TherapistAuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      hasHydrated: false,
      setEmail: (email: string) => { return set({ email }) },
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'admin-auth-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage), // ✅ THIS is the fix
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated()
      }
    }
  )
)

export default useTherapistAuthStore
