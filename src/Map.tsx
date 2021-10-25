import axios from 'axios';
import { Map, Marker, Overlay } from 'pigeon-maps';
import React, { useState, useEffect } from 'react';

export default function MyMap(props: any) {
	const [data, setData] = useState([] as any[]);

	useEffect(() => {
		async function fetchMyAPI() {
			const res = await axios.get<any>('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')

			setData(res.data.features)
		}
		fetchMyAPI()
	}, []);

	const color = `hsl(200deg 39% 70%)`
	const [activeMarker, setActiveMarker] = useState(null as any)
	return (
		<Map defaultZoom={3} >
			{
				data && data.map((earthquake: any) => {
					return (
						earthquake.geometry.coordinates && (
							<Marker
								key={earthquake.id}
								width={50}
								anchor={[
									parseFloat(earthquake.geometry.coordinates[1]),
									parseFloat(earthquake.geometry.coordinates[0]),
								]} color={color}
								onClick={() => { activeMarker && activeMarker.id === earthquake.id ? setActiveMarker(null) : setActiveMarker(earthquake) }}
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
