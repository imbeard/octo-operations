import Cookies from 'js-cookie';
import { browser } from '$app/environment';

/**
 * Set a cookie
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Days until cookie expires
 */
export function setCookie(name: string, value: string, days: number = 7): void {
	if (!browser) return;

	try {
		Cookies.set(name, value, {
			expires: days,
			path: '/',
			sameSite: 'strict'
		});
	} catch (e) {
		console.error('Error setting cookie:', e);
	}
}

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
	if (!browser) return null;

	try {
		return Cookies.get(name) || null;
	} catch (e) {
		console.error('Error getting cookie:', e);
		return null;
	}
}

/**
 * Delete a cookie by name
 * @param name - Cookie name
 */
export function deleteCookie(name: string): void {
	if (!browser) return;

	try {
		Cookies.remove(name, { path: '/' });
	} catch (e) {
		console.error('Error removing cookie:', e);
	}
}
