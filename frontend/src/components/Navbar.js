import React from 'react'
import {useNavigate} from 'react-router-dom';

function Navbar()
{
	const navigate = useNavigate()

	return (
		<nav>
			<img src={require('../images/scope.png')} alt='scope.png' classname='logo'/>
			<h3>CoronaSight</h3>
			<h2 onClick={() => navigate('/')}>Home</h2>
			<h2 onClick={() => navigate('/predict/')}>Predict</h2>
		</nav>
	)
}

export default Navbar;