import React from 'react'

export default function Details({params}: {id: string}){
    return (
        <div>Details for {params.id}</div>
    )
}
