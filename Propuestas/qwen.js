const SERVICES_DB = [
    {
        category: 'web',
        categoryName: '🌐 Tu Presencia Web',
        categoryIcon: 'globe',
        categoryDescription: 'Lo primero que ven tus clientes. Haz que cuenten.',
        services: [
            {
                id: 'landing-page',
                name: 'Landing Page',
                nameSimple: 'Página de Venta Rápida',
                description: 'Una página enfocada en convertir visitantes en clientes',
                descriptionBenefit: 'Ideal para campañas específicas o productos estrella',
                basePrice: 250,
                marketValue: 400,
                priceType: 'one-time',
                icon: 'file-text',
                difficulty: 'fácil',
                timeToImplement: '3-5 días',
                roi: {
                    clientsPerMonth: '+10-20 clientes',
                    timeSaved: '5 horas/semana',
                    moneySaved: '$200/mes en publicidad mal invertida'
                },
                recommendedFor: ['emprendedores', 'campañas', 'productos'],
                badge: '🔥 Más vendido',
                features: ['1 Página', 'Formulario de Contacto', 'Optimizada para Móvil'],
                extras: [
                    { id: 'copywriting', name: 'Textos Profesionales', price: 50, type: 'one-time', description: 'Redacción que vende' },
                    { id: 'seo-basic', name: 'SEO Básico', price: 80, type: 'one-time', description: 'Aparece en Google' }
                ]
            },
            {
                id: 'web-profesional',
                name: 'Web Profesional',
                nameSimple: 'Sitio Web Completo',
                description: 'Múltiples páginas para mostrar todo tu negocio',
                descriptionBenefit: 'Transmite confianza y profesionalismo a cada visitante',
                basePrice: 800,
                marketValue: 1200,
                priceType: 'one-time',
                icon: 'layout',
                difficulty: 'medio',
                timeToImplement: '2-3 semanas',
                roi: {
                    clientsPerMonth: '+25-50 clientes',
                    timeSaved: '8 horas/semana',
                    moneySaved: '$400/mes en atención al cliente'
                },
                recommendedFor: ['pymes', 'servicios', 'profesionales'],
                badge: '⭐ Recomendado',
                features: ['Hasta 5 Páginas', 'Blog Incluido', 'SEO Técnico', 'Analytics'],
                extras: [
                    { id: 'chatbot-integration', name: 'Chatbot Integrado', price: 150, type: 'one-time', description: 'Atención 24/7 en tu web' },
                    { id: 'extra-section', name: 'Página Extra', price: 100, type: 'counter', description: '$100 por página adicional', min: 1, max: 10 }
                ]
            },
            {
                id: 'ecommerce',
                name: 'Tienda E-Commerce',
                nameSimple: 'Tienda Online',
                description: 'Vende tus productos 24/7 sin límites',
                descriptionBenefit: 'Tu negocio abierto todo el día, todos los días',
                basePrice: 2400,
                marketValue: 3500,
                priceType: 'one-time',
                icon: 'shopping-cart',
                difficulty: 'avanzado',
                timeToImplement: '4-6 semanas',
                roi: {
                    clientsPerMonth: '+50-100 clientes',
                    timeSaved: '20 horas/semana',
                    moneySaved: '$800/mes en personal de ventas'
                },
                recommendedFor: ['tiendas', 'marcas', 'distribuidores'],
                badge: '💎 Premium',
                features: ['Productos Ilimitados', 'Pasarelas de Pago', 'Panel de Administración', 'Inventario'],
                extras: [
                    { id: 'priority-load', name: 'Velocidad Premium', price: 200, type: 'one-time', description: 'Carga en menos de 2 segundos' },
                    { id: 'product-upload', name: 'Carga de Productos', price: 100, type: 'counter', description: '$100 por cada 50 productos', min: 1 }
                ]
            }
        ]
    },
    {
        category: 'chatbots-ia',
        categoryName: '🤖 Automatización & IA',
        categoryIcon: 'bot',
        categoryDescription: 'Atiende, vende y sigue clientes mientras duermes.',
        services: [
            {
                id: 'chatbot-essential',
                name: 'Chatbot Esencial',
                nameSimple: 'Atendedor Automático',
                description: 'Respuestas predefinidas para preguntas frecuentes',
                descriptionBenefit: 'Nunca más pierdas un cliente por no responder a tiempo',
                basePrice: 180,
                marketValue: 300,
                priceType: 'one-time',
                icon: 'message-circle',
                difficulty: 'fácil',
                timeToImplement: '2-4 días',
                roi: {
                    clientsPerMonth: '+15-30 clientes',
                    timeSaved: '10 horas/semana',
                    moneySaved: '$300-500/mes en personal'
                },
                recommendedFor: ['restaurantes', 'clínicas', 'servicios'],
                badge: '🚀 Inicio rápido',
                features: ['Respuestas 24/7', 'Multi-canal', 'Árbol de Decisiones'],
                extras: [
                    { id: 'ai-gpt', name: 'Inteligencia Artificial', price: 50, type: 'monthly', description: 'Respuestas inteligentes y naturales' },
                    { id: 'whatsapp-api', name: 'WhatsApp Oficial', price: 30, type: 'monthly', description: 'Canal verificado de WhatsApp Business' },
                    { id: 'multi-language', name: 'Multiidioma', price: 80, type: 'one-time', description: 'Español + Inglés' }
                ]
            },
            {
                id: 'ai-sales-agent',
                name: 'Agente IA de Ventas',
                nameSimple: 'Vendedor Automático',
                description: 'Califica leads, agenda citas y cierra ventas automáticamente',
                descriptionBenefit: 'Un vendedor trabajando 24/7 sin descanso ni comisiones',
                basePrice: 350,
                marketValue: 600,
                priceType: 'one-time',
                icon: 'target',
                difficulty: 'medio',
                timeToImplement: '1-2 semanas',
                roi: {
                    clientsPerMonth: '+30-60 clientes',
                    timeSaved: '15 horas/semana',
                    moneySaved: '$600-1000/mes en equipo de ventas'
                },
                recommendedFor: ['inmobiliarias', 'clínicas', 'educación'],
                badge: '⭐ Más rentable',
                features: ['Calificación de Leads', 'Agenda Automática', 'Seguimiento Inteligente'],
                extras: [
                    { id: 'calendar-integration', name: 'Google Calendar', price: 50, type: 'one-time', description: 'Agenda citas automáticamente' },
                    { id: 'crm-sync', name: 'Sincronización CRM', price: 80, type: 'one-time', description: 'Todos los datos en un lugar' },
                    { id: 'ai-token-premium', name: 'IA Premium GPT-4', price: 80, type: 'monthly', description: 'Respuestas más avanzadas' }
                ]
            }
        ]
    },
    // ... continuar con las demás categorías (mensajería, CRM, integraciones, consultoría)
];

// PAQUETES PRE-ARMADOS
const PREMADE_PACKAGES = [
    {
        id: 'pack-emprendedor',
        name: '🥉 Pack Emprendedor',
        description: 'Perfecto para empezar desde cero',
        services: ['landing-page', 'chatbot-essential', 'soporte-basico-1mes'],
        originalPrice: 670,
        packagePrice: 550,
        savings: 120,
        badge: '💚 Mejor para iniciar',
        roi: {
            clientsPerMonth: '+25-50 clientes',
            timeSaved: '15 horas/semana',
            paybackMonths: '2-3 meses'
        }
    },
    {
        id: 'pack-crecimiento',
        name: '🥈 Pack Crecimiento',
        description: 'Para negocios que ya venden y quieren escalar',
        services: ['web-profesional', 'ai-sales-agent', 'crm-restructure', 'soporte-avanzado-3mes'],
        originalPrice: 1550,
        packagePrice: 1200,
        savings: 350,
        badge: '⭐ Más popular',
        roi: {
            clientsPerMonth: '+50-100 clientes',
            timeSaved: '25 horas/semana',
            paybackMonths: '3-4 meses'
        }
    },
    {
        id: 'pack-transformacion',
        name: '🥇 Pack Transformación',
        description: 'Automatización completa para empresas establecidas',
        services: ['ecommerce', 'ai-sales-agent', 'crm-restructure', 'mensajeria-masiva', 'soporte-avanzado-6mes'],
        originalPrice: 4300,
        packagePrice: 3500,
        savings: 800,
        badge: '💎 Máximo valor',
        roi: {
            clientsPerMonth: '+100-200 clientes',
            timeSaved: '40 horas/semana',
            paybackMonths: '4-6 meses'
        }
    }
];