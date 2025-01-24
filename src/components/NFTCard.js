import React, { useState, useEffect } from 'react'
import { BiHeart } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ethLogo from '@/assets/eth-logo.png'


const style = {
    wrapper: `bg-[#303339] flex-grow-0 w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
    imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
    nftImg: `w-full object-cover`,
    details: `p-3`,
    info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
    infoLeft: `flex-0.6 flex-wrap`,
    collectionName: `font-semibold text-sm text-[#8a939b]`,
    assetName: `font-bold text-lg mt-2`,
    infoRight: `flex-0.4 text-right`,
    priceTag: `font-semibold text-sm text-[#8a939b]`,
    priceValue: `flex items-center text-xl font-bold mt-2`,
    ethLogo: `h-5 mr-2`,
    likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
    likeIcon: `text-xl mr-2`,
  }

const NFTCard = ({nftItem, title, listings}) => {
    const [isListed, setIsListed] = useState(false)
    const [price, setPrice] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (!listings || !nftItem) return
        
        const listing = listings.find((listing) => 
            listing.asset.id.toString() === nftItem.metadata.id.toString()
        );
        
        if (listing && listing.buyoutCurrencyValuePerToken) {
            setIsListed(true);
            setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
            console.log(`Found listing for NFT ${nftItem.metadata.id}:`, listing);
        }
    }, [listings, nftItem]);

    if (!nftItem?.metadata) return null

    return (
        <div 
        className={style.wrapper}
        onClick={() => {
            router.push(`/collections/nfts/${nftItem.metadata.id}?isListed=${isListed}`)
        }}
        >
        <div className={style.imgContainer}>
            <img 
                src={nftItem.metadata.image || 'https://via.placeholder.com/200'} 
                alt={nftItem.metadata.name} 
                className={style.nftImg} 
            />
        </div>
        <div className={style.details}>
            <div className={style.info}>
                <div className={style.infoLeft}>
                    <div className={style.collectionName}>{title}</div>
                    <div className={style.assetName}>{nftItem.metadata.name}</div>
                </div>
                { isListed && (
                    <div className={style.infoRight}>
                        <div className={style.priceTag}>Price</div>
                        <div className={style.priceValue}>
                            <img src={ethLogo} alt='eth' className={style.ethLogo} />
                            {price}
                        </div>
                    </div>
                )}
                <div className={style.likes}>
                    <span className={style.likeIcon}>
                        <BiHeart />
                    </span>{ '  '}
                    {nftItem.likes}
                </div>
            </div>
        </div>
        </div>
    )
}

export default NFTCard
