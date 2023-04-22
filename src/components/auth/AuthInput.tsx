
interface AuthInputProps{
    label: string
    value: any
    required?: boolean
    type?: 'text'| 'email' | 'password'
    onChange: (newValue: any) => void
}
//dica:
//colocar um atributo boolean com naoRenderizarQuando e so retornar quando ele for false
//então popde criar um novo input no register como confirmacao de senha e ele so ira aparececr
//caso esse naoRenderrizar seja modoLogin === true

export default function AuthInput(props:AuthInputProps) {

  return (
      <div className="flex flex-col mt-4">
            <label >{props.label}</label>
            <input 
                // caso nao forneca o tipo ele seja vazio ele vira text
                type={props.type ?? 'text'} 
                value={props.value}
                onChange={e=> props.onChange?.(e.target.value)}
                required={props.required}
                className={` px-4 py-3 rounded-lg bg-gray-200 mt-2 border 
                            focus:border-blue-500 focus:bg-white focus:outline-none`
                        }
            
            />
      </div>
  )
}
