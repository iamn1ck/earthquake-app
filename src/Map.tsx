import { Map, Marker, Overlay } from 'pigeon-maps';

export default function MyMap(props: any) {
	const { activeMarker, data, mapCenter, onClick } = props
	const color = `hsl(200deg 39% 70%)`

	return (
		<Map center={mapCenter} defaultZoom={3} >
			{
				data && data.map((earthquake: any) => {
					return (
						earthquake.geometry.coordinates && (
							<Marker
								anchor={[
									parseFloat(earthquake.geometry.coordinates[1]),
									parseFloat(earthquake.geometry.coordinates[0]),
								]}
								color={activeMarker && activeMarker.id === earthquake.id ? "#FF0000" : color}
								key={earthquake.id}
								width={50}
								onClick={() => { activeMarker && activeMarker.id === earthquake.id ? onClick(null) : onClick(earthquake) }}
								style={{
									...(activeMarker && activeMarker.id === earthquake.id && { zIndex: 100 })
								}}
							/>
						)
					);
				})
			}
			{
				activeMarker && (
					<Overlay
						anchor={[
							parseFloat(activeMarker.geometry.coordinates[1]),
							parseFloat(activeMarker.geometry.coordinates[0]),
						]}
						offset={[250, 120]}
					>
						<div style={{
							backgroundColor: "#FFFFFF", width: '500px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
						}}>
							<div>
								<a href={activeMarker.properties.url}>{activeMarker.properties.url}</a>
							</div>
							<div>
								Magnitude: {activeMarker.properties.mag}
							</div>
							<div>
								Location: {activeMarker.properties.place}
							</div>
						</div>
					</Overlay>
				)
			}
		</Map>
	);
}
