import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const Home = () => {
	const [file, setFile] = useState<File>()
	const [gasType, setGasType] = useState<string>('')
	const [positions, setPositions] = useState<
		{ x: number; y: number; gasType: string }[]
	>([])
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (gasType) {
			const imgCanvas = document.getElementById('imgCanvas')
			const canvas = canvasRef.current
			const context = canvas?.getContext('2d')

			const handleClick = (e: MouseEvent) => {
				setPositions(prev => [...prev, { x: e.offsetX, y: e.offsetY, gasType }])

				if (context && canvas) {
					const x = e.offsetX - canvas.offsetLeft
					const y = e.offsetY - canvas.offsetTop

					context.beginPath()
					context.fillStyle = 'red'
					context.arc(x, y, 5, 0, 2 * Math.PI)
					context.fill()
				}
			}

			imgCanvas?.addEventListener('click', handleClick)

			return () => {
				imgCanvas?.removeEventListener('click', handleClick)
			}
		}
	}, [gasType])

	console.log(positions)

	const handleSaveFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e && e?.target && e.target?.files) {
			setFile(e.target.files[0])
			// const formData = new FormData()
			// formData.append('file', e.target.files[0])
			// setFile(formData)
		}
	}

	const handleSend = () => {
		console.log(file)
	}

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
			<Box
				sx={{
					height: '10rem',
					width: '15rem',
					border: 'dashed',
					borderColor: '#1976D2',
					borderWidth: '0.2rem',
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				component={'label'}
			>
				<input
					style={{
						height: '100%',
						width: '100%',
						opacity: '0',
					}}
					hidden
					type='file'
					onChange={handleSaveFile}
				/>
				<Typography sx={{ position: 'absolute' }} variant='h5'>
					Добавьте картинку
				</Typography>
			</Box>
			{file && (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
					<Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
						{!positions.length ? (
							<>Выберите позицию человека</>
						) : (
							<>Выберите позиции газа</>
						)}
					</Typography>
					<Box sx={{ position: 'relative', height: '30rem' }}>
						<canvas
							style={{
								width: '100%',
								height: '100%',
								position: 'absolute',
								top: 0,
								left: 0,
							}}
							id='imgCanvas'
							ref={canvasRef}
						/>
						<img style={{ height: '30rem' }} src={URL.createObjectURL(file)} />
					</Box>
					<FormControl fullWidth>
						<InputLabel id='select-label'>Тип газа</InputLabel>
						<Select
							labelId='select-label'
							id='select'
							value={gasType}
							label='Тип газа'
							onChange={e => setGasType(e.target.value)}
						>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={'Ten'}>Ten</MenuItem>
							<MenuItem value={'Twenty'}>Twenty</MenuItem>
							<MenuItem value={'Thirty'}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Box>
			)}
			<Button variant='contained' onClick={handleSend}>
				Отправить
			</Button>
		</Box>
	)
}

export default Home
