import React from 'react'
import { Card } from 'antd';
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const StatisticWidget = ({ style,title, value, status, colorValue, subtitle, prefix }) => {
	return (
		<Card style={style} >
			{title && <h4 style={style} className="mb-0">{title}</h4>}
			<div style={style} className={`${prefix? 'd-flex': ''} ${title ? 'mt-3':''}`}>
				{prefix ? <div style={style} className="mr-2">{prefix}</div> : null}
				<div>
				<h1 style={{textAlign:"center", color: colorValue}} className="mb-0 font-weight-bold">{value}</h1>
					<div style={{textAlign:"center"}}  className="d-flex align-items-center">
						{/* <h1 style={{textAlign:"center"}} className="mb-0 font-weight-bold">{value}</h1> */}
						{/* {
							status ? 
							<span className={`font-size-md font-weight-bold ml-3 ${status !== 0 && status > 0 ? 'text-success' : 'text-danger'}`} >
								{status}
								{status !== 0 && status > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
							</span> 
							: 
							null
						} */}
					</div>
					{subtitle && <div className="text-gray-light mt-1">{subtitle}</div>}
				</div>
			</div>
		</Card>
	)
}

StatisticWidget.propTypes = {
  	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	value: PropTypes.string,
	subtitle: PropTypes.string,
	status: PropTypes.number,
	prefix: PropTypes.element
};

export default StatisticWidget