/**
 * Calculator Module - Cotizador Amigable v3
 * Diseñado para guiar al cliente inexperto paso a paso.
 * Conserva toda la lógica de negocio original.
 */

(function() {
    'use strict';

    const N8N_WEBHOOK_URL = 'https://n8n.cambiodigital.cloud/webhook/c1692d85-8ad6-4977-b484-541c16463d0a';

    // ==========================================
    // SERVICE DATABASE (con beneficios en lenguaje claro)
    // ==========================================
    const SERVICES_DB = [
        {
            category: 'ventas',
            categoryName: 'Vender más',
            categoryIcon: 'trending-up',
            categoryDescription: 'Herramientas para atraer clientes y cerrar ventas automáticamente.',
            services: [
                {
                    id: 'ai-sales-agent',
                    name: 'Agente IA de Ventas',
                    description: 'Un vendedor virtual que califica leads, agenda reuniones y responde 24/7.',
                    benefit: 'Podrías cerrar hasta un 30% más de ventas sin contratar personal.',
                    basePrice: 350,
                    marketValue: 600,
                    priceType: 'one-time',
                    features: ['Califica leads', 'Agenda citas', 'RespondeWhatsApp'],
                    extras: [
                        { id: 'calendar-integration', name: 'Google Calendar', price: 50, type: 'one-time', description: 'Sincroniza automáticamente las citas' },
                        { id: 'crm-sync', name: 'Conexión con CRM', price: 80, type: 'one-time', description: 'Todos los leads guardados en tu CRM' },
                        { id: 'ai-token-premium', name: 'IA Premium (GPT-4)', price: 80, type: 'monthly', description: 'Respuestas más inteligentes y naturales' }
                    ]
                },
                {
                    id: 'mass-messaging',
                    name: 'Mensajes Masivos',
                    description: 'Envía promociones o recordatorios a cientos de clientes por WhatsApp o email.',
                    benefit: 'Recupera clientes inactivos y aumenta tus ventas recurrentes.',
                    basePrice: 150,
                    marketValue: 250,
                    priceType: 'one-time',
                    features: ['Segmentación', 'Plantillas', 'Reportes'],
                    extras: [
                        { id: 'template-design', name: 'Diseño de Plantillas (x5)', price: 60, type: 'one-time', description: '5 plantillas profesionales' },
                        { id: 'whatsapp-broadcast', name: 'WhatsApp Business API', price: 30, type: 'monthly', description: 'Envíos masivos por WhatsApp' }
                    ]
                }
            ]
        },
        {
            category: 'tiempo',
            categoryName: 'Ahorrar tiempo',
            categoryIcon: 'clock',
            categoryDescription: 'Automatiza tareas repetitivas y concéntrate en lo importante.',
            services: [
                {
                    id: 'chatbot-essential',
                    name: 'Chatbot Básico',
                    description: 'Responde automáticamente las preguntas frecuentes de tus clientes.',
                    benefit: 'Ahorra hasta 15 horas al mes en atención al cliente.',
                    basePrice: 180,
                    marketValue: 300,
                    priceType: 'one-time',
                    features: ['Respuestas rápidas', 'Árbol de decisiones', 'Multi-canal'],
                    extras: [
                        { id: 'ai-gpt', name: 'IA (ChatGPT)', price: 50, type: 'monthly', description: 'Respuestas inteligentes' },
                        { id: 'whatsapp-api', name: 'WhatsApp API', price: 30, type: 'monthly', description: 'Conéctalo a WhatsApp' }
                    ]
                },
                {
                    id: 'crm-restructure',
                    name: 'Reorganización de CRM',
                    description: 'Ordenamos tu base de clientes y automatizamos tareas manuales.',
                    benefit: 'Ahorra 10h/semana en gestión de clientes.',
                    basePrice: 250,
                    marketValue: 450,
                    priceType: 'one-time',
                    features: ['Limpieza de datos', 'Pipelines automáticos', 'Etiquetas'],
                    extras: [
                        { id: 'data-migration', name: 'Migración de Datos (+1000)', price: 100, type: 'one-time', description: 'Transfiere tu base de datos' }
                    ]
                },
                {
                    id: 'automation-audit',
                    name: 'Auditoría de Automatización',
                    description: 'Analizamos tu negocio y te decimos qué puedes automatizar.',
                    benefit: 'Identifica oportunidades para ahorrar tiempo de inmediato.',
                    basePrice: 200,
                    marketValue: 350,
                    priceType: 'one-time',
                    features: ['Mapa de procesos', 'ROI estimado', 'Plan a medida'],
                    extras: [
                        { id: 'implementation-plan', name: 'Plan de Implementación', price: 100, type: 'one-time', description: 'Paso a paso detallado' }
                    ]
                }
            ]
        },
        {
            category: 'web',
            categoryName: 'Presencia online',
            categoryIcon: 'globe',
            categoryDescription: 'Sitios web profesionales que atraen clientes.',
            services: [
                {
                    id: 'web-basic',
                    name: 'Página Web Esencial',
                    description: 'Tu negocio en internet con diseño profesional y optimizado para móviles.',
                    benefit: 'Capta clientes las 24 horas con una presencia online impecable.',
                    basePrice: 400,
                    marketValue: 650,
                    priceType: 'one-time',
                    features: ['3 secciones', 'Responsive', 'SEO básico'],
                    extras: [
                        { id: 'copywriting', name: 'Redacción Profesional', price: 50, type: 'one-time', description: 'Textos que venden' }
                    ]
                },
                {
                    id: 'web-custom',
                    name: 'Página Web Personalizada',
                    description: 'Diseño exclusivo con funciones a tu medida (formularios, integraciones).',
                    benefit: 'Diferénciate de la competencia y convierte más visitas.',
                    basePrice: 800,
                    marketValue: 1200,
                    priceType: 'one-time',
                    features: ['Diseño único', 'SEO avanzado', 'Integraciones'],
                    extras: [
                        { id: 'chatbot-integration', name: 'Chatbot Integrado', price: 150, type: 'one-time', description: 'Atención 24/7 en tu web' }
                    ]
                },
                {
                    id: 'ecommerce',
                    name: 'Tienda Online',
                    description: 'Vende por internet con catálogo de productos, pagos y envíos.',
                    benefit: 'Aumenta tus ventas llegando a clientes de todo el país.',
                    basePrice: 2400,
                    marketValue: 3500,
                    priceType: 'one-time',
                    features: ['Pasarela de pago', 'Gestión de inventario', 'Panel admin'],
                    extras: [
                        { id: 'priority-load', name: 'Optimización de velocidad', price: 200, type: 'one-time', description: 'Carga ultra rápida' }
                    ]
                }
            ]
        },
        {
            category: 'soporte',
            categoryName: 'Soporte continuo',
            categoryIcon: 'shield',
            categoryDescription: 'Planes de mantenimiento y soporte para que no te preocupes por nada.',
            services: [
                {
                    id: 'web-maintenance',
                    name: 'Mantenimiento Web',
                    description: 'Actualizaciones, copias de seguridad y monitoreo 24/7.',
                    benefit: 'Tu web siempre segura, rápida y sin caídas.',
                    basePrice: 50,
                    marketValue: 100,
                    priceType: 'monthly',
                    features: ['Backups semanales', 'Actualizaciones', 'Monitoreo'],
                    extras: [
                        { id: 'content-updates', name: 'Actualizaciones de contenido (4/mes)', price: 30, type: 'monthly', description: 'Cambios mensuales' }
                    ]
                },
                {
                    id: 'it-partner-standard',
                    name: 'IT Partner Estándar',
                    description: 'Soporte técnico prioritario y revisiones semanales.',
                    benefit: 'Tu equipo de tecnología externo, disponible cuando lo necesitas.',
                    basePrice: 50,
                    marketValue: 150,
                    priceType: 'monthly',
                    features: ['SLA <2h', 'Revisión semanal', '2h capacitación/mes'],
                    setupFee: 150,
                    setupLabel: 'Fase de estabilización (3 meses)',
                    extras: []
                }
            ]
        }
    ];

    // ==========================================
    // QUESTIONS PARA EL PASO 1 (objetivos)
    // ==========================================
    const GOAL_QUESTIONS = [
        {
            question: '¿Qué es lo más importante para tu negocio hoy?',
            options: [
                { label: 'Vender más', value: 'ventas', icon: 'trending-up', description: 'Quiero conseguir más clientes y aumentar ingresos.' },
                { label: 'Ahorrar tiempo', value: 'tiempo', icon: 'clock', description: 'Quiero automatizar tareas y dedicarme a lo importante.' },
                { label: 'Tener presencia online', value: 'web', icon: 'globe', description: 'Necesito una web profesional o mejorar la que tengo.' },
                { label: 'Soporte y tranquilidad', value: 'soporte', icon: 'shield', description: 'Quiero que alguien se encargue de la tecnología por mí.' }
            ]
        }
    ];

    // ==========================================
    // STATE
    // ==========================================
    const state = {
        step: 1,                 // 1: objetivo, 2: servicios, 3: resumen
        selectedGoal: null,
        selectedServices: {},
        extras: {},
        counters: {},
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

    function getSelectedServices() {
        return Object.entries(state.selectedServices)
            .filter(([k, v]) => v)
            .map(([k]) => getServiceById(k))
            .filter(Boolean);
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
        <div class="flex items-center justify-center gap-2 mb-8">
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
        const q = GOAL_QUESTIONS[0];
        container.innerHTML = `
        ${renderStepIndicator()}
        <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-black mb-3">¿Qué necesitas?</h2>
            <p class="text-cd-text-dim max-w-xl mx-auto">Responde esta pregunta y te mostraremos las soluciones ideales para ti.</p>
        </div>
        <div class="max-w-2xl mx-auto space-y-3">
            ${q.options.map(opt => `
                <button onclick="window.calcSelectGoal('${opt.value}')"
                    class="w-full text-left p-5 rounded-xl transition-all hover:scale-105 flex items-center gap-4"
                    style="background: var(--cd-surface); border: 2px solid ${state.selectedGoal === opt.value ? 'var(--cd-highlight-color)' : 'transparent'};">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background: rgba(236, 192, 126, 0.1);">
                        <i data-lucide="${opt.icon}" class="w-6 h-6" style="color: var(--cd-highlight-color);"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg">${opt.label}</h3>
                        <p class="text-sm text-cd-text-dim">${opt.description}</p>
                    </div>
                </button>
            `).join('')}
        </div>
        <div class="flex justify-center mt-8">
            <button onclick="window.calcGoToStep(2)" class="btn-primary text-lg px-10 py-3 ${!state.selectedGoal ? 'opacity-50 pointer-events-none' : ''}">
                Continuar <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
        </div>`;
    }

    function renderStep2(container) {
        const goalCategory = state.selectedGoal;
        const category = SERVICES_DB.find(c => c.category === goalCategory);
        if (!category) return;

        const totals = calculateTotals();

        container.innerHTML = `
        ${renderStepIndicator()}
        <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-black mb-3">${category.categoryName}</h2>
            <p class="text-cd-text-dim max-w-xl mx-auto">${category.categoryDescription} Elige lo que necesitas (puedes seleccionar varios).</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <!-- Servicios -->
            <div class="flex-1 space-y-4">
                ${category.services.map(svc => renderServiceCard(svc)).join('')}

                <div class="flex gap-3 pt-4">
                    <button onclick="window.calcGoToStep(1)" class="btn-secondary flex-1 justify-center py-3">
                        <i data-lucide="arrow-left" class="w-4 h-4"></i> Cambiar objetivo
                    </button>
                    <button onclick="window.calcGoToStep(3)" class="btn-primary flex-1 justify-center py-3 ${getSelectedServices().length === 0 ? 'opacity-50 pointer-events-none' : ''}">
                        Ver resumen <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>

            <!-- Mini resumen -->
            <div class="lg:w-80">
                <div class="card-modern p-6 sticky top-24">
                    <h3 class="font-bold text-lg mb-4">Tu selección actual</h3>
                    <div id="mini-summary">
                        ${renderMiniSummary()}
                    </div>
                </div>
            </div>
        </div>`;
    }

    function renderServiceCard(svc) {
        const isSelected = state.selectedServices[svc.id];
        const svcExtras = state.extras[svc.id] || {};

        return `
        <div class="card-modern ${isSelected ? 'border-cd-highlight' : ''}" style="transition: all 0.2s;">
            <div class="flex items-start gap-4">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <h4 class="font-bold text-lg">${svc.name}</h4>
                        ${svc.setupFee ? '<span class="badge text-xs">Plan recurrente</span>' : ''}
                    </div>
                    <p class="text-sm text-cd-text-dim mb-2">${svc.description}</p>
                    <p class="text-sm font-semibold mb-2" style="color: var(--cd-highlight-color);">✨ ${svc.benefit}</p>
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
                    class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-cd-highlight text-white' : ''}"
                    style="${!isSelected ? 'background: var(--cd-surface); color: var(--cd-text-dim);' : 'background: var(--cd-highlight-color);'}">
                    <i data-lucide="${isSelected ? 'check' : 'plus'}" class="w-6 h-6"></i>
                </button>
            </div>

            ${isSelected && svc.extras.length > 0 ? `
                <div class="mt-4 pt-4 space-y-2" style="border-top: 1px solid var(--cd-border);" onclick="event.stopPropagation()">
                    <p class="text-xs font-semibold text-cd-text-dim uppercase tracking-wider mb-2">Mejoras opcionales</p>
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
                                    <button onclick="window.calcUpdateCounter('${svc.id}', 'extra.id', 1)" class="w-7 h-7 rounded flex items-center justify-center text-sm" style="background: var(--cd-base);">+</button>
                                </div>
                            </div>`;
                        }
                        return `
                        <label class="flex items-center justify-between p-3 rounded-lg cursor-pointer" style="background: var(--cd-surface);">
                            <div>
                                <p class="text-sm font-semibold">${extra.name}</p>
                                <p class="text-xs text-cd-text-dim">${extra.description}</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-bold" style="color: var(--cd-highlight-color);">+$${extra.price}${extra.type === 'monthly' ? '/mes' : ''}</span>
                                <input type="checkbox" ${extraSelected ? 'checked' : ''} onchange="window.calcToggleExtra('${svc.id}', '${extra.id}')" class="w-5 h-5 rounded accent-cd-highlight">
                            </div>
                        </label>`;
                    }).join('')}
                </div>
            ` : ''}
        </div>`;
    }

    function renderMiniSummary() {
        const selected = getSelectedServices();
        if (selected.length === 0) {
            return '<p class="text-sm text-cd-text-dim text-center py-4">Aún no has elegido ningún servicio.</p>';
        }
        return selected.map(s => `
            <div class="flex justify-between text-sm mb-2">
                <span class="text-cd-text-muted">${s.name}</span>
                <span class="font-semibold">$${s.basePrice}${s.priceType === 'monthly' ? '/mes' : ''}</span>
            </div>
        `).join('');
    }

    function renderStep3(container) {
        const selected = getSelectedServices();
        const totals = calculateTotals();
        const benefits = selected.map(s => s.benefit).filter(Boolean).join(' • ');

        // Preparar mensaje para WhatsApp
        const waMessage = encodeURIComponent(
            `Hola! Quiero contratar los siguientes servicios:\n\n` +
            selected.map(s => `✅ ${s.name} ($${s.basePrice} ${s.priceType === 'monthly' ? '/mes' : 'único'})`).join('\n') +
            `\n\n💰 Total: $${totals.oneTime} USD únicos + $${totals.monthly}/mes\n` +
            `✨ Beneficios: ${benefits}\n\n¿Podemos agendar una reunión?`
        );

        container.innerHTML = `
        ${renderStepIndicator()}
        <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-black mb-3">¡Listo! Este es tu plan</h2>
            <p class="text-cd-text-dim max-w-xl mx-auto">Revisa tu selección y envíanosla por WhatsApp para recibir una propuesta detallada.</p>
        </div>

        <div class="max-w-2xl mx-auto">
            <div class="card-modern p-6 mb-6">
                <h3 class="font-bold text-lg mb-4">Resumen de servicios</h3>
                <div class="space-y-3">
                    ${selected.map(s => `
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="font-semibold">${s.name}</p>
                                <p class="text-xs text-cd-text-dim">${s.benefit}</p>
                            </div>
                            <span class="font-bold">$${s.basePrice}${s.priceType === 'monthly' ? '/mes' : ''}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-6 pt-4 space-y-2" style="border-top: 1px solid var(--cd-border);">
                    ${totals.oneTime > 0 ? `
                        <div class="flex justify-between">
                            <span class="text-cd-text-dim">Pago único</span>
                            <span class="font-bold text-xl" style="color: var(--cd-highlight-color);">$${totals.oneTime} USD</span>
                        </div>
                    ` : ''}
                    ${totals.monthly > 0 ? `
                        <div class="flex justify-between">
                            <span class="text-cd-text-dim">Mensualidad</span>
                            <span class="font-bold text-xl" style="color: var(--cd-highlight-color);">$${totals.monthly} USD/mes</span>
                        </div>
                    ` : ''}
                    ${totals.savings > 0 ? `
                        <div class="flex justify-between items-center p-3 rounded-lg" style="background: rgba(34, 197, 94, 0.1);">
                            <span class="text-sm text-green-400">Ahorro estimado</span>
                            <span class="font-bold text-green-400">$${totals.savings} USD</span>
                        </div>
                    ` : ''}
                </div>

                <div class="mt-6 p-4 rounded-lg" style="background: var(--cd-surface);">
                    <p class="text-sm font-semibold mb-2">✨ Beneficios clave:</p>
                    <p class="text-sm text-cd-text-dim">${benefits || 'Selecciona servicios para ver beneficios.'}</p>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/573122908416?text=${waMessage}" target="_blank" class="btn-primary flex-1 justify-center py-4 text-lg">
                    <i data-lucide="message-circle" class="w-5 h-5"></i> Enviar por WhatsApp
                </a>
                <button onclick="window.calcGoToStep(2)" class="btn-secondary flex-1 justify-center py-4">
                    <i data-lucide="edit" class="w-5 h-5"></i> Ajustar selección
                </button>
            </div>

            <p class="text-xs text-cd-text-dim text-center mt-4">* Recibirás una cotización formal por WhatsApp en menos de 2 horas.</p>
        </div>`;
    }

    // ==========================================
    // ACTIONS
    // ==========================================
    window.calcSelectGoal = function(goal) {
        state.selectedGoal = goal;
        // Reiniciar servicios seleccionados para este objetivo
        state.selectedServices = {};
        state.extras = {};
        state.counters = {};
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
        if (step === 2 && !state.selectedGoal) {
            alert('Por favor, selecciona un objetivo primero.');
            return;
        }
        state.step = step;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ==========================================
    // INIT
    // ==========================================
    window.initCalculator = function() {
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