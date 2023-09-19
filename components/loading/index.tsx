import defaultBg from '@/components/assets/icons/loading-bg.svg'
import LoadingPng from '@/components/assets/images/entry-loading.png'
import style from './style/index.module.less'

interface ILoadingProps {
  loadingBgImg?: string
}
export const Loading = ({ loadingBgImg }: ILoadingProps) => {
  const defaultPng = loadingBgImg || defaultBg

  return (
    <div className={`flex justify-center items-center  w-full h-full`}>
      <div
        className={`flex justify-center items-center  ${style['loading-bg']}`}
        style={{
          backgroundImage: `url(${defaultPng})`,
        }}>
        <img className={style['loading']} src={LoadingPng} alt="" />
      </div>
    </div>
  )
}
