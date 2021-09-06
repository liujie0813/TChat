import {Input, message, Space} from "antd";
import React from "react";
import './search.css'

const { Search } = Input;

export default function SearchBox() {

	const onSearch = value => {
		message.warn('这是个假的搜索，哈哈哈');
	}

	return (
		<div style={{ borderBottom: 'solid 1px #e0e0e0', width: '300px', height: '80px' }}>
			<Space direction="vertical" style={{ marginLeft: '16px', marginTop: '30px' }}>
				<Search placeholder="搜索" allowClear onSearch={ onSearch } style={{ width: '270px' }}/>
			</Space>
		</div>
	)
}