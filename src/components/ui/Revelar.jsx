import { useVisible } from '../../hooks/useVisible'

/** Aparece con un desplazamiento suave al entrar en pantalla. */
export default function Revelar({ as: Tag = 'div', retraso = 0, className = '', children, ...rest }) {
  const [ref, visible] = useVisible()
  return (
    <Tag
      ref={ref}
      className={`revelar ${visible ? 'visible' : ''} ${className}`}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
