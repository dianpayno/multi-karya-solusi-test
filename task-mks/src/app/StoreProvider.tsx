'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { ChakraProvider } from '@chakra-ui/react'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <ChakraProvider>
      <Provider store={storeRef.current}>{children}</Provider>
    </ChakraProvider>
    

  )
}