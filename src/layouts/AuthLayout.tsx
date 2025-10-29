import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AuthService } from "../services/authService"
import { AuthUser } from "../types/interfaces/AuthUser"

export function AuthLayout({role}: {role: string}) {
    const navigate = useNavigate()
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const service = new AuthService()
        
        function fetchUser() {
            service.getUser().then((data) => {
                setUser(data)
            })
            .catch((err) =>  console.error("Erro ao buscar usuário:", err))
            .finally(() => setLoading(false))            
        }

        fetchUser()
    }, [])

    useEffect(() => {
        if (!loading && user?.role !== role) {
            navigate("/")
        }
    }, [loading, user, navigate])

    if (loading) {
        return <p>Carregando...</p>
    }

    return <Outlet />
}
