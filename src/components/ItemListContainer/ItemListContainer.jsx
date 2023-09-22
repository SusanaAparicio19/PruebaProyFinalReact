import { useState, useEffect } from 'react'
import { getProductByCategory, getProducts } from '../../asyncMock'
import ItemList  from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'

const ItemListContainer = ({ greeting }) => {
	const [products, setProducts]  = useState ([])
	const [loading, setLoading] = useState(true)

	const { categoryId } = useParams()

	useEffect(()  => {
		const asyncFunction = categoryId ? getProductByCategory : getProducts

		asyncFunction(categoryId)
			.then(response  => {
				setProducts(response)
			})
			.catch(error => {
				console.error(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [categoryId])

	if(loading) {
		return (
		<Vortex className="loader"
			visible={true}
			height="150"
			width="150"
			text-align="center" 
			ariaLabel="vortex-loading"
			wrapperStyle={{}}
			wrapperClass="vortex-wrapper"
			colors={['purple', 'green','purple', 'green', 'purple','green']}
		/>
		)
	}
	return (
		<div>
			<h1>{categoryId ? `Productos de la ${categoryId}`: greeting}</h1>
			<ItemList products={products}/>
		</div>
	)
}

export default ItemListContainer

