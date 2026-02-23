/**
 * Cotizador Inteligente v3 - "Soluciones Paso a Paso"
 * Enfoque: UX guiada para usuarios no técnicos.
 */

(function() {
  'use strict';

  // ==========================================
  // BASE DE DATOS DE SERVICIOS (Simplificada y Orientada a Beneficios)
  // ==========================================
  const SOLUTIONS_DB = [
    {
      id: 'presencia-web',
      name: 'Presencia Digital Profesional',
      icon: 'globe',
      painPoint: 'Necesito que mi negocio se vea profesional en internet',
      description: 'Ideal para negocios nuevos o que necesitan renovar su imagen.',
      services: {
        micro: [
          { id: 'domain', name: 'Mi dominio propio (.com)', price: 40, type: 'unique', description: 'Reserva tu nombre en internet' }
        ],
        base: [
          { id: 'web-landing', name: 'Landing de Impacto', price: 250, type: 'unique', popular: false },
          { id: 'web-essential', name: 'Página Web Esencial', price: 400, type: 'unique', popular: true, description: 'La mejor opción para empezar.' },
          { id: 'web-pro', name: 'Web Corporativa Avanzada', price: 800, type: 'unique', popular: false }
        ]
      }
    },
    {
      id: 'vender-online',
      name: 'Vender por Internet',
      icon: 'shopping-cart',
      painPoint: 'Quiero vender mis productos y cobrar online automáticamente',
      description: 'Tiendas online listas para recibir pedidos.',
      services: {
        micro: [
          { id: 'payment-gateway', name: 'Configurar Pasarela de Pagos', price: 80, type: 'unique', description: 'Acepta tarjetas y Nequi' }
        ],
        base: [
          { id: 'store-start', name: 'Tienda Esencial', price: 800, type: 'unique', popular: true, description: 'Hasta 10 productos, lista para vender.' },
          { id: 'store-pro', name: 'Tienda Profesional', price: 2400, type: 'unique', popular: false, description: 'Catálogo ilimitado y diseño exclusivo.' }
        ]
      }
    },
    {
      id: 'automatizar-atencion',
      name: 'Atención 24/7 con IA',
      icon: 'bot',
      painPoint: 'Pierdo clientes por no contestar mensajes a tiempo',
      description: 'Robots que atienden y agendan por ti mientras duermes.',
      services: {
        micro: [
          { id: 'wa-api', name: 'Canal WhatsApp Oficial', price: 30, type: 'monthly', description: 'Verificación verde de WhatsApp' }
        ],
        base: [
          { id: 'bot-basic', name: 'Chatbot Básico', price: 180, type: 'unique', popular: false, description: 'Respuestas automáticas por botones.' },
          { id: 'bot-ia', name: 'Asistente Inteligente (IA)', price: 350, type: 'unique', popular: true, description: 'Entiende y responde como un humano.' },
          { id: 'sales-agent', name: 'Agente de Ventas Automático', price: 600, type: 'unique', popular: false, description: 'Vende y agenda citas solo.' }
        ]
      }
    },
    {
      id: 'soporte-mejoras',
      name: 'Soporte y Mantenimiento',
      icon: 'life-buoy',
      painPoint: 'Ya tengo algo pero necesito arreglos o ayuda técnica',
      description: 'Arreglos puntuales o planes de mantenimiento mensual.',
      services: {
        micro: [
          { id: 'hour-support', name: 'Hora de Soporte Técnico', price: 60, type: 'unique', description: 'Cambios, arreglos y mejoras.' }
        ],
        base: [
          { id: 'support-basic', name: 'Plan Cuidado Básico', price: 50, type: 'monthly', popular: true, description: 'Hosting, dominio y backups.' },
          { id: 'support-vip', name: 'Plan IT Partner', price: 200, type: 'monthly', popular: false, description: 'Tu equipo técnico dedicado.' }
        ]
      }
    }
  ];

  // ==========================================
  // ESTADO DE LA APLICACIÓN
  // ==========================================
  const state = {
    step: 1,
    selectedPainPoints: [], // IDs de las soluciones elegidas
    selectedPlans: {},      // { 'presencia-web': 'web-essential', ... }
    selectedMicros: {},     // { 'domain': true, ... }
    counters: {}            // Para micros que sean cantidad
  };

  // ==========================================
  // LÓGICA DE NEGOCIO Y CÁLCULOS
  // ==========================================
  
  function calculateTotals() {
    let oneTime = 0;
    let monthly = 0;
    
    // Calcular bases
    Object.entries(state.selectedPlans).forEach(([solutionId, serviceId]) => {
      const solution = SOLUTIONS_DB.find(s => s.id === solutionId);
      const service = solution.services.base.find(s => s.id === serviceId);
      if (service.type === 'monthly') monthly += service.price;
      else oneTime += service.price;
    });

    // Calcular micros
    Object.entries(state.selectedMicros).forEach(([microId, isSelected]) => {
      if (!isSelected) return;
      
      // Buscar en toda la DB el micro
      SOLUTIONS_DB.forEach(sol => {
        const micro = sol.services.micro.find(m => m.id === microId);
        if (micro) {
            if (micro.type === 'monthly') monthly += micro.price;
            else oneTime += micro.price;
        }
      });
    });

    // Calculamos valor percibido (Ahorro aprox del 20% vs contratar separado)
    const savings = Math.round((oneTime + monthly) * 0.2); 

    return { oneTime, monthly, savings };
  }

  function generateWhatsAppLink() {
    const totals = calculateTotals();
    let text = `Hola! 👋 Me interesa cotizar los siguientes servicios:\n\n`;
    
    // Listar servicios seleccionados
    Object.entries(state.selectedPlans).forEach(([solutionId, serviceId]) => {
      const solution = SOLUTIONS_DB.find(s => s.id === solutionId);
      const service = solution.services.base.find(s => s.id === serviceId);
      text += `✅ *${service.name}* ($${service.price})\n`;
    });

    Object.entries(state.selectedMicros).forEach(([microId, isSelected]) => {
      if (isSelected) {
        SOLUTIONS_DB.forEach(sol => {
          const micro = sol.services.micro.find(m => m.id === microId);
          if (micro) text += `➕ ${micro.name} ($${micro.price})\n`;
        });
      }
    });

    text += `\n💵 *Total Estimado:* $${totals.oneTime} USD (Único) + $${totals.monthly} USD (Mensual)`;
    text += `\n💰 *Ahorro aproximado:* $${totals.savings} USD`;
    
    return `https://wa.me/573122908416?text=${encodeURIComponent(text)}`;
  }

  // ==========================================
  // RENDERIZADO (UI)
  // ==========================================
  
  function render() {
    const app = document.getElementById('calculator-app');
    if (!app) return;

    if (state.step === 1) renderDiagnosis(app);
    else if (state.step === 2) renderCustomization(app);
    else if (state.step === 3) renderSummary(app);

    if (window.lucide) window.lucide.createIcons();
  }

  // PASO 1: Diagnóstico (Seleccionar Problemas)
  function renderDiagnosis(container) {
    container.innerHTML = `
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-black mb-4">¿Qué necesitas hoy?</h2>
        <p class="text-cd-text-dim">Selecciona los objetivos que más te preocupan. Te recomendaremos la mejor opción.</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        ${SOLUTIONS_DB.map(sol => `
          <button 
            onclick="window.togglePainPoint('${sol.id}')" 
            class="card-modern text-left p-6 transition-all ${state.selectedPainPoints.includes(sol.id) ? 'border-cd-highlight ring-2 ring-cd-highlight scale-105' : ''}"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-cd-surface">
                <i data-lucide="${sol.icon}" class="w-6 h-6 text-cd-highlight"></i>
              </div>
              <h3 class="font-bold text-lg">${sol.name}</h3>
            </div>
            <p class="text-sm text-cd-text-dim mb-2">${sol.painPoint}</p>
            <span class="text-xs font-semibold px-2 py-1 rounded-full ${state.selectedPainPoints.includes(sol.id) ? 'bg-green-500/20 text-green-400' : 'bg-cd-base text-cd-text-muted'}">
              ${state.selectedPainPoints.includes(sol.id) ? '✓ Seleccionado' : 'Click para seleccionar'}
            </span>
          </button>
        `).join('')}
      </div>

      <div class="text-center">
        <button onclick="window.goToStep(2)" class="btn-primary text-lg px-10 py-4 ${state.selectedPainPoints.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}" ${state.selectedPainPoints.length === 0 ? 'disabled' : ''}>
          Ver Soluciones Recomendadas <i data-lucide="arrow-right" class="w-5 h-5 ml-2"></i>
        </button>
      </div>
    `;
  }

  // PASO 2: Personalización (Elegir Planes y Extras)
  function renderCustomization(container) {
    const selectedSolutions = SOLUTIONS_DB.filter(s => state.selectedPainPoints.includes(s.id));
    
    container.innerHTML = `
      <div class="text-center mb-10">
        <h2 class="text-3xl font-black mb-2">Arma tu Solución</h2>
        <p class="text-cd-text-dim">Hemos preseleccionado las opciones más populares. Puedes cambiarlas según tu presupuesto.</p>
      </div>

      <div class="space-y-8 max-w-3xl mx-auto">
        ${selectedSolutions.map(sol => `
          <div class="card-modern p-6">
            <h3 class="font-bold text-xl mb-4 flex items-center gap-2">
              <i data-lucide="${sol.icon}" class="w-5 h-5 text-cd-highlight"></i>
              ${sol.name}
            </h3>
            
            <!-- Opciones Principales (Base) -->
            <div class="grid gap-3 mb-4">
              ${sol.services.base.map(svc => `
                <div onclick="window.selectPlan('${sol.id}', '${svc.id}')" 
                     class="flex justify-between items-center p-4 rounded-lg cursor-pointer transition-all ${state.selectedPlans[sol.id] === svc.id ? 'bg-cd-highlight/20 border border-cd-highlight' : 'bg-cd-base border border-transparent hover:border-cd-border'}">
                  <div>
                    <span class="font-semibold block ${state.selectedPlans[sol.id] === svc.id ? 'text-white' : ''}">${svc.name}</span>
                    <span class="text-xs text-cd-text-dim">${svc.description || ''}</span>
                  </div>
                  <div class="text-right">
                    <span class="font-bold block">$${svc.price}</span>
                    <span class="text-xs text-cd-text-dim">${svc.type === 'monthly' ? '/mes' : 'Único'}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Micro-servicios (Extras) -->
            <div class="pt-4 border-t border-cd-border">
              <p class="text-xs text-cd-text-dim uppercase mb-2 font-bold">Complementos opcionales:</p>
              <div class="flex flex-wrap gap-2">
                ${sol.services.micro.map(micro => `
                  <button onclick="window.toggleMicro('${micro.id}')" 
                          class="px-3 py-2 rounded-full text-sm transition-all ${state.selectedMicros[micro.id] ? 'bg-cd-highlight text-white' : 'bg-cd-surface text-cd-text-dim hover:bg-cd-base'}">
                    + ${micro.name} ($${micro.price})
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}

        <div class="flex justify-between mt-10">
          <button onclick="window.goToStep(1)" class="btn-secondary">
            <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i> Volver
          </button>
          <button onclick="window.goToStep(3)" class="btn-primary">
            Ver Resumen y Ahorro <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
          </button>
        </div>
      </div>
    `;
  }

  // PASO 3: Resumen y WhatsApp
  function renderSummary(container) {
    const totals = calculateTotals();
    const waLink = generateWhatsAppLink();
    
    container.innerHTML = `
      <div class="max-w-xl mx-auto text-center animate-fade-in">
        <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500/20">
          <i data-lucide="check-circle" class="w-10 h-10 text-green-400"></i>
        </div>
        
        <h2 class="text-3xl font-black mb-3">¡Todo Listo!</h2>
        <p class="text-cd-text-dim mb-8">Tu propuesta está diseñada para maximizar tus ventas y ahorrarte tiempo.</p>

        <div class="card-modern p-6 text-left mb-6">
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-cd-border">
            <span class="font-bold text-lg">Inversión Total</span>
            <div class="text-right">
              <div class="text-2xl font-black text-cd-highlight">$${totals.oneTime} USD</div>
              ${totals.monthly > 0 ? `<div class="text-sm text-cd-text-dim">+ $${totals.monthly}/mes</div>` : ''}
            </div>
          </div>
          
          <!-- Beneficios Clave -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center gap-3 text-green-400">
              <i data-lucide="piggy-bank" class="w-5 h-5"></i>
              <span>Ahorras aprox. <strong>$${totals.savings} USD</strong> vs. contratar servicios por separado.</span>
            </div>
            <div class="flex items-center gap-3 text-blue-400">
              <i data-lucide="trending-up" class="w-5 h-5"></i>
              <span>Automatización que libera <strong>+15 horas</strong> de tu tiempo mensual.</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <a href="${waLink}" target="_blank" class="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
            <i data-lucide="message-circle" class="w-6 h-6"></i>
            Enviar Cotización por WhatsApp
          </a>
          <button onclick="window.goToStep(2)" class="btn-secondary w-full">
            Modificar selección
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // ACCIONES GLOBALES (Window)
  // ==========================================
  
  window.togglePainPoint = function(id) {
    const index = state.selectedPainPoints.indexOf(id);
    if (index > -1) {
      state.selectedPainPoints.splice(index, 1);
      // Limpiar selección de planes si deselecciona el problema
      delete state.selectedPlans[id];
    } else {
      state.selectedPainPoints.push(id);
      // Preseleccionar el plan 'popular' por defecto
      const sol = SOLUTIONS_DB.find(s => s.id === id);
      const popular = sol.services.base.find(s => s.popular);
      if (popular) state.selectedPlans[id] = popular.id;
    }
    render();
  };

  window.selectPlan = function(solutionId, serviceId) {
    state.selectedPlans[solutionId] = serviceId;
    render();
  };

  window.toggleMicro = function(microId) {
    state.selectedMicros[microId] = !state.selectedMicros[microId];
    render();
  };

  window.goToStep = function(step) {
    state.step = step;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inicialización automática
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('calculator-app')) render();
    });
  } else {
    if (document.getElementById('calculator-app')) render();
  }

})();