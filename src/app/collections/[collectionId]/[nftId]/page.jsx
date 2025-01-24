"use client"
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useContract } from "@thirdweb-dev/react";
import NFTImage from "@/components/nft/NFTImage";
import GeneralDetails from "@/components/nft/GeneralDetails";
import ItemActivity from "@/components/nft/ItemActivity";
import Purchase from "@/components/nft/Purchase";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const [selectedNft, setSelectedNft] = useState();
  const [listings, setListings] = useState([]);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const isListed = searchParams.get('isListed');

  const { contract: nftContract } = useContract(
    "0x9354026f652511c7CA62c8D4E03c75E559d22FEf"
  );
  const { contract: marketPlaceContract } = useContract(
    '0x50885386C65ef2f2d6cA19bdE82937E95fCca453'
  )

  useEffect(() => {
    if (!nftContract) return;
    ;(async () => {
      const nfts = await nftContract.erc721.getAll();
      const nft = nfts.find((nft) => nft.metadata.id === params.nftId);
      setSelectedNft(nft);
    })();
  }, [nftContract]);

  useEffect(() => {
    if (!marketPlaceContract) return;
    ;(async () => {
      const listings = await marketPlaceContract.getAllListings();
      setListings(listings);
    })();
  }, [marketPlaceContract]);

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft}/>
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft}/>
              <Purchase 
                isListed={isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceContract={marketPlaceContract}
                />
            </div>
          </div>
          <div className={style.itemActivityContainer}>
              <ItemActivity />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Nft;
