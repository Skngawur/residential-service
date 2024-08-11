import React from 'react';
import {
	Button, Card,
	Col, Form,
	Input, Row, Select,
} from "antd";
import { rules } from "../../../../res/rules";
import { PageHeaderAlt } from "../../../../components/layout-components/PageHeaderAlt";
import Flex from "../../../../components/shared-components/Flex";
import { ownershipStatus } from "../../components/enums";
import TextArea from "antd/lib/input/TextArea";
import Utils from "../../../../utils";

const ADD = Utils.ACTION_TYPE.ADD
const EDIT = Utils.ACTION_TYPE.EDIT

const FormHouse = ({
	                   form, onFinish, onFinishFailed, title, submitLoading, type, onCancel, header,
                   }) => {
	return (
		<Form
			form={ form }
			name="basic"
			onFinish={ onFinish }
			onFinishFailed={ onFinishFailed }
			scrollToFirstError
		>
			<PageHeaderAlt className="bg-white border-bottom">
				<div className="container">
					<Flex className="py-2" mobileFlex={ false } justifyContent="between" alignItems="center">
						<h2 className="mb-3">{ header } </h2>
						<div className="mb-3">
							{ type === EDIT
								? <Button className="mr-2" danger onClick={ onCancel }>Kembali</Button>
								: <>
									<Button className="mr-2" type="text" danger onClick={ onCancel }>Batal</Button>
									<Button type="primary" htmlType="submit" loading={ submitLoading }>
										{ type === ADD ? 'Tambah' : `Simpan` }
									</Button>
								</>
							}
						</div>
					</Flex>
				</div>
			</PageHeaderAlt>
			<Card title={ title }>
				<Row gutter={ 8 }>
					<Col span={ 12 }>
						<Form.Item
							name="unit"
							label="Unit Rumah"
							rules={ rules.house.field.unit }>
							<Input placeholder="Masukkan blok unit rumah"/>
						</Form.Item>
					</Col>
				</Row>

				<Form.Item
					name="owner"
					label="Nama Pemilik"
					rules={ rules.house.field.owner }>
					<Input placeholder="Masukkan Nama Pemilik"/>
				</Form.Item>

				<Row gutter={ 8 }>
					<Col span={ 12 }>
						<Form.Item
							name="ownershipStatus"
							label="Status Kepemilikan Rumah"
							rules={ rules.house.field.ownershipStatus }
						>
							<Input placeholder="Masukkan Status Kemilikan Rumah SEWA / HAK MILIK"/>
							{/*<Select options={ ownershipStatus } placeholder="Pilih salah satu"/>*/}
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					name="homeCondition"
					label="Kondisi Rumah">
					<TextArea rows={ 5 } placeholder="Kondisi Rumah"/>
				</Form.Item>
				<Col span={ 12 }>
					<Form.Item
						label="Nomor Telepon"
						name="phoneNumber"
						rules={ rules.house.field.phoneNumber }
						hasFeedback
					>
						<Input prefix="+62" placeholder="Masukkan Nomor Telepon"/>
					</Form.Item>
				</Col>
			</Card>
		</Form>
	);
}

export { FormHouse }