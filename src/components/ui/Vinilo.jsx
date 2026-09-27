/** Disco de vinilo que gira, con surcos y una foto en la etiqueta central. */
export default function Vinilo({ imagen, className = 'w-72 h-72', lento = false }) {
  return (
    <div className={`relative shrink-0 ${className}`} aria-hidden="true">
      <div
        className={`absolute inset-0 rounded-full shadow-2xl shadow-black/60 ${lento ? 'girar-lento' : 'girar'}`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 0 31%, #111 31.5%), repeating-radial-gradient(circle at 50% 50%, #0b0b0b 0 2px, #1c1c1c 2px 3px)',
        }}
      >
        {/* Brillo que gira con el disco */}
        <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from 0deg, transparent 0 20%, rgba(255,255,255,.10) 25%, transparent 30% 70%, rgba(255,255,255,.08) 75%, transparent 80%)' }} />
        {/* Etiqueta con la foto */}
        <div className="absolute inset-[31%] overflow-hidden rounded-full border-4 border-rojo">
          <img src={imagen} alt="" className="w-full h-full object-cover grayscale contrast-125" />
          <div className="absolute inset-0 bg-rojo mix-blend-multiply" />
        </div>
        <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-negro border border-white/30" />
      </div>
    </div>
  )
}
