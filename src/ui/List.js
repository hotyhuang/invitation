import React, { Component } from 'react';
import { Table } from 'reactstrap'
import API from './api'


const getAllKeys = (objArr = []) => {
	const keys = new Set()
	objArr.forEach(obj => {
		Object.keys(obj).forEach(key => {
			keys.add(key)
		})
	})
	return [...keys]
}

export default class List extends Component {
	state = {
		list: [],
		keys: []
	}
	componentWillMount() {
		API.getAll()
			.then(resp => {
				this.setState({
					list: resp,
					keys: getAllKeys(resp)
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		const { list, keys } = this.state
		return (
			<Table bordered hover
				style={{maxWidth: '1240px', margin: 'auto'}}>
				<thead>
					<tr>
						{keys.map((key, index) => <th key={index}>{key}</th>)}
					</tr>
				</thead>
				<tbody>
					{
						list.map((item, row) =>
							<tr key={row}>{keys.map((key, col) => <td key={col}>{item[key]}</td>)}</tr>
						)
					}
				</tbody>
			</Table>
		)
	}
}