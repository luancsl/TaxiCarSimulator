

const PositionList = ({ positions, onClose }) => {
    const listItems = positions.map((position, idx) =>
        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1, display: 'flex' }}>
                {position}
            </div>
        </div>
    );
    return (
        <div style={{ overflow: 'auto', whiteSpace: 'nowrap', height: '20vh' }}>{listItems}</div>
    );
}


export const Display = ({ results }) => {


    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10 }}>
            <div style={{ flex: .05, display: 'flex', flexDirection: 'column' }} >
                <h3>Result</h3>
            </div>
            <div style={{ flex: .95, display: 'flex', flexDirection: 'column', padding: 20 }}>
                <PositionList positions={results} />
            </div>
        </div>
    )
}