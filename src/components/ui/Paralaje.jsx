import { useParalaje } from '../../hooks/useParalaje'

/** Contenedor con paralaje al hacer scroll. */
export default function Paralaje({ factor = 0.1, className = '', children, ...rest }) {
  const ref = useParalaje(factor)
  return <div ref={ref} className={className} {...rest}>{children}</div>
}
