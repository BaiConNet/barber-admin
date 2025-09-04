import React from 'react'
import { motion } from 'framer-motion'
import {Clock, User, Scissors, Phone} from 'lucide-react'

const appointments = [
  {
    id: 1,
    client: 'Carlos Silva',
    service: 'Corte + Barba',
    time: '09:00',
    status: 'confirmed',
    phone: '(11) 99999-9999',
    duration: '45min'
  },
  {
    id: 2,
    client: 'João Santos',
    service: 'Corte Simples',
    time: '10:30',
    status: 'in-progress',
    phone: '(11) 88888-8888',
    duration: '30min'
  },
  {
    id: 3,
    client: 'Pedro Costa',
    service: 'Barba',
    time: '11:15',
    status: 'waiting',
    phone: '(11) 77777-7777',
    duration: '25min'
  },
  {
    id: 4,
    client: 'Roberto Lima',
    service: 'Corte + Barba',
    time: '14:00',
    status: 'confirmed',
    phone: '(11) 66666-6666',
    duration: '45min'
  },
  {
    id: 5,
    client: 'André Oliveira',
    service: 'Sobrancelha',
    time: '15:30',
    status: 'confirmed',
    phone: '(11) 55555-5555',
    duration: '20min'
  }
]

const statusConfig = {
  confirmed: { label: 'Confirmado', color: 'bg-blue-500/20 text-blue-400' },
  'in-progress': { label: 'Em Andamento', color: 'bg-green-500/20 text-green-400' },
  waiting: { label: 'Aguardando', color: 'bg-yellow-500/20 text-yellow-400' },
  completed: { label: 'Concluído', color: 'bg-gray-500/20 text-gray-400' }
}

const AppointmentsList = () => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Agendamentos de Hoje</h3>
        <p className="text-gray-400 text-sm mt-1">Gerencie os agendamentos do dia</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                
                {/* Client Info */}
                <div>
                  <h4 className="text-white font-medium">{appointment.client}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <div className="flex items-center space-x-1">
                      <Scissors className="w-4 h-4" />
                      <span>{appointment.service}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Time */}
                <div className="text-right">
                  <div className="text-white font-medium">{appointment.time}</div>
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    statusConfig[appointment.status].color
                  }`}>
                    {statusConfig[appointment.status].label}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                    Iniciar
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-500 transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium">
            Ver Todos os Agendamentos
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsList
