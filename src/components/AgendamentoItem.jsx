// src/compoenets/AgendamentoItem.jsx

import React from 'react';

// O componente recebe 'nome' e 'horario' como propriedades (props)
export default function AgendamentoItem({nome, horario}) {
    return (
        //container principal do item
        // - flex: ativa o layout flexbox, para alinhar itens
        // - items-center: alinha os itens verticalmente no centro
        // - justify-beetween: empurra os filhos para as extremidades opostas (avatar/nome para a esquerda, botão para a direita)
        // - p-2: padding de 2 unidade
        // - rounded-lg: bordas arredondadas
        // - hover:bg-slate-700: muda a cor de fundo quando mouse está em cima, feedback visual
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700">
            
            {/** grupo da Esquerda: Avatar e Texto */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-600"></div>

                {/* Bloco de Texto: Nome e Horário */}
                <div>
                    <p className="text-white font-semibold text-sm">{nome}</p>
                    <p className="text-white font-semibold text-sm">{horario}</p>
                </div>
            </div>
            {/** Botão de ações (os "...") */}
            <button className="text-slate-400 hover:text-white font-bold text-bold text-lg tracking-widest">
                ...
            </button>
        </div>
    )
}