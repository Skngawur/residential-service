import { Button, Card, Col, Row, Table, message as Message, Input, Menu, ConfigProvider, Tag } from 'antd';
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { fetchHouses } from 'redux/features/houses';
import Flex from "../../../components/shared-components/Flex";
import { SearchOutlined, PlusCircleOutlined, EyeOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import { strings } from "../../../res";
import { DeleteOutlined } from "@material-ui/icons";
import EllipsisDropdown from "../../../components/shared-components/EllipsisDropdown";
import { debounce } from "lodash";

export const Houses = () => {
	const history = useHistory()
	const dispatch = useDispatch();
	const [ originalList, setOriginalList ] = useState([])
	const [ list, setList ] = useState([])

	const {
		selectedRows,
		message: msgResponse,
	} = useSelector(state => state.houses)

	const getData = useCallback(async () => {
		try {
			await dispatch(fetchHouses()).unwrap()
				.then(resp => {
					setList(resp.data.content)
					setOriginalList(resp.data.content)
				})
		} catch (error) {
			console.log(error)
			Message.error(error?.message || 'Failed to fetch data')
		}
	}, [ dispatch ])

	useEffect(() => {
		getData()
	}, [ getData ])

	const addHouses = () => {
		history.push(`${ strings.navigation.path.houses.add }`)
	}

	const onSearch = useCallback(debounce((value: String) => {
		if(!Array.isArray(originalList)) {
			console.error("originalList is not an array");
			return;
		}

		if(value === "") {
			setList(originalList);
		} else {
			const lowercasedValue = value.toLowerCase();
			const filteredData = originalList.filter(item =>
				(item.unit && item.unit.toLowerCase().includes(lowercasedValue)) ||
				(item.owner && item.owner.toLowerCase().includes(lowercasedValue)),
			);
			setList(filteredData);
		}
	}, 300), [ originalList ]);

	const handleSearch = e => {
		const value = e.currentTarget.value.trim().toLowerCase();
		onSearch(value);
	};

	const viewDetails = row => {
		history.push(`${ strings.navigation.path.houses.list }/${ row.id }`)
	}

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={ () => viewDetails(row) }>
				<Flex alignItems="center">
					<EyeOutlined/>
					<span className="ml-2">Detail</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={ () => {
				// deleteRow(row)
			} }>
				<Flex alignItems="center">
					<DeleteOutlined/>
					<span
						className="ml-2">{ selectedRows.length > 0 ? `Delete (${ selectedRows.length })` : 'Delete' }</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumn = [
		{
			title: () => <div className="text-center">Info Hunian</div>,
			children: [
				{
					title: 'Unit Rumah',
					dataIndex: 'unit',
					key: 'unit',
				},
				{
					title: 'Pemilik',
					dataIndex: 'owner',
					key: 'owner',
				},
			],
			ellipsis: true,
		},
		{
			title: 'Status Kepemilikan',
			dataIndex: 'ownershipStatus',
			key: 'ownershipStatus',
			filters: [
				{
					text: 'Sewa',
					value: 'Sewa',
				},
				{
					text: 'Hak Milik',
					value: 'Hak Milik',
				},
			],
			onFilter: (value, record) => record.ownershipStatus.indexOf(value) === 0,
			render: (_, record) => {
				const enums = {
					"HAK MILIK": "blue",
					"SEWA": "green",
				}
				return (
					<span>
						<Tag color={ enums[record.ownershipStatus] } key={ record.ownershipStatus }>
							{ record.ownershipStatus }
						</Tag>
					</span>
				)
			},
			ellipsis: true,
		},
		{
			title: 'Kondisi Rumah',
			dataIndex: 'homeCondition',
			key: 'homeCondition',
			ellipsis: true,
		},
		{
			title: 'Nomor Telepon Pemilik',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			ellipsis: true,
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={ dropdownMenu(elm) }/>
				</div>
			),
		},
	];

	const customizeRenderEmpty = () => (
		<div style={ { marginTop: 20, textAlign: 'center' } }>
			<CloseCircleTwoTone twoToneColor="red" style={ { fontSize: 30 } }/>
			<p style={ { marginTop: 20 } }>{ msgResponse }</p>
		</div>
	);

	return (
		<>
			<Row gutter={ 24 }>
				<Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 }>
					<h2>Daftar Hunian Warga</h2>
					<p>Informasi seputar hunian warga</p>
				</Col>
			</Row>
			<Row gutter={ 24 }>
				<Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 }>
					<Card>
						<Flex alignItems="center" justifyContent="between" mobileFlex={ false }>
							<Flex className="mb-1" mobileFlex={ false }>
								<div className="mr-md-3 mb-4">
									<Input placeholder="Pemilik" prefix={ <SearchOutlined/> }
									       onChange={ handleSearch }/>
								</div>
							</Flex>
							<div>
								<Button
									onClick={ addHouses }
									type="primary"
									icon={ <PlusCircleOutlined/> }
									block>
									Tambah
								</Button>
							</div>
						</Flex>
						<ConfigProvider renderEmpty={ customizeRenderEmpty }>
							<Table
								className="no-border-last"
								columns={ tableColumn }
								dataSource={ list }
								rowKey="id"
								pagination={ {
									pageSize: 8,
								} }
							/>
						</ConfigProvider>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default withRouter(Houses);
