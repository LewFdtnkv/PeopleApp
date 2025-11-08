import type { IButtonProps } from "../index";
import './Button.scss'
export default function Button({...buttonProps}: IButtonProps) {
  return (
    <button className={buttonProps.className} onClick={buttonProps.onClick}>
        {buttonProps.children ? buttonProps.children : "" }
        {buttonProps.svg ? buttonProps.svg : ""}
    </button>
  )
}
