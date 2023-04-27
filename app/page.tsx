import { Inter } from 'next/font/google'
import Item from './[searchTerm]/components/Item'
import getWikiResults from "@/lib/getWikiResults"

const inter = Inter({ subsets: ['latin'] })
type Props = {
  params: {
      searchTerm: string
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  console.log("searchTerm " + searchTerm)
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const results: Result[] | undefined = data?.query?.pages
  const content = (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results
        ? Object.values(results).map(result => {
          return <Item key={result.pageid} result={result} />
        })
        : <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>
      }
    </main>
  )
  return content
}

