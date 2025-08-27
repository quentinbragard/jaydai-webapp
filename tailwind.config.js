/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './src/**/*.{js,jsx,ts,tsx}',
	  './pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
		  },
		  sidebar: {
			DEFAULT: 'hsl(var(--sidebar))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		  }
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		fontFamily: {
		  sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
		},
		// Add extension-matching animations
		animation: {
		  'float': 'float 3s ease infinite',
		  'pulse-glow': 'pulse-glow 3s infinite',
		  'slide-up-fade-in': 'slide-up-fade-in 0.4s ease-out forwards',
		  'shimmer': 'shimmer 3s infinite',
		  'gradient': 'gradient-shift 5s ease infinite',
		  'gentle-pulse': 'gentle-pulse 3s ease-in-out infinite',
		  'fade-in': 'fadeIn 0.3s ease-out',
		  'slide-in-up': 'slideInUp 0.3s ease-out',
		},
		keyframes: {
		  'float': {
			'0%': { transform: 'translateY(0px)' },
			'50%': { transform: 'translateY(-5px)' },
			'100%': { transform: 'translateY(0px)' },
		  },
		  'pulse-glow': {
			'0%': { boxShadow: '0 0 5px rgba(59, 76, 184, 0.1), 0 0 10px rgba(59, 76, 184, 0.1)' },
			'50%': { boxShadow: '0 0 10px rgba(59, 76, 184, 0.2), 0 0 20px rgba(59, 76, 184, 0.2)' },
			'100%': { boxShadow: '0 0 5px rgba(59, 76, 184, 0.1), 0 0 10px rgba(59, 76, 184, 0.1)' },
		  },
		  'slide-up-fade-in': {
			'0%': { opacity: '0', transform: 'translateY(10px)' },
			'100%': { opacity: '1', transform: 'translateY(0)' },
		  },
		  'shimmer': {
			'0%': { backgroundPosition: '-1000px 0' },
			'100%': { backgroundPosition: '1000px 0' },
		  },
		  'gradient-shift': {
			'0%': { backgroundPosition: '0% 50%' },
			'50%': { backgroundPosition: '100% 50%' },
			'100%': { backgroundPosition: '0% 50%' },
		  },
		  'gentle-pulse': {
			'0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
			'50%': { opacity: '1', transform: 'scale(1.02)' },
		  },
		  'fadeIn': {
			'from': { opacity: '0' },
			'to': { opacity: '1' },
		  },
		  'slideInUp': {
			'from': { opacity: '0', transform: 'translateY(10px)' },
			'to': { opacity: '1', transform: 'translateY(0)' },
		  },
		},
		// Extension-matching spacing and sizing
		spacing: {
		  '18': '4.5rem',
		  '88': '22rem',
		},
		maxWidth: {
		  '8xl': '88rem',
		},
		backdropBlur: {
		  xs: '2px',
		},
	  }
	},
	plugins: [
	  require("tailwindcss-animate"),
	],
  }