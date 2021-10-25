export default function MyMap(props: any) {
    const { data, refs, onClick, activeMarker } = props

    return (
        <div style={{ flex: '0 1 auto', overflowY: 'scroll' }}>
            {
                data && data.map((earthquake: any) => {
                    return (
                        earthquake.geometry.coordinates && (
                            <div
                                ref={refs[earthquake.id]}
                                key={earthquake.id}
                                style={{
                                    backgroundColor: "#FFFFFF",
                                    borderBottom: '2px solid black',
                                    paddingBottom: '5px',
                                    paddingTop: '5px',
                                    cursor: 'pointer',
                                    ...(activeMarker?.id === earthquake.id && { backgroundColor: "#59bdff" })
                                }}
                                onClick={() => { activeMarker?.id === earthquake.id ? onClick(null) : onClick(earthquake) }}
                            >
                                <div>
                                    <a href={earthquake.properties.url}>{earthquake.properties.url}</a>
                                </div>
                                <div>
                                    Magnitude: {earthquake.properties.mag}
                                </div>
                                <div>
                                    Location: {earthquake.properties.place}
                                </div>
                            </div>
                        )
                    );
                })
            }
        </div>
    );
}
