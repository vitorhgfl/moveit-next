import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompletedChallanges } from '../components/CompletedChallange';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { Countdown } from '../components/Countdown'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css' 
import { CountdownProvider } from '../contexts/CountdonwContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
      level: number,
      currentExperience: number,
      challengesCompleted: number,
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallanges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div> 
    </ChallengesProvider>
  )
}

export const getServerSideProps = async (ctx) =>{
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  
  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}