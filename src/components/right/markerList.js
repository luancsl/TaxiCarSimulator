

const PositionList = ({ positions, onClose }) => {
    const listItems = positions.map((position, idx) =>
        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'row', borderWidth: 3, borderColor: 'ActiveBorder' }}>
            <div style={{ flex: .9, display: 'flex' }}>
                {position.id},&ensp;{position.lat},{position.lng},
            </div>
            <div style={{ flex: .1, display: 'flex' }}>
                <div onClick={() => onClose ? onClose(position) : null}>&ensp;x</div>
            </div>

        </div>
    );
    return (
        <div style={{ borderWidth: 3, borderColor: '#111', overflow: 'auto', whiteSpace: 'nowrap', height: '89vh' }}>{listItems}</div>
    );
}


export const List = ({ clients, drivers, onCloseClient, onCloseDriver }) => {

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', padding: 10 }}>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10, overflow: 'auto', whiteSpace: 'nowrap' }}>
                <h3>Clients ({clients.length})</h3>
                <PositionList positions={clients} onClose={(position) => onCloseClient ? onCloseClient(position) : null} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 10, overflow: 'auto', whiteSpace: 'nowrap' }}>
                <h3>Drivers ({drivers.length})</h3>
                <PositionList positions={drivers} onClose={(position) => onCloseDriver ? onCloseDriver(position) : null} />
            </div>
        </div>
    )
}