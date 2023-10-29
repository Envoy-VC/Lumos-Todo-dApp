import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#3B82F6',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
