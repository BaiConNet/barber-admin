import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePainelDashboard(token) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return

    setLoading(true)

    axios.get(`${import.meta.env.VITE_API_URL}/admin/painel`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Erro no painel:", err.response?.data || err.message);
        setError(err);
      })
      .finally(() => setLoading(false))
  }, [token])

  return { data, loading, error }
}
