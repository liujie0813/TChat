import {Button, Input, message} from "antd";
import React from "react";
import './search.css'
import {PlusOutlined} from "@ant-design/icons";

const { Search } = Input;

export default function SearchBox() {

	const onSearch = value => {
		message.warn('这是个假的搜索，哈哈哈');
	}

	return (
		<div style={{ borderBottom: 'solid 1px #e0e0e0', width: '300px', height: '64px' }}>
			<div style={{ padding: '18px 0 12px 18px' }}>
				<Search placeholder="搜索" allowClear onSearch={ onSearch } style={{ width: '220px' }}/>
				<Button icon={<PlusOutlined />} size={18} style={{ marginLeft: '12px' }}/>
			</div>
		</div>
	)
}