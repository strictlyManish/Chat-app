import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';


export const useAuhtStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoginIn: false,
    isUpdatingprofile: false,


    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('auth/check');
            set({ authUser: res.data })
        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {

    },
}));