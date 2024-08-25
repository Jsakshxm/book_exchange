"use client"
import { Provider } from 'react-redux'
import { store } from '@/utils/store'
import Dashboard from '@/components/shared/Dashboard'

const page = () => {
  return (
<Provider store={store} > 
<Dashboard />
</Provider>
  )
}

export default page