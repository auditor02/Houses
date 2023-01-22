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


export default function Category() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)

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

                const listings = []

                querySnap.forEach((doc) => {
                    console.log(doc.data)
                    return listing.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListing(listing)
                setLoading(false)

            } catch (error) {
                toast.error('Could not fetch listing')
            }
        }

        fetchListings()
    },[params.categoryName])

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
      ) : listing && listing.length > 0 ? (
      <>
        <main>
            <ul className="categoryListings">
                {listing.map((listing) => (
                    <ListingItem 
                        listing={listing.data}
                        id={listing.id}
                        key={listing.id} 
                        />
                ))}
            </ul>
        </main>
      </>
      ) : ( <p>No listings for {params.categoryName}</p>)}
    </div>
  )
}
