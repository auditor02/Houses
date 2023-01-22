import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { 
    collection, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    limit, 
    startAfter 
} from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../Components/Spinner"
import ListingItem from "../Components/ListingItem"

export default function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState
    (null)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
              // Get reference
              const listingsRef = collection(db, 'listings')

              // Create a query
              const q = query(
                listingsRef, 
                where('type', '==', params.categoryName), 
                orderBy('timestamp', 'desc'),
                limit(10)
                )

             // Execute query
             const querySnap = await getDocs(q)

             const lastVisible = await querySnap.docs[querySnap.docs.length
              -1]
             setLastFetchedListing(lastVisible)

                const listings = []

                querySnap.forEach((doc) => {
                    console.log(doc.data)
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)

            } catch (error) {
                toast.error('Could not fetch listing')
            }
        }

        fetchListings()
    },[params.categoryName])

    // Pagination / Load More
    const onFetchMoreListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef, 
          where('type', '==', params.categoryName), 
          orderBy('timestamp', 'desc'),
          startAfter(lastFetchedListing),
          limit(10)
          )

       // Execute query
       const querySnap = await getDocs(q)

       const lastVisible = await querySnap.docs[querySnap.docs.length
        -1]
        setLastFetchedListing(lastVisible)

          const listings = []

          querySnap.forEach((doc) => {
              console.log(doc.data)
              return listings.push({
                  id: doc.id,
                  data: doc.data()
              })
          })

          setListings((prevState) => [...prevState, ...listings])
          setLoading(false)

      } catch (error) {
          toast.error('Could not fetch listing')
      }
  }
  return (
    <div className="category">
        <h1>Category</h1>
      <header>
        <p className="pageHeader">
            {params.categoryName === 'rent' 
            ? 'Places for rent' 
            : 'places for sale'}
        </p>
      </header>

      {loading ? (
         <Spinner />
      ) : listings && listings.length > 0 ? (
      <>
        <main>
            <ul className="categoryListings">
                {listings.map((listing) => (
                    <ListingItem 
                        listings={listing.data}
                        id={listing.id}
                        key={listing.id} 
                        />
                ))}
            </ul>
        </main>

        <br />
        <br />
        {lastFetchedListing && (
          <p className="loadMore" onClick={onFetchMoreListings}
          >
            Load More</p>
        )}
      </>
      ) : ( <p>No listings for {params.categoryName}</p>)}
    </div>
  )
}
