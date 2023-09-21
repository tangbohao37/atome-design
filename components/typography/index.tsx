import { FC, PropsWithChildren } from 'react'
import styles from './style/index.module.css'

interface ITitle {
  size: 'small' | 'normal' | 'large'
}

const Title: FC<PropsWithChildren<ITitle>> = ({ children }) => {
  return <h1 className={`${styles['atome-typography-title']}`}>{children}</h1>
}

export const Typography = {
  Title,
}
