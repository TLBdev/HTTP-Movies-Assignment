import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function EditMovie(props) {
    console.log('in edit movie', props)
    const [state, setState] = React.useState({})
    console.log(state)
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => setState({
                id: res.data.id,
                title: res.data.title,
                metascore: res.data.metascore,
                director: res.data.director,
                stars: [...res.data.stars]

            }))
            .catch(err => console.log(err.response));
    }, [])

    const handleChange = (e) => {
        console.log(state)
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, state)
            .then(res => {
                console.log('res', res)
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <span>Title</span><input type='text' name='title' value={state.title} onChange={handleChange}></input>
            <span>Metascore</span><input type='text' name='metascore' value={state.metascore} onChange={handleChange}></input>
            <span>Director</span><input type='text' name='director' value={state.director} onChange={handleChange}></input>
            <button type='submit'>Submit Edit</button>
        </form>
    )
}