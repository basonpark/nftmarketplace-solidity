import { BsFillCartFill } from 'react-icons/bs'
import Image from 'next/image'
import ethLogo from '@/assets/eth-logo.png'
const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl`,
  eventName: `text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 object-contain`,
  accent: `text-[#2081e2]`,
}

const EventItem = ({ event }) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          <BsFillCartFill />
        </div>
        <div className={style.eventName}>Sale</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
        <Image
          src={ethLogo}
          alt="eth"
          className={style.ethLogo}
          height={20}
          width={20}
        />
        <div className={style.eventPriceValue}>{event.price}</div>
      </div>
      <div className={`${style.accent} flex-[3]`}>{event.from}</div>
      <div className={`${style.accent} flex-[3]`}>{event.to}</div>
      <div className={`${style.accent} flex-[2]`}>{event.date}</div>
    </div>
  )
}

export default EventItem