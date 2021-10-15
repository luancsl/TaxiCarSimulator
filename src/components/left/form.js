import React, { useState } from "react"


export const Form = ({ algorithms, onSelectedAlgorithm }) => {
    const [algorithm, setAlgorithm] = useState(algorithms ? algorithms[0] : '')

    const handleSubmit = (event) => {
        if (onSelectedAlgorithm) { onSelectedAlgorithm(algorithm) }
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', height: '100vh', flexDirection: 'column', padding: 10 }}>
            <div style={{ flex: .7, display: 'flex', justifyContent: 'center' }} >
                <label>
                    <br></br>
                    Algorithm:<br></br>
                    <select value={algorithm} onChange={(event) => setAlgorithm(event.target.value)}>
                        {algorithms.map((value, idx) => {
                            return <option key={idx} value={value}>{value}</option>
                        })}
                    </select>
                </label>
            </div>
            <div style={{ flex: .3, display: 'flex', justifyContent: 'center' }}>
                <input style={{ height: 40, width: 100, backgroundColor: '#fff' }} type="submit" value="Calcular" />
            </div>

        </form>
    )
}