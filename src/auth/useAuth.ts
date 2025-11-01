import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
	id?: string;
	email?: string;
	[key: string]: any;
};

type AuthContextType = {
	isAuthenticated: boolean;
	user: User | null;
	login: (userData?: User) => void;
	logout: () => void;
	setAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'sv_auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	// Load from localStorage on mount
	useEffect(() => {
		try {
			const raw = localStorage.getItem(AUTH_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				setIsAuthenticated(Boolean(parsed.isAuthenticated));
				setUser(parsed.user ?? null);
			}
		} catch (e) {
			// ignore parse errors
		}
	}, []);

	// Persist when auth changes
	useEffect(() => {
		try {
			localStorage.setItem(
				AUTH_STORAGE_KEY,
				JSON.stringify({ isAuthenticated, user })
			);
		} catch (e) {
			// ignore
		}
	}, [isAuthenticated, user]);

	const login = (userData?: User) => {
		setIsAuthenticated(true);
		setUser(userData ?? null);
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null);
	};

	const setAuthenticated = (value: boolean) => {
		setIsAuthenticated(!!value);
		if (!value) setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout, setAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return ctx;
};

export default useAuth;