import { create } from "zustand";

interface BearState {
	role: "STUDENT" | "EXAMINER" | null;
	setRole: (role: "STUDENT" | "EXAMINER") => void;
}

const useRoleStore = create<BearState>()((set) => ({
	role: null,
	setRole: (role) => set(() => ({ role: role })),
}));

export default useRoleStore;
