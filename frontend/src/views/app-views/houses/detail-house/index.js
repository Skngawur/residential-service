import { message } from 'antd';
import React, { useState } from "react";
import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { FormHouse } from "./FormHouse";
import { useForm } from "antd/es/form/Form";
import { fetchOneHouses, addHouses } from "../../../../redux/features/houses";
import { strings } from "../../../../res";

const ADD = 'ADD'
const EDIT = 'EDIT'

const DetailHouse = ({ type = ADD, param }) => {
	const history = useHistory();
	const [ form ] = useForm();
	const dispatch = useDispatch();
	const { selected } = useSelector(state => state.houses)
	const [ submitLoading, setSubmitLoading ] = useState(false)

	const getData = useCallback(async (id) => {
		try {
			await dispatch(fetchOneHouses(id)).unwrap()
				.then(data => {
					console.log(data.data)
					form.setFieldsValue(data.data);
				})
				.catch(err => {
					message.error(err?.message || `Failed to load data`);
				});
		} catch (error) {
			message.error(error?.message || 'Failed to data')
		}
	}, [ dispatch, form ])

	const onFinish = async (values) => {
		console.log('Received values of form: ', values);
		const request = {
			unit: values.unit,
			owner: values.owner,
			ownershipStatus: values.ownershipStatus,
			homeCondition: values.homeCondition,
			phoneNumber: values.phoneNumber,
		};

		form.validateFields()
			.then(async () => {
				if(type === EDIT) {
					// await dispatch(updateCitizen(request)).unwrap()
					//     .then((res) => {
					//         setSubmitLoading(true)
					//         history.push('/app/citizens')
					//     })
					//     .catch((err) => {
					//         message.error(err.message)
					//     })
					//     .finally(() => setSubmitLoading(false))
				} else {
					await dispatch(addHouses(request)).unwrap()
						.then(async () => {
							setSubmitLoading(true)
							history.push(strings.navigation.path.houses.list)
						})
						.catch((err) => {
							message.error(err.response.data.message)
						})
				}
			})
			.catch(info => {
				setSubmitLoading(false)
				console.log('info', info)
				message.error('Lengkapi data dengan benar!');
			});
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onCancel = () => {
		history.push('/app/houses')
	};

	useEffect(() => {
		if(param) {
			getData(param)
		} else {
			form.resetFields()
		}
	}, [ getData, param ]);

	const title = type === EDIT
		? 'Edit Hunian Warga'
		: 'Tambah Hunian Warga'

	const titleCard = type === EDIT
		? `${ selected?.unit } / ${ selected?.owner }`
		: ''

	return (
		<>
			<div className="container">
				<FormHouse
					selected={ selected }
					submitLoading={ submitLoading }
					header={ title }
					type={ type }
					onCancel={ onCancel }
					form={ form }
					title={ titleCard }
					onFinish={ onFinish }
					onFinishFailed={ onFinishFailed }
				/>
			</div>
		</>
	)
}

export default DetailHouse