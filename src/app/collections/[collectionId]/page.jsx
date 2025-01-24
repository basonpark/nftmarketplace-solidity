"use client"
import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContract, useAddress, useSDK } from '@thirdweb-dev/react';
import { client } from '@sanity/lib/client'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFTCard from '@/components/NFTCard'
import Header from '@/components/Header'
import ethLogo from '@/assets/eth-logo.png'
import Image from 'next/image'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-rwhite`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4 text-white`,
  createdBy: `text-lg mb-4 text-white/75`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center text-white/75`,
  ethLogo: `h-6 mr-2 object-contain`,
  statName: `text-lg w-full text-center mt-1 text-white/75`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
    const [nfts, setNfts] = useState([])
    const [collection, setCollection] = useState(null)
    const [listings, setListings] = useState([])

    const params = useParams()
    const collectionId = params.collectionId
    const address = useAddress()
    const sdk = useSDK()

    const { contract: nftContract } = useContract(collectionId)
    const { contract: marketPlaceContract } = useContract(
      '0x50885386C65ef2f2d6cA19bdE82937E95fCca453'
    )


    useEffect(() => {
      if (!nftContract) return
      ;(async () => {
        const nfts = await nftContract.erc721.getAll()
        setNfts(nfts)
      })()
    }, [nftContract])

    //get all listings in collection
    useEffect(() => {
      if (!marketPlaceContract) return
      ;(async () => {
        const listings = await marketPlaceContract.directListings.getAll()
        console.log("listings: " + JSON.stringify(listings, null, 2))
        setListings(listings)
      })()
    }, [marketPlaceContract])


    //get collections data
    const fetchCollectionData = async (client, collectionId) => {

      const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`
        const collectionData = await client.fetch(query)
        console.log("collection data: " + JSON.stringify(collectionData, null, 2))
        await setCollection(collectionData[0])
    }

    useEffect(() => {
      fetchCollectionData(client, collectionId)
    }, [collectionId])

    return (
      <div className="overflow-hidden">
        <Header />
        <div className={style.bannerImageContainer}>
          <img
            className={style.bannerImage}
            src={
              collection?.bannerImageUrl
                ? collection.bannerImageUrl
                : 'https://via.placeholder.com/200'
            }
            alt="banner"
          />
        </div>
        <div className={style.infoContainer}>
          <div className={style.midRow}>
            <img
              className={style.profileImg}
              src={
                collection?.imageUrl
                  ? collection.imageUrl
                  : 'https://via.placeholder.com/200'
              }
              alt="profile image"
            />
          </div>
          <div className={style.endRow}>
            <div className={style.socialIconsContainer}>
              <div className={style.socialIconsWrapper}>
                <div className={style.socialIconsContent}>
                  <div className={style.socialIcon}>
                    <CgWebsite />
                  </div>
                  <div className={style.divider} />
                  <div className={style.socialIcon}>
                    <AiOutlineInstagram />
                  </div>
                  <div className={style.divider} />
                  <div className={style.socialIcon}>
                    <AiOutlineTwitter />
                  </div>
                  <div className={style.divider} />
                  <div className={style.socialIcon}>
                    <HiDotsVertical />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.midRow}>
            <div className={style.title}>{collection?.title}</div>
          </div>
          <div className={style.midRow}>
            <div className={style.createdBy}>
              Created by{' '}
              <span className="text-[#2081e2]">{collection?.creator}</span>
            </div>
          </div>
          <div className={style.midRow}>
            <div className={style.statsContainer}>
              <div className={style.collectionStat}>
                <div className={style.statValue}>{nfts.length}</div>
                <div className={style.statName}>items</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  {collection?.allOwners ? collection.allOwners.length : ''}
                </div>
                <div className={style.statName}>owners</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  <Image
                    src={ethLogo}
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {collection?.floorPrice}
                </div>
                <div className={style.statName}>floor price</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  <Image
                    src={ethLogo}
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {collection?.volumeTraded}.5K
                </div>
                <div className={style.statName}>volume traded</div>
              </div>
            </div>
          </div>
          <div className={style.midRow}>
            <div className={style.description}>{collection?.description}</div>
          </div>
        </div>
        <div className="flex flex-wrap ">
          {nfts.map((nftItem, id) => (
            <NFTCard
              key={id}
              nftItem={nftItem}
              title={collection?.title}
              listings={listings}
            />
          ))}
        </div>
      </div>
    )
}

export default Collection
