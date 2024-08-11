import { Col, Row, message } from 'antd';
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StatisticWidget from "../../../components/shared-components/StatisticWidget";
import { fetchSummaries } from "../../../redux/features/summaries";
import { Area } from "@ant-design/plots";
import { fetchAllLetter } from "../../../redux/features/letters";
import { fetchAllCitizens } from "../../../redux/features/citizens";


export const DefaultDashboard = () => {
	const dispatch = useDispatch();
	const {
		selected: summary,
	} = useSelector(state => state.summaries)

	const {
		list: citizens,
	} = useSelector(state => state.citizens)

	const getData = useCallback(async () => {
		try {
			await dispatch(fetchSummaries()).unwrap()
			await dispatch(fetchAllCitizens()).unwrap()
		} catch (error) {
			message.error(error?.message || 'Failed to data')
		}
	}, [ dispatch ])
	const user = JSON.parse(localStorage.getItem('user'))

	useEffect(() => {
		getData()
	}, [])

	const graph = {
		xField: 'gender',
		yField: 'dob',
		xAxis: {
			range: [ 0, 1 ],
			tickCount: 30,
		},
		areaStyle: () => {
			return {
				fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
			};
		},
		slider: {
			start: 0.1,
			end: 0.9,
		},
		seriesField: 'fullName',
		smooth: true,
	};

	console.log(citizens)

	return (
		<>
			<Row gutter={ 24 }>
				<Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 }>
					<h2>Dashboard</h2>
					<p>Summary analisa data aplikasi kali ini</p>
				</Col>
			</Row>
			<Row gutter={ 24 }>
				<Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 }>
					<StatisticWidget
						style={ { textAlign: "center" } }
						title={ 'Statistik Warga' }
						value={ <Area data={ citizens } { ...graph } /> }
						colorValue="white"
					/>
				</Col>
			</Row>
			<Row gutter={ 24 }>
				<Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 }>
					{ user.role !== 'CITIZEN' &&
						<Row gutter={ 24 }>
							<Col xs={ 8 } sm={ 8 } md={ 8 } lg={ 8 } xl={ 8 }>
								<StatisticWidget
									style={ { textAlign: "center", backgroundColor: "blue", color: "white" } }
									title={ 'Jumlah Pria' }
									value={ `${ summary.male }` }
									colorValue="white"
								/>
							</Col>
							<Col xs={ 8 } sm={ 8 } md={ 8 } lg={ 8 } xl={ 8 }>
								<StatisticWidget
									style={ { textAlign: "center" } }
									title={ 'Jumlah Wanita' }
									value={ `${ summary.female }` }
								/>
							</Col>
							<Col xs={ 8 } sm={ 8 } md={ 8 } lg={ 8 } xl={ 8 }>
								<StatisticWidget
									style={ { textAlign: "center", backgroundColor: "blue", color: "white" } }
									title={ 'Jumlah Balita' }
									value={ `${ summary.underAge }` }
									colorValue="white"
								/>
							</Col>
						</Row>
					}
					<Row gutter={ 24 }>
						<Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
							<StatisticWidget
								style={ { textAlign: "center", backgroundColor: "blue", color: "white" } }
								title={ user.role === 'CITIZEN' ? 'Jumlah Keluarga' : 'Jumlah Warga' }
								value={ `${ summary.citizen }` }
								colorValue="white"
							/>
						</Col>
						<Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
							<StatisticWidget
								style={ { textAlign: "center" } }
								title={ 'Jumlah Laporan Kerusakan' }
								value={ `${ summary.report }` }
							/>
						</Col>
					</Row>
					<Row gutter={ 24 }>
						<Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
							<StatisticWidget
								style={ { textAlign: "center" } }
								title={ 'Berita Yang disebarkan' }
								value={ `${ summary.news }` }
							/>
						</Col>
						<Col xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
							<StatisticWidget
								style={ { textAlign: "center", backgroundColor: "blue", color: "white" } }
								title={ 'Jumlah Surat Pengajuan' }
								value={ `${ summary.letter }` }
								colorValue="white"
							/>
						</Col>
					</Row>
				</Col>t

			</Row>
		</>
	)
}


export default withRouter(DefaultDashboard);
