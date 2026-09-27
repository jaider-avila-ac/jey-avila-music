// Datos compartidos por las dos versiones de la agenda (afiche de celular y escritorio),
// para que ambas muestren exactamente la misma información. Las fechas vienen de la API
// (se editan en /jeyadmin).

export const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

// 573025680189 → +57 302 568 0189
export const formatoTelefono = (n) => (n ? `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 8)} ${n.slice(8)}` : '')

// Fecha de hoy en hora local (AAAA-MM-DD)
const hoyLocal = () => {
  const h = new Date()
  return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`
}

/** Fechas del año en curso, ordenadas, cada una con su mes, día y si ya pasó. */
export function fechasDelAnio(todas) {
  const hoyIso = hoyLocal()
  const anio = Number(hoyIso.slice(0, 4))
  const fechas = todas
    .filter((f) => f.fecha.startsWith(String(anio)))
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .map((f) => {
      const [, m, d] = f.fecha.split('-')
      return { ...f, mes: MESES[Number(m) - 1], dia: d, pasada: f.fecha < hoyIso }
    })
  return { anio, fechas }
}
