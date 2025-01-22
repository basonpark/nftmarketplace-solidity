import React from 'react'
import Link from 'next/link';

const Collection = ({params}) => {
    const collectionId = params.collectionId;

    console.log(collectionId);
    
    return (
      <div>
        <Link href="/">
            <div>Back to Home</div>
        </Link>
        <h1>Collection: {collectionId}</h1>
      </div>
    )
}

export default Collection
