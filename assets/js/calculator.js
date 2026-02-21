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
            categoryDescription: 'Atencion automatica y ventas 24/7 por WhatsApp y redes sociales.',
            services: [
                {
                    id: 'chatbot-essential',
                    name: 'Chatbot Esencial',
                    description: 'Atencion automatica con arbol de decisiones. Respuestas rapidas 24/7.',
                    basePrice: 180,
                    marketValue: 300,
                    priceType: 'one-time',
                    features: ['Respuestas Rapidas', 'Logica de Arbol', 'Multi-canal'],
                    extras: [
                        { id: 'ai-gpt', name: 'Inteligencia Artificial (GPT)', price: 50, type: 'monthly', description: 'Respuestas inteligentes con IA' },
                        { id: 'whatsapp-api', name: 'WhatsApp API Oficial', price: 30, type: 'monthly', description: 'Canal verificado de WhatsApp Business' },
                        { id: 'multi-language', name: 'Multiidioma (ES/EN)', price: 80, type: 'one-time', description: 'Soporte en espanol e ingles' }
                    ]
                },
                {
                    id: 'ai-sales-agent',
                    name: 'Agente IA de Ventas',
                    description: 'Califica leads, agenda citas y cierra ventas mientras tu duermes.',
                    basePrice: 350,
                    marketValue: 600,
                    priceType: 'one-time',
                    features: ['Calificacion de Leads', 'Agenda Automatica', 'Seguimiento Inteligente'],
                    extras: [
                        { id: 'calendar-integration', name: 'Integracion Google Calendar', price: 50, type: 'one-time', description: 'Agenda citas automaticamente' },
                        { id: 'crm-sync', name: 'Sincronizacion con CRM', price: 80, type: 'one-time', description: 'Datos sincronizados con tu CRM' },
                        { id: 'ai-token-premium', name: 'IA Premium (GPT-4)', price: 80, type: 'monthly', description: 'Respuestas avanzadas y contextuales' }
                    ]
                }
            ]
        },
        {
            category: 'mensajeria',
            categoryName: 'Mensajeria & Comunicacion',
            categoryIcon: 'send',
            categoryDescription: 'Envios masivos, ciclos automaticos y formularios inteligentes.',
            services: [
                {
                    id: 'mass-messaging',
                    name: 'Mensajeria Masiva',
                    description: 'Campanas a listas segmentadas por WhatsApp o email.',
                    basePrice: 150,
                    marketValue: 250,
                    priceType: 'one-time',
                    features: ['Segmentacion', 'Plantillas', 'Reportes de Apertura'],
                    extras: [
                        { id: 'template-design', name: 'Diseno de Plantillas (x5)', price: 60, type: 'one-time', description: '5 plantillas profesionales' },
                        { id: 'whatsapp-broadcast', name: 'Canal WhatsApp Business', price: 30, type: 'monthly', description: 'Envios por WhatsApp API' }
                    ]
                },
                {
                    id: 'welcome-farewell',
                    name: 'Ciclo Bienvenida / Despedida',
                    description: 'Secuencias automaticas cuando un cliente se une o se va.',
                    basePrice: 120,
                    marketValue: 200,
                    priceType: 'one-time',
                    features: ['Onboarding Automatico', 'Encuesta de Salida', 'Triggers'],
                    extras: [
                        { id: 'custom-sequences', name: 'Secuencias Personalizadas (+3)', price: 40, type: 'one-time', description: '3 secuencias adicionales' }
                    ]
                },
                {
                    id: 'membership-reminders',
                    name: 'Recordatorios de Membresia',
                    description: 'Alertas automaticas de vencimiento, renovacion y pagos.',
                    basePrice: 100,
                    marketValue: 180,
                    priceType: 'one-time',
                    features: ['Recordatorios Auto', 'Multi-canal', 'Escalamiento'],
                    extras: [
                        { id: 'payment-integration', name: 'Integracion Pasarela de Pago', price: 80, type: 'one-time', description: 'Cobros automaticos' }
                    ]
                },
                {
                    id: 'review-forms',
                    name: 'Formularios de Resena',
                    description: 'Encuestas post-servicio para recopilar testimonios.',
                    basePrice: 80,
                    marketValue: 150,
                    priceType: 'one-time',
                    features: ['NPS Score', 'Google Reviews', 'Post-Compra'],
                    extras: [
                        { id: 'google-review-push', name: 'Push a Google Reviews', price: 40, type: 'one-time', description: 'Envio directo a Google' }
                    ]
                }
            ]
        },
        {
            category: 'crm-automatizacion',
            categoryName: 'CRM & Automatizacion',
            categoryIcon: 'database',
            categoryDescription: 'Organiza clientes, automatiza procesos y elimina tareas repetitivas.',
            services: [
                {
                    id: 'crm-restructure',
                    name: 'Reestructuracion CRM',
                    description: 'Auditamos y reorganizamos tu CRM para maximizar resultados.',
                    basePrice: 250,
                    marketValue: 450,
                    priceType: 'one-time',
                    features: ['Auditoria de Datos', 'Migracion', 'Pipelines Optimizados'],
                    extras: [
                        { id: 'data-migration', name: 'Migracion de Datos (+1000 reg)', price: 100, type: 'one-time', description: 'Migracion masiva de datos' },
                        { id: 'custom-pipelines', name: 'Pipelines Personalizados (+3)', price: 80, type: 'one-time', description: '3 pipelines adicionales' }
                    ]
                },
                {
                    id: 'automation-audit',
                    name: 'Auditoria de Automatizacion',
                    description: 'Analizamos tus procesos y te decimos que automatizar.',
                    basePrice: 200,
                    marketValue: 350,
                    priceType: 'one-time',
                    features: ['Mapa de Procesos', 'ROI Estimado', 'Plan de Implementacion'],
                    extras: [
                        { id: 'implementation-plan', name: 'Plan Detallado de Implementacion', price: 100, type: 'one-time', description: 'Roadmap paso a paso' }
                    ]
                }
            ]
        },
        {
            category: 'integraciones',
            categoryName: 'Integraciones',
            categoryIcon: 'plug',
            categoryDescription: 'Conecta WhatsApp con transporte, bases de datos y mas.',
            services: [
                {
                    id: 'whatsapp-shipping',
                    name: 'WhatsApp + Transporte',
                    description: 'Tracking automatico de pedidos y notificaciones de envio.',
                    basePrice: 300,
                    marketValue: 500,
                    priceType: 'one-time',
                    features: ['Tracking Automatico', 'Notificaciones', 'Confirmacion Entrega'],
                    extras: [
                        { id: 'multi-carrier', name: 'Multi-Transportadora', price: 120, type: 'one-time', description: 'Soporte para multiples carriers' }
                    ]
                },
                {
                    id: 'external-db',
                    name: 'Conexion Base de Datos Externa',
                    description: 'Conecta ERP, inventario o contabilidad con tu CRM y bots.',
                    basePrice: 350,
                    marketValue: 600,
                    priceType: 'one-time',
                    features: ['API REST', 'Sync Bidireccional', 'Monitoreo'],
                    extras: [
                        { id: 'realtime-sync', name: 'Sincronizacion Tiempo Real', price: 100, type: 'monthly', description: 'Datos siempre actualizados' }
                    ]
                }
            ]
        },
        {
            category: 'web',
            categoryName: 'Desarrollo Web',
            categoryIcon: 'globe',
            categoryDescription: 'Desde landing pages hasta tiendas completas.',
            services: [
                {
                    id: 'web-basic',
                    name: 'Pagina Web Basica',
                    description: 'Hasta 3 secciones. Presencia digital rapida y profesional.',
                    basePrice: 400,
                    marketValue: 650,
                    priceType: 'one-time',
                    features: ['3 Secciones', 'Responsive', 'SEO Basico'],
                    extras: [
                        { id: 'copywriting', name: 'Redaccion Profesional', price: 50, type: 'one-time', description: 'Textos persuasivos' },
                        { id: 'advanced-form', name: 'Formulario Avanzado', price: 20, type: 'one-time', description: 'Validacion y logica avanzada' }
                    ]
                },
                {
                    id: 'web-custom',
                    name: 'Pagina Web Personalizada',
                    description: 'Diseno a medida con SEO avanzado e integraciones.',
                    basePrice: 800,
                    marketValue: 1200,
                    priceType: 'one-time',
                    features: ['Diseno a Medida', 'SEO Tecnico', 'Integraciones'],
                    extras: [
                        { id: 'chatbot-integration', name: 'Chatbot Integrado', price: 150, type: 'one-time', description: 'Bot directamente en tu web' },
                        { id: 'extra-section', name: 'Seccion Extra', price: 40, type: 'counter', description: '$40 por seccion adicional' }
                    ]
                },
                {
                    id: 'ecommerce',
                    name: 'Tienda E-Commerce',
                    description: 'Catalogo completo, pasarelas de pago y panel admin.',
                    basePrice: 2400,
                    marketValue: 3500,
                    priceType: 'one-time',
                    features: ['Pasarelas de Pago', 'Catalogo Amplio', 'Panel Admin'],
                    extras: [
                        { id: 'priority-load', name: 'Optimizacion de Carga', price: 200, type: 'one-time', description: 'Velocidad prioritaria' },
                        { id: 'product-upload', name: 'Carga de Productos (+50)', price: 100, type: 'one-time', description: 'Subimos 50+ productos' }
                    ]
                },
                {
                    id: 'web-maintenance',
                    name: 'Mantenimiento Web',
                    description: 'Actualizaciones, backups, monitoreo y soporte continuo.',
                    basePrice: 50,
                    marketValue: 100,
                    priceType: 'monthly',
                    features: ['Backups Semanales', 'Actualizaciones', 'Monitoreo'],
                    extras: [
                        { id: 'content-updates', name: 'Actualizaciones de Contenido (4/mes)', price: 30, type: 'monthly', description: '4 cambios mensuales' }
                    ]
                }
            ]
        },
        {
            category: 'consultoria',
            categoryName: 'Consultoria & Estrategia',
            categoryIcon: 'compass',
            categoryDescription: 'Para quienes no saben por donde empezar. Te guiamos.',
            services: [
                {
                    id: 'brand-study',
                    name: 'Estudio de Marca e Identidad',
                    description: 'Definimos tu identidad visual, tono y posicionamiento.',
                    basePrice: 300,
                    marketValue: 500,
                    priceType: 'one-time',
                    features: ['Logo + Paleta', 'Manual de Marca', 'Tono de Voz'],
                    extras: [
                        { id: 'social-kit', name: 'Kit Redes Sociales', price: 80, type: 'one-time', description: 'Plantillas para redes' }
                    ]
                },
                {
                    id: 'automation-consulting',
                    name: 'Consultoria de Automatizacion',
                    description: 'Sesiones 1-a-1 para mapear oportunidades y priorizar.',
                    basePrice: 150,
                    marketValue: 300,
                    priceType: 'one-time',
                    features: ['2 Sesiones (1h)', 'Roadmap', 'Priorizacion ROI'],
                    extras: [
                        { id: 'extra-session', name: 'Sesion Adicional', price: 60, type: 'one-time', description: '1 hora extra de consultoria' }
                    ]
                },
                {
                    id: 'it-partner-standard',
                    name: 'IT Partner Estandar',
                    description: 'Tu departamento IT externo. Soporte prioritario y revisiones.',
                    basePrice: 50,
                    marketValue: 150,
                    priceType: 'monthly',
                    features: ['SLA <2h', 'Revision Semanal', '2h Capacitacion/mes'],
                    setupFee: 150,
                    setupLabel: 'Fase Estabilizacion (3 meses)',
                    extras: []
                },
                {
                    id: 'it-partner-evolution',
                    name: 'IT Partner Evolucion',
                    description: 'Todo del Estandar + implementaciones mensuales y SLA VIP.',
                    basePrice: 200,
                    marketValue: 500,
                    priceType: 'monthly',
                    features: ['SLA VIP Inmediato', '1 Config Nueva/mes', '4h Capacitacion/mes'],
                    setupFee: 400,
                    setupLabel: 'Fase Estabilizacion (3 meses)',
                    extras: []
                }
            ]
        }
    ];

    // ==========================================
    // DIAGNOSTIC QUIZ
    // ==========================================
    const QUIZ_QUESTIONS = [
        {
            question: 'Que te quita mas tiempo en tu dia a dia?',
            options: [
                { label: 'Responder mensajes de clientes', value: 'messages', recommend: ['chatbots-ia', 'mensajeria'] },
                { label: 'Tareas manuales repetitivas', value: 'manual', recommend: ['crm-automatizacion', 'integraciones'] },
                { label: 'Gestionar clientes y datos', value: 'clients', recommend: ['crm-automatizacion'] },
                { label: 'Todo lo anterior', value: 'all', recommend: ['chatbots-ia', 'crm-automatizacion', 'mensajeria'] }
            ]
        },
        {
            question: 'Tienes pagina web?',
            options: [
                { label: 'Si, pero necesita mejoras', value: 'improve', recommend: ['web'] },
                { label: 'No tengo', value: 'no', recommend: ['web'] },
                { label: 'Si, esta bien por ahora', value: 'yes', recommend: [] }
            ]
        },
        {
            question: 'Que es lo mas urgente para ti?',
            options: [
                { label: 'Vender mas sin contratar', value: 'sell', recommend: ['chatbots-ia'] },
                { label: 'Organizar mi negocio', value: 'organize', recommend: ['crm-automatizacion', 'consultoria'] },
                { label: 'Tener presencia online profesional', value: 'online', recommend: ['web', 'consultoria'] },
                { label: 'Soporte tecnico confiable', value: 'support', recommend: ['consultoria'] }
            ]
        }
    ];

    // ==========================================
    // STATE
    // ==========================================
    const state = {
        step: 1,
        selectedServices: {},
        extras: {},
        counters: {},
        quizAnswers: [],
        recommendedCategories: [],
        customer: {}
    };

    // ==========================================
    // HELPERS
    // ==========================================
    function getServiceById(id) {
        for (const cat of SERVICES_DB) {
            for (const svc of cat.services) {
                if (svc.id === id) return svc;
            }
        }
        return null;
    }

    function calculateTotals() {
        let oneTime = 0;
        let monthly = 0;
        let marketValue = 0;

        for (const [serviceId, selected] of Object.entries(state.selectedServices)) {
            if (!selected) continue;
            const svc = getServiceById(serviceId);
            if (!svc) continue;

            marketValue += svc.marketValue || 0;

            if (svc.priceType === 'monthly') {
                monthly += svc.basePrice;
            } else {
                oneTime += svc.basePrice;
            }

            if (svc.setupFee) {
                oneTime += svc.setupFee;
            }

            // Extras
            const svcExtras = state.extras[serviceId] || {};
            for (const [extraId, extraSelected] of Object.entries(svcExtras)) {
                if (!extraSelected) continue;
                const extra = svc.extras.find(e => e.id === extraId);
                if (!extra) continue;

                if (extra.type === 'monthly') {
                    monthly += extra.price;
                } else if (extra.type === 'counter') {
                    const count = state.counters[`${serviceId}-${extraId}`] || 1;
                    oneTime += extra.price * count;
                } else {
                    oneTime += extra.price;
                }
            }
        }

        const savings = marketValue - (oneTime + monthly * 3);
        return { oneTime, monthly, marketValue, savings: Math.max(0, savings) };
    }

    function getSelectedCount() {
        return Object.values(state.selectedServices).filter(Boolean).length;
    }

    // ==========================================
    // RENDERING
    // ==========================================
    function render() {
        const container = document.getElementById('calculator-app');
        if (!container) return;

        if (state.step === 1) renderStep1(container);
        else if (state.step === 2) renderStep2(container);
        else if (state.step === 3) renderStep3(container);

        if (window.lucide) window.lucide.createIcons();
    }

    function renderStepIndicator() {
        return `
        <div class="flex items-center justify-center gap-2 mb-10">
            <div class="step-dot ${state.step >= 1 ? (state.step > 1 ? 'completed' : 'active') : ''}">
                ${state.step > 1 ? '<i data-lucide="check" class="w-4 h-4"></i>' : '1'}
            </div>
            <div class="step-line ${state.step > 1 ? 'active' : ''}"></div>
            <div class="step-dot ${state.step >= 2 ? (state.step > 2 ? 'completed' : 'active') : ''}">
                ${state.step > 2 ? '<i data-lucide="check" class="w-4 h-4"></i>' : '2'}
            </div>
            <div class="step-line ${state.step > 2 ? 'active' : ''}"></div>
            <div class="step-dot ${state.step >= 3 ? 'active' : ''}">3</div>
        </div>`;
    }

    function renderStep1(container) {
        const hash = window.location.hash.replace('#', '');
        container.innerHTML = `
        ${renderStepIndicator()}
        <div class="text-center mb-10">
            <h2 class="text-3xl md:text-4xl font-black mb-3">Que necesitas?</h2>
            <p class="text-cd-text-dim max-w-xl mx-auto">Selecciona las categorias que te interesan. Puedes elegir varias.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            ${SERVICES_DB.map(cat => `
                <button onclick="window.calcSelectCategory('${cat.category}')"
                    class="card-modern text-left p-6 ${state.selectedServices[cat.category + '-selected'] ? 'border-cd-highlight ring-2 ring-cd-highlight' : ''} ${hash === cat.category ? 'border-cd-highlight ring-2 ring-cd-highlight' : ''}">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: var(--cd-surface);">
                            <i data-lucide="${cat.categoryIcon}" class="w-5 h-5" style="color: var(--cd-highlight-color);"></i>
                        </div>
                        <h3 class="font-bold text-lg">${cat.categoryName}</h3>
                    </div>
                    <p class="text-sm text-cd-text-dim">${cat.categoryDescription}</p>
                    <p class="text-xs text-cd-text-dim mt-2">${cat.services.length} servicio${cat.services.length > 1 ? 's' : ''}</p>
                </button>
            `).join('')}
        </div>

        <div class="text-center mb-8">
            <div class="section-divider mb-6"></div>
            <button onclick="window.calcStartQuiz()" class="btn-secondary text-sm">
                <i data-lucide="help-circle" class="w-4 h-4"></i>
                No se por donde empezar
            </button>
        </div>

        <div id="quiz-container"></div>

        <div class="flex justify-center mt-8">
            <button onclick="window.calcGoToStep(2)" class="btn-primary text-lg px-10 py-3 ${getSelectedCount() === 0 ? 'opacity-50 pointer-events-none' : ''}">
                Continuar <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
        </div>`;

        // Auto-select from hash
        if (hash) {
            const cat = SERVICES_DB.find(c => c.category === hash);
            if (cat && !state.selectedServices[hash + '-selected']) {
                state.selectedServices[hash + '-selected'] = true;
                cat.services.forEach(s => { state.selectedServices[s.id] = false; });
            }
        }
    }

    function renderStep2(container) {
        const totals = calculateTotals();
        const selectedCategories = SERVICES_DB.filter(cat =>
            state.selectedServices[cat.category + '-selected'] ||
            cat.services.some(s => state.selectedServices[s.id])
        );

        container.innerHTML = `
        ${renderStepIndicator()}
        <div class="text-center mb-10">
            <h2 class="text-3xl md:text-4xl font-black mb-3">Personaliza tu plan</h2>
            <p class="text-cd-text-dim max-w-xl mx-auto">Selecciona los servicios y extras que necesitas.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <!-- Services List -->
            <div class="flex-1 space-y-6">
                ${selectedCategories.map(cat => `
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <i data-lucide="${cat.categoryIcon}" class="w-5 h-5" style="color: var(--cd-highlight-color);"></i>
                            <h3 class="font-bold text-lg">${cat.categoryName}</h3>
                        </div>
                        <div class="space-y-3">
                            ${cat.services.map(svc => renderServiceCard(svc)).join('')}
                        </div>
                    </div>
                `).join('')}

                <button onclick="window.calcGoToStep(1)" class="btn-secondary text-sm mt-4">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Agregar mas categorias
                </button>
            </div>

            <!-- Summary Sidebar -->
            <div class="lg:w-80 lg:sticky lg:top-24 lg:self-start">
                ${renderSummary(totals)}
            </div>
        </div>`;
    }

    function renderServiceCard(svc) {
        const isSelected = state.selectedServices[svc.id];
        const svcExtras = state.extras[svc.id] || {};
        const isRecommended = state.recommendedCategories.length > 0;

        return `
        <div class="card-modern ${isSelected ? 'border-cd-highlight' : ''}" style="${isSelected ? 'box-shadow: 0 0 0 1px var(--cd-highlight-color);' : ''}">
            <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <h4 class="font-bold">${svc.name}</h4>
                        ${svc.setupFee ? '<span class="badge text-xs">Suscripcion</span>' : ''}
                    </div>
                    <p class="text-sm text-cd-text-dim mb-2">${svc.description}</p>
                    <div class="flex flex-wrap gap-1 mb-3">
                        ${svc.features.map(f => `<span class="text-xs px-2 py-0.5 rounded-full" style="background: var(--cd-surface); color: var(--cd-text-muted);">${f}</span>`).join('')}
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-lg" style="color: var(--cd-highlight-color);">$${svc.basePrice} USD${svc.priceType === 'monthly' ? '/mes' : ''}</span>
                        <span class="text-sm text-cd-text-dim line-through">$${svc.marketValue}</span>
                        ${svc.setupFee ? `<span class="text-xs text-cd-text-dim">+ $${svc.setupFee} inicio</span>` : ''}
                    </div>
                </div>
                <button onclick="window.calcToggleService('${svc.id}')"
                    class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-cd-highlight text-white' : ''}"
                    style="${!isSelected ? 'background: var(--cd-surface); color: var(--cd-text-dim);' : 'background: var(--cd-highlight-color);'}">
                    <i data-lucide="${isSelected ? 'check' : 'plus'}" class="w-5 h-5"></i>
                </button>
            </div>

            ${isSelected && svc.extras.length > 0 ? `
                <div class="mt-4 pt-4 space-y-2" style="border-top: 1px solid var(--cd-border);">
                    <p class="text-xs font-semibold text-cd-text-dim uppercase tracking-wider mb-2">Extras opcionales</p>
                    ${svc.extras.map(extra => {
                        const extraSelected = svcExtras[extra.id];
                        if (extra.type === 'counter') {
                            const count = state.counters[`${svc.id}-${extra.id}`] || 1;
                            return `
                            <div class="flex items-center justify-between p-3 rounded-lg" style="background: var(--cd-surface);">
                                <div>
                                    <p class="text-sm font-semibold">${extra.name}</p>
                                    <p class="text-xs text-cd-text-dim">${extra.description}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-bold" style="color: var(--cd-highlight-color);">$${extra.price * count}</span>
                                    <button onclick="window.calcUpdateCounter('${svc.id}', '${extra.id}', -1)" class="w-7 h-7 rounded flex items-center justify-center text-sm" style="background: var(--cd-base);">-</button>
                                    <span class="text-sm font-bold w-6 text-center">${count}</span>
                                    <button onclick="window.calcUpdateCounter('${svc.id}', '${extra.id}', 1)" class="w-7 h-7 rounded flex items-center justify-center text-sm" style="background: var(--cd-base);">+</button>
                                </div>
                            </div>`;
                        }
                        return `
                        <label class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:opacity-80" style="background: var(--cd-surface);">
                            <div class="flex-1">
                                <p class="text-sm font-semibold">${extra.name}</p>
                                <p class="text-xs text-cd-text-dim">${extra.description}</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-bold" style="color: var(--cd-highlight-color);">+$${extra.price}${extra.type === 'monthly' ? '/mes' : ''}</span>
                                <input type="checkbox" ${extraSelected ? 'checked' : ''} onchange="window.calcToggleExtra('${svc.id}', '${extra.id}')"
                                    class="w-5 h-5 rounded accent-cd-highlight">
                            </div>
                        </label>`;
                    }).join('')}
                </div>
            ` : ''}
        </div>`;
    }

    function renderSummary(totals) {
        const selectedList = Object.entries(state.selectedServices)
            .filter(([k, v]) => v && !k.endsWith('-selected'))
            .map(([k]) => getServiceById(k))
            .filter(Boolean);

        return `
        <div class="card-modern p-6 sticky top-24">
            <h3 class="font-bold text-lg mb-4">Resumen</h3>

            ${selectedList.length === 0 ? `
                <p class="text-sm text-cd-text-dim text-center py-8">Selecciona servicios para ver el resumen</p>
            ` : `
                <div class="space-y-2 mb-4">
                    ${selectedList.map(svc => `
                        <div class="flex justify-between text-sm">
                            <span class="text-cd-text-muted">${svc.name}</span>
                            <span class="font-semibold">$${svc.basePrice}${svc.priceType === 'monthly' ? '/mes' : ''}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="pt-4 space-y-2" style="border-top: 1px solid var(--cd-border);">
                    ${totals.oneTime > 0 ? `
                        <div class="flex justify-between">
                            <span class="text-sm text-cd-text-dim">Pago unico</span>
                            <span class="font-bold text-lg">$${totals.oneTime.toLocaleString()} USD</span>
                        </div>
                    ` : ''}
                    ${totals.monthly > 0 ? `
                        <div class="flex justify-between">
                            <span class="text-sm text-cd-text-dim">Mensual</span>
                            <span class="font-bold text-lg">$${totals.monthly.toLocaleString()} USD/mes</span>
                        </div>
                    ` : ''}
                    ${totals.savings > 0 ? `
                        <div class="flex justify-between items-center mt-2 p-2 rounded-lg" style="background: rgba(34, 197, 94, 0.1);">
                            <span class="text-sm text-green-400">Ahorras</span>
                            <span class="font-bold text-green-400">$${totals.savings.toLocaleString()} USD</span>
                        </div>
                    ` : ''}
                </div>
            `}

            <button onclick="window.calcGoToStep(3)" class="btn-primary w-full mt-6 justify-center py-3 ${selectedList.length === 0 ? 'opacity-50 pointer-events-none' : ''}">
                Solicitar Cotizacion <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>`;
    }

    function renderStep3(container) {
        const totals = calculateTotals();
        const selectedList = Object.entries(state.selectedServices)
            .filter(([k, v]) => v && !k.endsWith('-selected'))
            .map(([k]) => getServiceById(k))
            .filter(Boolean);

        container.innerHTML = `
        ${renderStepIndicator()}
        <div class="text-center mb-10">
            <h2 class="text-3xl md:text-4xl font-black mb-3">Recibe tu cotizacion</h2>
            <p class="text-cd-text-dim max-w-xl mx-auto">Completa tus datos y te enviaremos la propuesta detallada.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
            <div class="flex-1">
                <form id="quote-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold mb-1">Nombre completo *</label>
                        <input type="text" id="q-name" required placeholder="Tu nombre"
                            class="w-full px-4 py-3 rounded-lg text-sm" style="background: var(--cd-input-bg); border: 1px solid var(--cd-input-border); color: var(--cd-cream);">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Empresa</label>
                        <input type="text" id="q-company" placeholder="Nombre de tu empresa"
                            class="w-full px-4 py-3 rounded-lg text-sm" style="background: var(--cd-input-bg); border: 1px solid var(--cd-input-border); color: var(--cd-cream);">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Email *</label>
                        <input type="email" id="q-email" required placeholder="tu@email.com"
                            class="w-full px-4 py-3 rounded-lg text-sm" style="background: var(--cd-input-bg); border: 1px solid var(--cd-input-border); color: var(--cd-cream);">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">WhatsApp / Telefono *</label>
                        <input type="tel" id="q-phone" required placeholder="+57 312 290 8416"
                            class="w-full px-4 py-3 rounded-lg text-sm" style="background: var(--cd-input-bg); border: 1px solid var(--cd-input-border); color: var(--cd-cream);">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Comentarios adicionales</label>
                        <textarea id="q-comments" rows="3" placeholder="Cuentanos mas sobre tu proyecto..."
                            class="w-full px-4 py-3 rounded-lg text-sm resize-none" style="background: var(--cd-input-bg); border: 1px solid var(--cd-input-border); color: var(--cd-cream);"></textarea>
                    </div>

                    <div class="flex gap-3 pt-4">
                        <button type="button" onclick="window.calcGoToStep(2)" class="btn-secondary flex-1 justify-center py-3">
                            <i data-lucide="arrow-left" class="w-4 h-4"></i> Volver
                        </button>
                        <button type="submit" id="q-submit" class="btn-primary flex-1 justify-center py-3">
                            Enviar Cotizacion <i data-lucide="send" class="w-4 h-4"></i>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Final Summary -->
            <div class="lg:w-80">
                <div class="card-modern p-6">
                    <h3 class="font-bold mb-4">Tu seleccion</h3>
                    <div class="space-y-2 mb-4">
                        ${selectedList.map(svc => `
                            <div class="flex justify-between text-sm">
                                <span class="text-cd-text-muted">${svc.name}</span>
                                <span class="font-semibold">$${svc.basePrice}${svc.priceType === 'monthly' ? '/mes' : ''}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="pt-4 space-y-2" style="border-top: 1px solid var(--cd-border);">
                        ${totals.oneTime > 0 ? `
                            <div class="flex justify-between">
                                <span class="text-sm text-cd-text-dim">Pago unico</span>
                                <span class="font-bold">$${totals.oneTime.toLocaleString()} USD</span>
                            </div>
                        ` : ''}
                        ${totals.monthly > 0 ? `
                            <div class="flex justify-between">
                                <span class="text-sm text-cd-text-dim">Mensual</span>
                                <span class="font-bold">$${totals.monthly.toLocaleString()} USD/mes</span>
                            </div>
                        ` : ''}
                    </div>
                    <p class="text-xs text-cd-text-dim mt-4">* Precios estimados. La cotizacion final puede variar segun evaluacion tecnica.</p>
                </div>
            </div>
        </div>`;

        // Form submit handler
        setTimeout(() => {
            const form = document.getElementById('quote-form');
            if (form) form.addEventListener('submit', handleSubmit);
        }, 100);
    }

    // ==========================================
    // ACTIONS
    // ==========================================
    window.calcSelectCategory = function(categoryId) {
        const key = categoryId + '-selected';
        state.selectedServices[key] = !state.selectedServices[key];

        if (state.selectedServices[key]) {
            const cat = SERVICES_DB.find(c => c.category === categoryId);
            if (cat) cat.services.forEach(s => {
                if (state.selectedServices[s.id] === undefined) state.selectedServices[s.id] = false;
            });
        }

        render();
    };

    window.calcToggleService = function(serviceId) {
        state.selectedServices[serviceId] = !state.selectedServices[serviceId];
        if (!state.selectedServices[serviceId]) {
            delete state.extras[serviceId];
        }
        render();
    };

    window.calcToggleExtra = function(serviceId, extraId) {
        if (!state.extras[serviceId]) state.extras[serviceId] = {};
        state.extras[serviceId][extraId] = !state.extras[serviceId][extraId];
        render();
    };

    window.calcUpdateCounter = function(serviceId, extraId, delta) {
        const key = `${serviceId}-${extraId}`;
        if (!state.extras[serviceId]) state.extras[serviceId] = {};
        state.extras[serviceId][extraId] = true;
        state.counters[key] = Math.max(1, (state.counters[key] || 1) + delta);
        render();
    };

    window.calcGoToStep = function(step) {
        if (step === 2 && getSelectedCount() === 0) {
            // Auto-select all services in selected categories
            SERVICES_DB.forEach(cat => {
                if (state.selectedServices[cat.category + '-selected']) {
                    cat.services.forEach(s => {
                        if (!state.selectedServices[s.id]) state.selectedServices[s.id] = false;
                    });
                }
            });
        }
        state.step = step;
        render();
        window.scrollTo({ top: document.getElementById('calculator-app').offsetTop - 100, behavior: 'smooth' });
    };

    window.calcStartQuiz = function() {
        state.quizAnswers = [];
        state.recommendedCategories = [];
        renderQuizQuestion(0);
    };

    function renderQuizQuestion(index) {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer || index >= QUIZ_QUESTIONS.length) {
            // Quiz complete - apply recommendations
            applyQuizRecommendations();
            return;
        }

        const q = QUIZ_QUESTIONS[index];
        quizContainer.innerHTML = `
        <div class="card-modern max-w-xl mx-auto p-6 animate-fade-in">
            <p class="text-xs text-cd-text-dim mb-1">Pregunta ${index + 1} de ${QUIZ_QUESTIONS.length}</p>
            <h3 class="font-bold text-lg mb-4">${q.question}</h3>
            <div class="space-y-2">
                ${q.options.map(opt => `
                    <button onclick="window.calcAnswerQuiz(${index}, '${opt.value}')"
                        class="w-full text-left p-3 rounded-lg text-sm font-medium transition-colors"
                        style="background: var(--cd-surface); border: 1px solid var(--cd-border);"
                        onmouseover="this.style.borderColor='var(--cd-highlight-color)'"
                        onmouseout="this.style.borderColor='var(--cd-border)'">
                        ${opt.label}
                    </button>
                `).join('')}
            </div>
        </div>`;
    }

    window.calcAnswerQuiz = function(index, value) {
        const q = QUIZ_QUESTIONS[index];
        const selected = q.options.find(o => o.value === value);
        if (selected) {
            state.quizAnswers.push(value);
            selected.recommend.forEach(cat => {
                if (!state.recommendedCategories.includes(cat)) {
                    state.recommendedCategories.push(cat);
                }
            });
        }
        renderQuizQuestion(index + 1);
    };

    function applyQuizRecommendations() {
        state.recommendedCategories.forEach(catId => {
            state.selectedServices[catId + '-selected'] = true;
            const cat = SERVICES_DB.find(c => c.category === catId);
            if (cat) cat.services.forEach(s => { state.selectedServices[s.id] = false; });
        });
        render();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('q-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando... <i data-lucide="loader" class="w-4 h-4 animate-spin"></i>';
        submitBtn.disabled = true;
        if (window.lucide) window.lucide.createIcons();

        const totals = calculateTotals();
        const selectedList = Object.entries(state.selectedServices)
            .filter(([k, v]) => v && !k.endsWith('-selected'))
            .map(([k]) => getServiceById(k))
            .filter(Boolean);

        const formData = new FormData();
        formData.append('formType', 'quote_calculator_v2');
        formData.append('requester', document.getElementById('q-name').value);
        formData.append('company', document.getElementById('q-company').value || 'N/A');
        formData.append('contactMethod', 'email');
        formData.append('contactValue', document.getElementById('q-email').value);
        formData.append('phone', document.getElementById('q-phone').value);
        formData.append('comments', document.getElementById('q-comments').value || '');
        formData.append('services', JSON.stringify(selectedList.map(s => s.name)));
        formData.append('totalOneTime', totals.oneTime);
        formData.append('totalMonthly', totals.monthly);
        formData.append('totalSavings', totals.savings);
        formData.append('quizAnswers', JSON.stringify(state.quizAnswers));
        formData.append('message', `
**Cotizacion Automatica**
Servicios: ${selectedList.map(s => s.name).join(', ')}
Pago unico: $${totals.oneTime} USD
Mensual: $${totals.monthly} USD/mes
Ahorro estimado: $${totals.savings} USD
Telefono: ${document.getElementById('q-phone').value}
Comentarios: ${document.getElementById('q-comments').value || 'Ninguno'}
        `);

        try {
            const response = await fetch(N8N_WEBHOOK_URL, { method: 'POST', body: formData });
            if (response.ok) {
                container_showSuccess(totals, selectedList);
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            console.error(error);
            alert('Error al enviar. Intenta de nuevo o contactanos por WhatsApp.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            if (window.lucide) window.lucide.createIcons();
        }
    }

    function container_showSuccess(totals, selectedList) {
        const container = document.getElementById('calculator-app');
        const phone = document.getElementById('q-phone')?.value || '';
        const waMessage = encodeURIComponent(`Hola! Acabo de cotizar en su web. Servicios: ${selectedList.map(s => s.name).join(', ')}. Total estimado: $${totals.oneTime} USD + $${totals.monthly}/mes.`);

        container.innerHTML = `
        <div class="text-center max-w-lg mx-auto py-12 animate-fade-in">
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background: rgba(34, 197, 94, 0.15);">
                <i data-lucide="check-circle" class="w-10 h-10 text-green-400"></i>
            </div>
            <h2 class="text-3xl font-black mb-3">Cotizacion Enviada!</h2>
            <p class="text-cd-text-dim mb-8">Hemos recibido tu solicitud. Nuestro equipo te contactara en menos de 2 horas con una propuesta detallada.</p>
            <div class="card-modern p-4 mb-8 text-left">
                <div class="flex justify-between mb-2">
                    <span class="text-sm text-cd-text-dim">Inversion unica</span>
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
                <a href="https://wa.me/573122908416?text=${waMessage}" target="_blank" class="btn-primary justify-center py-3 px-6">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> Hablar por WhatsApp
                </a>
                <a href="/" class="btn-secondary justify-center py-3 px-6">
                    Volver al inicio
                </a>
            </div>
        </div>`;

        if (window.lucide) window.lucide.createIcons();
    }

    // ==========================================
    // INIT
    // ==========================================
    window.initCalculator = function() {
        // Check hash for pre-selected category
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const cat = SERVICES_DB.find(c => c.category === hash);
            if (cat) {
                state.selectedServices[hash + '-selected'] = true;
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
