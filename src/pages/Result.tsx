import { Box, Link, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Result = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '3rem',
				gap: '1rem',
			}}
		>
			<NavLink to='/'>
				<Link component='button'>
					<Typography sx={{ fontSize: '1.5rem' }}>На главную</Typography>
				</Link>
			</NavLink>
		</Box>
	)
}

export default Result
