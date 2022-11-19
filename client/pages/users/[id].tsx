import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { Users, Pets } from "../../Types"
import { NextPage } from "next"
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const userId: NextPage = ({ data }: any) => {
	const user = data.users
	return (
		<Container maxWidth="lg">
			<Card >
				<CardMedia
					component="img"
					height="500"
					image={user.avatar}
					alt={user.fname}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{user.fname} {user.lname}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{user.username}
					</Typography>
				</CardContent>
				<CardActions>
					{user.pets.map((item: Pets) => {
						return (
							<Stack direction="row" spacing={2}>
								<Avatar alt={item.name} src={item.avatar} />
							</Stack>
						)
					})}
				</CardActions>
			</Card>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params?.id
	const res = await fetch(`http://localhost:5000/users/${id}`)
	const data = await res.json()

	return {
		props: {
			data
		},
		revalidate: 10
	}

}
export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch("http://localhost:5000/users")
	const data = await res.json()

	const paths = data.users.map((user: Users) => ({
		params: { id: user.id.toString() }
	}))

	return {
		paths,
		fallback: false
	}
}

export default userId