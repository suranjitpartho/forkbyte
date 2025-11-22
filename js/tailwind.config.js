tailwind.config = {
    theme: {
        fontFamily: {
            sans: ['Barlow', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#30e9bb',
                secondary: '#8cd3ad',
                accent: '#44dc7eff',
                primaryDark: '#10785eff',
                primaryLight: '#8ad8c4ff',

                text: {
                    200: '#ecececff',
                    400: '#b6b6b6ff',
                    600: '#797979ff',
                },
                backgroundDark: {
                    800: '#22242d',
                    600: '#272a37',
                    400: '#373a49',
                },
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-double-fade': 'spin-double-fade 8s linear infinite',
                'spin-card-sequence': 'spin-card-sequence 12s linear infinite',
                'icon-color-sequence': 'icon-color-sequence 12s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'spin-double-fade': {
                    '0%': { transform: 'rotate(0deg)', opacity: '0' },
                    '5%': { opacity: '1' },
                    '25%': { transform: 'rotate(1800deg)', opacity: '1' },
                    '30%': { opacity: '0' },
                    '100%': { transform: 'rotate(1800deg)', opacity: '0' }
                },
                'spin-card-sequence': {
                    '0%': { transform: 'rotate(0deg)', opacity: '0' },
                    '5%': { opacity: '1' },
                    '20%': { transform: 'rotate(1800deg)', opacity: '1' },
                    '25%': { transform: 'rotate(2160deg)', opacity: '0' },
                    '100%': { transform: 'rotate(2160deg)', opacity: '0' }
                },
                'icon-color-sequence': {
                    '0%, 25%, 100%': { color: '#797979ff', backgroundColor: 'rgba(236, 236, 236, 0.05)' },
                    '5%, 20%': { color: '#30e9bb', backgroundColor: 'rgba(48, 233, 187, 0.2)' },
                }
            }
        }
    }
}
