/**
 * Calculator Module - Cotizador Dinamico v2
 * Service taxonomy, state management, price calculation, n8n webhook.
 */

(function() {
    'use strict';

    const N8N_WEBHOOK_URL = 'https://n8n.cambiodigital.cloud/webhook/c1692d85-8ad6-4977-b484-541c16463d0a';

    // ==========================================
    // SERVICE DATABASE
    // ==========================================
    const SERVICES_DB = [
        {
            category: 'chatbots-ia',
            categoryName: 'Chatbots & Agentes IA',
            categoryIcon: 'bot',
            categoryDescription: 'Atención automática y ventas 24/7 por WhatsApp y redes sociales.',
            services: [
                {
                    id: 'chatbot-essential',
                    name: 'Chatbot Esencial',
                    description: 'Atención automática con árbol de decisiones. Respuestas rápidas 24/7.',
                    basePrice: 180,
                    marketValue: 300,
                    priceType: 'one-time',
                    features: ['Respuestas Rápidas', 'Lógica de Árbol', 'Multi-canal'],
                    extras: [
                        { id: 'ai-gpt', name: 'Inteligencia Artificial (GPT)', price: 50, type: 'monthly', description: 'Respuestas inteligentes con IA' },
                        { id: 'whatsapp-api', name: 'WhatsApp API Oficial', price: 30, type: 'monthly', description: 'Canal verificado de WhatsApp Business' },
                        { id: 'multi-language', name: 'Multiidioma (ES/EN)', price: 80, type: 'one-time', description: 'Soporte en español e inglés' }
                    ]
                },
                {
                    id: 'ai-sales-agent',
                    name: 'Agente IA de Ventas',
                    description: 'Califica leads, agenda citas y cierra ventas mientras tú duermes.',
                    basePrice: 350,
                    marketValue: 600,
                    priceType: 'one-time',
                    features: ['Calificación de Leads', 'Agendamiento', 'Cierre de Ventas'],
                    extras: [
                        { id: 'google-calendar', name: 'Google Calendar', price: 50, type: 'one-time', description: 'Integración con Google Calendar' },
                        { id: 'crm-integration', name: 'Integración CRM', price: 80, type: 'one-time', description: 'Conexión con tu CRM existente' },
                        { id: 'ai-premium', name: 'IA Premium (GPT-4)', price: 80, type: 'monthly', description: 'Modelo de IA avanzado' }
                    ]
                }
            ]
        },
        {
            category: 'messaging',
            categoryName: 'Mensajería & Comunicación',
            categoryIcon: 'mail',
            categoryDescription: 'Comunicación masiva y automatizada con clientes.',
            services: [
                {
                    id: 'mass-messaging',
                    name: 'Mensajería Masiva',
                    description: 'Envío de mensajes masivos personalizados a través de WhatsApp y correo electrónico.',
                    basePrice: 150,
                    marketValue: 250,
                    priceType: 'one-time',
                    features: ['Plantillas Personalizadas', 'Segmentación de Audiencia', 'Reportes de Entrega'],
                    extras: [
                        { id: 'template-design', name: 'Diseño de Plantillas (x5)', price: 60, type: 'one-time', description: 'Diseño de 5 plantillas personalizadas' },
                        { id: 'whatsapp-business', name: 'WhatsApp Business', price: 30, type: 'monthly', description: 'Canal verificado de WhatsApp Business' }
                    ]
                },
                {
                    id: 'welcome-cycle',
                    name: 'Ciclo Bienvenida/Despedida',
                    description: 'Automatización de mensajes de bienvenida y despedida para clientes.',
                    basePrice: 120,
                    marketValue: 200,
                    priceType: 'one-time',
                    features: ['Mensajes Automáticos', 'Personalización', 'Segmentación'],
                    extras: [
                        { id: 'additional-sequences', name: 'Secuencias Adicionales (+3)', price: 40, type: 'one-time', description: '3 secuencias adicionales de mensajes' }
                    ]
                },
                {
                    id: 'membership-reminders',
                    name: 'Recordatorios de Membresía',
                    description: 'Recordatorios automáticos para renovación de membresías.',
                    basePrice: 100,
                    marketValue: 180,
                    priceType: 'one-time',
                    features: ['Notificaciones Automáticas', 'Personalización', 'Segmentación'],
                    extras: [
                        { id: 'payment-gateway', name: 'Integración Pasarela de Pago', price: 80, type: 'one-time', description: 'Integración con pasarela de pago' }
                    ]
                },
                {
                    id: 'review-forms',
                    name: 'Formularios de Reseña',
                    description: 'Recolección automática de reseñas de clientes.',
                    basePrice: 80,
                    marketValue: 150,
                    priceType: 'one-time',
                    features: ['Recolección de Reseñas', 'Notificaciones Automáticas', 'Reportes'],
                    extras: [
                        { id: 'google-reviews', name: 'Push a Google Reviews', price: 40, type: 'one-time', description: 'Integración con Google Reviews' }
                    ]
                }
            ]
        },
        {
            category: 'crm-automation',
            categoryName: 'CRM & Automatización',
            categoryIcon: 'database',
            categoryDescription: 'Automatización de procesos de ventas y gestión de clientes.',
            services: [
                {
                    id: 'crm-restructuring',
                    name: 'Reestructuración CRM',
                    description: 'Optimización y reestructuración de tu sistema CRM.',
                    basePrice: 250,
                    marketValue: 400,
                    priceType: 'one-time',
                    features: ['Análisis de Procesos', 'Optimización de Flujos', 'Capacitación'],
                    extras: [
                        { id: 'data-migration', name: 'Migración de Datos (+1000 reg)', price: 100, type: 'one-time', description: 'Migración de hasta 1000 registros' }
                    ]
                },
                {
                    id: 'ecommerce',
                    name: 'E-Commerce',
                    description: 'Desarrollo de tienda en línea con integración de pasarela de pago.',
                    basePrice: 2400,
                    marketValue: 3500,
                    priceType: 'one-time',
                    features: ['Tienda en Línea', 'Pasarela de Pago', 'Gestión de Inventario'],
                    extras: [
                        { id: 'load-optimization', name: 'Optimización de Carga', price: 200, type: 'one-time', description: 'Optimización de velocidad de carga' },
                        { id: 'product-loading', name: 'Carga de Productos (+50)', price: 100, type: 'one-time', description: 'Carga de hasta 50 productos' }
                    ]
                },
                {
                    id: 'web-maintenance',
                    name: 'Mantenimiento Web',
                    description: 'Mantenimiento y actualización continua de tu sitio web.',
                    basePrice: 50,
                    marketValue: 80,
                    priceType: 'monthly',
                    features: ['Actualizaciones de Contenido', 'Soporte Técnico', 'Backups'],
                    extras: [
                        { id: 'content-updates', name: 'Actualizaciones de Contenido (4/mes)', price: 30, type: 'monthly', description: '4 actualizaciones de contenido al mes' }
                    ]
                }
            ]
        },
        {
            category: 'consulting',
            categoryName: 'Consultoría & Estrategia',
            categoryIcon: 'lightbulb',
            categoryDescription: 'Asesoría especializada en estrategias digitales.',
            services: [
                {
                    id: 'brand-study',
                    name: 'Estudio de Marca e Identidad',
                    description: 'Análisis y desarrollo de la identidad de marca.',
                    basePrice: 300,
                    marketValue: 500,
                    priceType: 'one-time',
                    features: ['Análisis de Marca', 'Desarrollo de Identidad', 'Estrategia de Marca'],
                    extras: [
                        { id: 'social-media-kit', name: 'Kit Redes Sociales', price: 80, type: 'one-time', description: 'Kit de redes sociales' }
                    ]
                },
                {
                    id: 'automation-consulting',
                    name: 'Consultoría de Automatización',
                    description: 'Asesoría en automatización de procesos empresariales.',
                    basePrice: 150,
                    marketValue: 250,
                    priceType: 'one-time',
                    features: ['Análisis de Procesos', 'Recomendaciones', 'Implementación'],
                    extras: [
                        { id: 'additional-session', name: 'Sesión Adicional', price: 60, type: 'one-time', description: 'Sesión adicional de consultoría' }
                    ]
                }
            ]
        }
    ];

    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    const state = {
        selectedServices: {},
        selectedExtras: {}
    };

    // ==========================================
    // RENDER FUNCTIONS
    // ==========================================
    function render() {
        const appElement = document.getElementById('calculator-app');
        if (!appElement) return;

        // Render categories
        const categoriesHtml = SERVICES_DB.map(cat => {
            const isSelected = state.selectedServices[`${cat.category}-selected`];
            return `
                <div class="calculator-category ${isSelected ? 'selected' : ''}" onclick="toggleCategory('${cat.category}')">
                    <div class="category-header">
                        <i data-lucide="${cat.categoryIcon}" class="w-6 h-6"></i>
                        <h3>${cat.categoryName}</h3>
                        <span class="category-description">${cat.categoryDescription}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Render services for selected category
        let servicesHtml = '';
        const selectedCategory = SERVICES_DB.find(cat => state.selectedServices[`${cat.category}-selected`]);
        if (selectedCategory) {
            servicesHtml = selectedCategory.services.map(service => {
                const isSelected = state.selectedServices[service.id];
                return `
                    <div class="calculator-service ${isSelected ? 'selected' : ''}" onclick="toggleService('${service.id}')">
                        <h4>${service.name}</h4>
                        <p>${service.description}</p>
                        <div class="price">$${service.basePrice} USD <span class="text-sm text-cd-text-dim">${service.priceType === 'one-time' ? 'Inversión única' : 'Mensual'}</span></div>
                        ${isSelected ? renderExtras(service) : ''}
                    </div>
                `;
            }).join('');
        }

        // Calculate totals
        const totals = calculateTotals();

        // Render app
        appElement.innerHTML = `
            <div class="calculator-categories">
                ${categoriesHtml}
            </div>
            <div class="calculator-services">
                ${servicesHtml}
            </div>
            <div class="calculator-totals">
                <div class="flex flex-col gap-2">
                    <div class="flex justify-between">
                        <span class="text-sm text-cd-text-dim">Valor de mercado</span>
                        <span class="text-sm text-cd-text-dim">$${totals.marketValue.toLocaleString()} USD</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-cd-text-dim">Inversión única</span>
                        <span class="font-bold">$${totals.oneTime.toLocaleString()} USD</span>
                    </div>
                    ${totals.monthly > 0 ? `
                        <div class="flex justify-between">
                            <span class="text-sm text-cd-text-dim">Mensual</span>
                            <span class="font-bold">$${totals.monthly.toLocaleString()} USD/mes</span>
                        </div>
                    ` : ''}
                </div>
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="https://wa.me/573122908416?text=${encodeURIComponent(generateWhatsAppMessage())}" target="_blank" class="btn-primary justify-center py-3 px-6">
                        <i data-lucide="message-circle" class="w-4 h-4"></i> Hablar por WhatsApp
                    </a>
                    <a href="/" class="btn-secondary justify-center py-3 px-6">
                        Volver al inicio
                    </a>
                </div>
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    }

    function renderExtras(service) {
        const extrasHtml = service.extras.map(extra => {
            const isSelected = state.selectedExtras[extra.id];
            return `
                <div class="calculator-extra ${isSelected ? 'selected' : ''}" onclick="toggleExtra('${extra.id}')">
                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleExtra('${extra.id}')">
                    <span>${extra.name} (+$${extra.price} ${extra.type === 'monthly' ? 'USD/mes' : 'USD'})</span>
                </div>
            `;
        }).join('');

        return `
            <div class="calculator-extras">
                <h5>Extras:</h5>
                ${extrasHtml}
            </div>
        `;
    }

    function calculateTotals() {
        let oneTime = 0;
        let monthly = 0;
        let marketValue = 0;

        // Calculate base prices
        SERVICES_DB.forEach(category => {
            category.services.forEach(service => {
                if (state.selectedServices[service.id]) {
                    if (service.priceType === 'one-time') {
                        oneTime += service.basePrice;
                    } else {
                        monthly += service.basePrice;
                    }
                    marketValue += service.marketValue;
                }
            });
        });

        // Calculate extras
        SERVICES_DB.forEach(category => {
            category.services.forEach(service => {
                if (state.selectedServices[service.id]) {
                    service.extras.forEach(extra => {
                        if (state.selectedExtras[extra.id]) {
                            if (extra.type === 'one-time') {
                                oneTime += extra.price;
                            } else {
                                monthly += extra.price;
                            }
                        }
                    });
                }
            });
        });

        return { oneTime, monthly, marketValue };
    }

    function generateWhatsAppMessage() {
        let message = 'Hola, estoy interesado en los siguientes servicios:\n\n';

        SERVICES_DB.forEach(category => {
            category.services.forEach(service => {
                if (state.selectedServices[service.id]) {
                    message += `- ${service.name}: $${service.basePrice} USD (${service.priceType === 'one-time' ? 'Inversión única' : 'Mensual'})\n`;
                    service.extras.forEach(extra => {
                        if (state.selectedExtras[extra.id]) {
                            message += `  - ${extra.name}: +$${extra.price} ${extra.type === 'monthly' ? 'USD/mes' : 'USD'}\n`;
                        }
                    });
                }
            });
        });

        message += `\nTotal estimado: $${calculateTotals().oneTime + calculateTotals().monthly} USD`;
        return message;
    }

    // ==========================================
    // EVENT HANDLERS
    // ==========================================
    window.toggleCategory = function(category) {
        state.selectedServices[`${category}-selected`] = !state.selectedServices[`${category}-selected`];
        // Deselect all services in this category when category is deselected
        if (!state.selectedServices[`${category}-selected`]) {
            SERVICES_DB.find(cat => cat.category === category).services.forEach(s => {
                state.selectedServices[s.id] = false;
            });
        }
        render();
    };

    window.toggleService = function(serviceId) {
        const service = SERVICES_DB.flatMap(cat => cat.services).find(s => s.id === serviceId);
        if (!service) return;

        state.selectedServices[serviceId] = !state.selectedServices[serviceId];
        // Deselect all extras for this service when service is deselected
        if (!state.selectedServices[serviceId]) {
            service.extras.forEach(extra => {
                state.selectedExtras[extra.id] = false;
            });
        }
        render();
    };

    window.toggleExtra = function(extraId) {
        state.selectedExtras[extraId] = !state.selectedExtras[extraId];
        render();
    };

    // ==========================================
    // INIT
    // ==========================================
    window.initCalculator = function() {
        // Check hash for pre-selected category
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const cat = SERVICES_DB.find(c => c.category === hash);
            if (cat) {
                state.selectedServices[`${hash}-selected`] = true;
                cat.services.forEach(s => { state.selectedServices[s.id] = false; });
            }
        }
        render();
    };

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (document.getElementById('calculator-app')) window.initCalculator();
        });
    } else {
        if (document.getElementById('calculator-app')) window.initCalculator();
    }
})();