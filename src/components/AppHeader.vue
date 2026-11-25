<script setup>
// Presentación del encabezado: recibe datos por props y avisa por emits
defineProps({
  nombreTienda: { type: String, required: true },
  cantidadItems: { type: Number, default: 0 }
})

const emit = defineEmits(['ver-carrito'])
</script>

<template>
  <header class="encabezado">
    <div class="encabezado__barra">
      <a class="logo" href="#catalogo" aria-label="Ir al catálogo">
        <span class="logo__icono" aria-hidden="true">N</span>
        <span class="logo__texto">{{ nombreTienda }}</span>
      </a>

      <nav class="menu" aria-label="Navegación principal">
        <a class="menu__enlace" href="#catalogo">Catálogo</a>
        <button class="menu__carrito" type="button" @click="emit('ver-carrito')" :aria-label="`Ver carrito, ${cantidadItems} unidades`">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.6 11.2a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 1.9-1.4L21 7H6" />
          </svg>
          <span>Carrito</span>
          <span class="menu__contador" :class="{ 'menu__contador--vacio': cantidadItems === 0 }">{{ cantidadItems }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.encabezado {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(11, 18, 32, 0.94);
  backdrop-filter: blur(8px);
  color: #fff;
  box-shadow: 0 4px 20px rgba(11, 18, 32, 0.25);
}
.encabezado__barra {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.logo { display: flex; align-items: center; gap: 0.65rem; color: #fff; text-decoration: none; }
.logo__icono {
  width: 38px; height: 38px; border-radius: 11px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  font-weight: 800; font-size: 1.2rem;
}
.logo__texto { font-weight: 800; letter-spacing: 0.12em; font-size: 1.05rem; }
.menu { display: flex; align-items: center; gap: 0.5rem; }
.menu__enlace {
  color: #cbd5e1; text-decoration: none; font-weight: 500;
  padding: 0.55rem 0.9rem; border-radius: 10px; transition: background 0.2s, color 0.2s;
}
.menu__enlace:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
.menu__carrito {
  display: flex; align-items: center; gap: 0.5rem;
  background: var(--acento); color: #fff; border: 0; border-radius: 12px;
  padding: 0.55rem 0.9rem; font-weight: 600; transition: background 0.2s, transform 0.15s;
}
.menu__carrito:hover { background: var(--acento-oscuro); transform: translateY(-1px); }
.menu__contador {
  min-width: 24px; height: 24px; padding: 0 6px; border-radius: 999px;
  background: #fff; color: var(--acento-oscuro);
  display: grid; place-items: center; font-size: 0.8rem; font-weight: 800;
}
.menu__contador--vacio { background: rgba(255, 255, 255, 0.25); color: #fff; }

@media (max-width: 520px) {
  .logo__texto { font-size: 0.9rem; letter-spacing: 0.08em; }
  .menu__enlace { display: none; }
  .menu__carrito span:nth-of-type(1) { display: none; }
}
</style>
