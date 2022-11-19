import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { Users } from "../Types"
import Link from "next/link"
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


const Home: NextPage = ({ data }: any) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {data.users.map((item: Users, i: number) => {
          return (
            <Grid item xs={12} md={4}>
              <Link href={"/users/"+item.id}>
                <Card >
                  <CardMedia
                    component="img"
                    height="500"
                    image={item.avatar}
                    alt={item.fname}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.fname} {item.lname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:5000/users")
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

export default Home
