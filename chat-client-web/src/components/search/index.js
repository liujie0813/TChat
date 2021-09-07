import {Input, message, Space} from "antd";
import React from "react";
import './search.css'

const { Search } = Input;

export default function SearchBox() {

	const onSearch = value => {
		message.warn('这是个假的搜索，哈哈哈');
	}

	return (
		<div style={{ borderBottom: 'solid 1px #e0e0e0', width: '270px', height: '60px' }}>
			<Space direction="vertical" style={{ marginLeft: '12px', marginTop: '18px' }}>
				<Search placeholder="搜索" allowClear onSearch={ onSearch } style={{ width: '250px' }}/>
			</Space>
		</div>
	)
}