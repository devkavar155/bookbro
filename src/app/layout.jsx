import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NextTopLoader from 'nextjs-toploader'
import { dark } from '@clerk/themes'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Bookohub: Affordable Book Rentals Near You',
    description: 'RentBooks is your go-to platform for affordable book rentals. Browse a wide selection of books available for rent from people in your area. Save money and enjoy your favorite reads without breaking the bank.',
    // viewport:'width=device-width, initial-scale=1.0',
    keywords: 'book rentals, affordable books, local book rentals, low-cost reading, borrow books, rent a book,Renting Books, Affordable Reading, Book Sharing, Low-Cost Book Rentals, Neighborhood Book Exchange, Weekly Book Rentals, Budget-Friendly Reading, Local Book Lending, Shared Reading Experience, Community Library, Borrow Books Locally, Book Swap, Literary Sharing, Inexpensive Book Rentals, Shared Knowledge, Sustainable Reading, Accessible Books, Frugal Reading, Reading Economy, Shared Bookshelf'

}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
        appearance={{
            baseTheme: [dark]
      }}>
            <html lang="en">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </meta>
                <body className={inter.className}>
                    <NextTopLoader
                        color="#ff0000"
                        size="10"
                        delay={100}
                        duration={1000}
                    />
                    {children}
                </body>
            </html>
    </ClerkProvider>
  )
}
