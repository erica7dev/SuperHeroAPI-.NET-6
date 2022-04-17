import React from 'react'

//props - props.acao
//{{xxx}} desestruturação do parametro (props)
export default function Header({title, children}) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
