import { useEffect, useState } from 'react'
import axios from 'axios'

// Hook para buscar dados do painel admin (/admin/painel)
export default function usePainelDashboard(token) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    setLoading(true)
    axios.get('/admin/painel', {
      baseURL: import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [token])

  return { data, loading, error }
}
